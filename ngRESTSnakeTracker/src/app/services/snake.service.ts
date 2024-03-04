import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Snake } from '../models/snake';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/snakes';

  constructor(private http: HttpClient) {}

  // Get all snake
  index(): Observable<Snake[]> {
    return this.http.get<Snake[]>(this.url).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error(
              'SnakeService.index(): error retrieving snake list: ' + err
            )
        );
      })
    );
  }

  // add a new snake
  public create(snake: Snake): Observable<Snake> {
    return this.http.post<Snake>(this.url, snake).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error('SnakeService.create(): error posting new snake:  ' + err)
        );
      })
    );
  }

  // Get snake detail
  public show(snakeId: number): Observable<Snake> {
    return this.http.get<Snake>(`${this.url}/${snakeId}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error(
              `SnakeService.show(): error finding snake with id: ${snakeId} ` +
                err
            )
        );
      })
    );
  }

  public update(snake: Snake, snakeId: number): Observable<Snake> {
    return this.http.put<Snake>(this.url + '/' + snakeId, snake).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error('SnakeService.update(): error updating snake:  ' + err)
        );
      })
    );
  }

  public destroy(snakeId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + snakeId).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error(
              `SnakeService.destroy(): error deleting snake with id: ${snakeId} ` +
                err
            )
        );
      })
    );
  }
}
