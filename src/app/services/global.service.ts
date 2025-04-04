import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public serviceURL: string;

  public showCOF2: boolean;

  public forceAll: boolean;
  
  public version: string;

  constructor() {
    const protocol = document.location.protocol.toLowerCase();
    if (protocol === 'https:') this.serviceURL = environment.secureURL;
    else this.serviceURL = environment.serviceURL;
    
    this.showCOF2 = environment.showCOF2 || false;
    this.forceAll = environment.forceAll || false;
    
    this.version = "2.3.0";
   }
}
