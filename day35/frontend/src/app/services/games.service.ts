import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Games } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // BACKEND_API_URL="http://localhost:8080/api/games"
  BACKEND_API_URL="https://exact-shoe-production.up.railway.app/api/games"

  constructor(private httpClient: HttpClient) { }

  getGames(limit: number, offset: number): Observable<Games> {
    const params = new HttpParams()
                        .set('limit', limit)
                        .set('offset', offset)
    
    const headers = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Access-Control-Allow-Origin', '*')

    return this.httpClient.get<Games>(this.BACKEND_API_URL, { params: params, headers: headers })
  }
}
