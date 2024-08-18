import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';

export class Dataset {
  dbid: string;
  name: string;
  showAbilities: Array<AbilityType>;
  currency: string;
  colors: Colors;
}

export class Colors {
  title: string;
  text: string;
}

export class AbilityType {
  type: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  public datasetList: Array<Dataset> = [];

  public selected: Dataset;

  private datasetURL: string;

  private resultSet = 'rs';

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) {
    const urlParams = [];
    if (this.global.showCOF2) urlParams.push("cof2=1");
    if (this.global.forceAll) urlParams.push("all=1");
    let queryString = "";
    if (urlParams.length > 0) queryString = urlParams.join("&");
    this.datasetURL = this.global.serviceURL + '/datasets' + (queryString !== "" ? "?" + queryString : "");
  }

  public getDatasetList(): Observable<any> {
    return this.http.get(this.datasetURL).pipe(
      map(results => results[this.resultSet])
    );
  }

  public is(value: string) {
    return this.selected.dbid === value;
  }

  public getTitleColor(): string {
    return this.selected && this.selected.colors && this.selected.colors.title || '#fff';
  }

  public getTextColor(): string {
    return this.selected && this.selected.colors && this.selected.colors.text || '#000';
  }
}
