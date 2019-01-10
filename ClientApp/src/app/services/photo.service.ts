import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: Http) { }

  upload(vehicleId, photo) {
    var formData = new FormData();
    formData.append("file", photo);

    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData).pipe(
      map(response => response.json()));
  }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`).pipe(
      map(response => response.json()));
  }
}
