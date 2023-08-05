import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatasetService } from './dataset.service';
import { GlobalService } from './global.service';

export class EquipmentProperty {
  id: string;
  nom: string;
  valeur: string;
}
export class EquipmentBase {
  code: string;
  designation: string;
  prix: number;
  nombre: number;
  special: string;
  props: Array<EquipmentProperty>;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentBaseService {

  public profile: string ;

  private equipmentBaseURL: string;

  private resultSet = 'rs';

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private datasetService: DatasetService,
  ) {
    this.equipmentBaseURL = this.global.serviceURL + '/equipments';
  }

  public getEquipmentList(): Observable<any> {
    const url = this.equipmentBaseURL + `/${this.datasetService.selected.dbid}?profile=${this.profile}`;
    console.log(url);
    return this.http.get(url).pipe(
      map(results => results[this.resultSet])
    );
  }
}
