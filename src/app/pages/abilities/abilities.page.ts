import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatasetService, AbilityType } from 'src/app/services/dataset.service';
import { PathService } from 'src/app/services/path.service';
import { AbilityService, Ability } from 'src/app/services/ability.service';
import { RaceService } from 'src/app/services/race.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.page.html',
  styleUrls: ['./abilities.page.scss'],
})
export class AbilitiesPage implements OnInit {

  public title: string;

  public backButton: string;

  public notes: string;

  public abilityType: AbilityType;

  public abilities$: Observable<any>;

  public race$: Observable<any>;

  public traits$: Observable<any>;

  public racials$: Observable<any>;

  public navBack: string;

  constructor(
    private router: Router,
    public datasetService: DatasetService,
    private pathService: PathService,
    private abilityService: AbilityService,
    private raceService: RaceService
  ) {

    this.abilityType = null;
    this.backButton = 'Voies';
    this.navBack = '/paths';
    if (this.router.getCurrentNavigation().extras.state) {
      this.abilityType = this.router.getCurrentNavigation().extras.state.abilityType;
      this.backButton = this.router.getCurrentNavigation().extras.state.backButton || this.backButton;
      this.navBack = this.router.getCurrentNavigation().extras.state.navBack || this.navBack;
    }

   }

  ngOnInit() {
    this.notes = "";
    if (this.pathService.selected != null) {
      this.title = this.pathService.selected.nom;
      this.notes = this.pathService.selected.notes;
    } else if (this.abilityType != null) {
      this.title = this.abilityType.label;
    }
    this.getAbilityList();
    this.getRace();
    this.getRacialTraits();
    this.getRacialAbilities();
  }
  
  getAbilityList() {
    this.abilities$ = this.abilityService.getAbilityList(this.abilityType);
  }

  getActionTag(ability: Ability ): string {
    if (ability.limitee === 1) 
      return "(L)";
    switch (ability.action) {
      case 1:
        return "(G)";
      case 2:
        return "(M)";
      case 3:
        return "(A)";
      default:
        return "";
    }
  }

  getRace() {
    this.race$ = this.raceService.getRace();
  }

  getRacialTraits() {
    if (this.race$ !== null) {
      this.traits$ = this.raceService.getTraitsList();
    }
  }

  getRacialAbilities() {
    if (this.race$ !== null) {
      this.racials$ = this.raceService.getAbilityList();
    }
  }

  hasMod(value?: number) : boolean {
    value = +value || 0;
    return value !== 0;
  }

  getName(value: string) : string {
    let name = "";
    switch (value) {
      case "DEX":
        name = this.datasetService.is('cof2') ? "AGI" : value;
        break;
      case "SAG":
        name = !this.datasetService.is('cof') ? "PER" : value;
        break;
    }
    return name;
  }

  backPage() {
    this.router.navigateByUrl(this.navBack);
  }

}
