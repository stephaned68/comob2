import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatasetService } from './dataset.service';
import { ProfileService } from './profile.service';
import { GlobalService } from './global.service';

export class Path {
  voie: string;
  nom: string;
  notes: string;
  type: string;
}

export class PathType {
  type_voie: string;
  type_voie_intitule: string;
}

@Injectable({
  providedIn: 'root'
})
export class PathService {

  public pathTypes: Array<PathType> = [];

  public pathList: Array<Path> = [];

  public selected: Path;

  private pathURL: string;

  private pathTypesURL: string;

  private resultSet = 'rs';

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private datasetService: DatasetService,
    private profileService: ProfileService
  ) {
    this.pathURL = this.global.serviceURL + '/paths';
    this.pathTypesURL = this.global.serviceURL + '/types/paths';
  }

  public getPathList(pathType: string): Observable<any> {
    let path = '';
    if (this.profileService.selected !== null) {
      path = `/${this.profileService.selected.profil}`;
    } else {
      path = `/?type=${pathType}`;
    }
    const url = this.pathURL + `/${this.datasetService.selected.dbid}${path}`;
    console.log(url);
    return this.http.get(url).pipe(map((results) => results[this.resultSet]));
  }

  public getPathTypes(): Observable<any> {
    const url = this.pathTypesURL + `/${this.datasetService.selected.dbid}`;
    console.log(url);
    return this.http.get(url).pipe(map((results) => results[this.resultSet]));
  }
}
