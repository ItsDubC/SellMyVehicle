import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { AppError } from '../common/app-error';
import { SaveVehicle } from '../models/SaveVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: Http) { }

  getMakes() {
    return this.http.get("/api/makes").pipe(
      map(response => response.json()), catchError(this.handleError));
  }

  getVehicle(id) {
    return this.http.get("/api/vehicles/" + id).pipe(
      map(response => response.json()), catchError(this.handleError));
  }

  getVehicles() {
    return this.http.get("/api/vehicles").pipe(
      map(r => r.json()), catchError(this.handleError));
  }

  getFeatures() {
    return this.http.get("/api/features").pipe(
      map(response => response.json()), catchError(this.handleError));
  }

  create(vehicle) {
    return this.http.post("/api/vehicles", vehicle).pipe(
      map(response => response.json()), catchError(this.handleError));
  }

  update(vehicle: SaveVehicle) {
    return this.http.put("/api/vehicles/" + vehicle.id, vehicle).pipe(
      map(r => r.json()), catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete("/api/vehicles/" + id).pipe(
      map(r => r.json()), catchError(this.handleError));
  }

  private handleError(error: Response) {
    console.log(error);

    if (error.status === 404)
      return throwError(new NotFoundError());  //this is an expected error, so no need to log it.  therefore, no need to pass original error
    else if (error.status === 400)
      return throwError(new BadRequestError(error.json()));
    
    return throwError(new AppError(error));
  }
}
