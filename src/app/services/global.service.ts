import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public serviceURL: string;
  public forceAll: boolean;

  constructor() {
    const protocol = document.location.protocol.toLowerCase();
    if (protocol === 'https:') this.serviceURL = environment.secureURL;
    else this.serviceURL = environment.serviceURL;
    console.log(this.serviceURL);
    this.forceAll = environment.forceAll || false;
   }
}
