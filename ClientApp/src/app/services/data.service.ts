import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url).pipe(
        map(response => response.json()), 
        catchError(this.handleError));
  }

  create(resource: any) {
    return throwError(new AppError());
    return this.http.post(this.url, resource).pipe(
        map(response => response.json()), 
        catchError(this.handleError));
  }

  update(resource) {
    return this.http.patch(this.url + "/" + resource.id, JSON.stringify({ isRead: true })).pipe(
        map(response => response.json()), 
        catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(this.url + "/" + id).pipe(
        map(response => response.json()), 
        catchError(this.handleError));
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
