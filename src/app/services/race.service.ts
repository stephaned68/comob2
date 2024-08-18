import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';
import { DatasetService } from '../services/dataset.service';
import { PathService } from '../services/path.service';
import { AbilityService } from '../services/ability.service';

export class Race {
  race: string;
  intitule: string;
  mod_for: number;
  mod_dex: number;
  mod_con: number;
  mod_int: number;
  mod_sag: number;
  mod_cha: number;
  mod_vol: number;
  age_base: number;
  esperance_vie: number;
  taille_min: number;
  taille_max: number;
  poids_min: number;
  poids_max: number;
  type_race: string;
}

export class Trait {
  intitule: string;
  description: string;
}

export class Ability {
  capacite: string;
  description: string;
  limitation: number;
}

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private raceURL: string;

  private resultSet = 'rs';

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private datasetService: DatasetService,
    private pathService: PathService,
    private abilityService: AbilityService
  ) {
    this.raceURL = this.global.serviceURL + '/races';
  }

  public getRace(): Observable<any> {
    if (!this.pathService?.selected?.voie) return null;
    
    const url = this.raceURL + `/${this.datasetService.selected.dbid}/${this.pathService.selected.voie}`;

    return this.http.get(url).pipe(
      map(results => results[this.resultSet])
    );
  }

  public getTraitsList(): Observable<any> {
    if (!this.pathService?.selected?.voie) return null;

    const url = this.global.serviceURL + '/traits' + `/${this.datasetService.selected.dbid}/?race=${this.pathService.selected.voie}`;

    return this.http.get(url).pipe(
      map(results => results[this.resultSet])
    );
  }

  public getAbilityList(): Observable<any> {
    if (!this.pathService?.selected?.voie) return null;
    
    const url = this.abilityService.getAbilityURL()
    + `/${this.datasetService.selected.dbid}/?race=${this.pathService.selected.voie}`;

    return this.http.get(url).pipe(
      map(results => results[this.resultSet])
    );
  }
}
