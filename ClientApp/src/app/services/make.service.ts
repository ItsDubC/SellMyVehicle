import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MakeService extends DataService {
  constructor(http: Http)  { 
    super("http://localhost:5000/api/makes", http);
  }
}
