import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';
import { ProfileService } from 'src/app/services/profile.service';
import { PathService, Path, PathType } from 'src/app/services/path.service';
import { EquipmentBaseService } from 'src/app/services/equipmentbase.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.page.html',
  styleUrls: ['./paths.page.scss'],
})
export class PathsPage implements OnInit {

  public title: string;

  public attacks: SafeHtml;

  public paths$: Observable<any>;

  public equipments$: Observable<any>;

  public traits$: Observable<any>;

  private pathType: PathType;

  constructor(
    private router: Router,
    public datasetService: DatasetService,
    public profileService: ProfileService,
    private pathService: PathService,
    public equipmentBaseService: EquipmentBaseService
  ) {

    this.pathType = null;
    if (this.router.getCurrentNavigation().extras.state) {
      this.pathType = this.router.getCurrentNavigation().extras.state.pathType;
    }

  }

  ngOnInit() {
    if (this.profileService.selected !== null) {
      this.title = this.profileService.selected.nom;
      let attacks = "";
      const combat = this.profileService.selected.combat;
      if (combat) {
        combat.split(",").forEach(attack => {
          const [ name, value ] = attack.split(":");
          attacks += "<b>" + name;
          attacks += "</b> : ";
          if (name === "DV") attacks += "d";
          if (name === "INIT") attacks += "+";
          attacks += value + " ";
        });
      }
      this.attacks = attacks;
      this.getEquipmentList();
      this.getTraitList();
    } else {
      this.title = this.pathType.type_voie_intitule;
    }
    this.getPathList();
  }

  getPathList() {
    let type = '';
    if (this.pathType) {
      type = this.pathType.type_voie;
    }
    this.paths$ = this.pathService.getPathList(type);
  }

  getEquipmentList() {
    this.equipmentBaseService.profile = this.profileService.selected.profil;
    this.equipments$ = this.equipmentBaseService.getEquipmentList();
  }

  getTraitList() {
    this.traits$ = this.profileService.getTraitList();
  }

  showAbilities(path: Path) {
    this.pathService.selected = path;
    this.router.navigateByUrl('/abilities');
  }

  profilesPage() {
    this.router.navigateByUrl('/profiles');
  }
}
