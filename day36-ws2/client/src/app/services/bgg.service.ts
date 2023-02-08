import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BggService {

  constructor(private http: HttpClient) { }

  getGames(): Promise<Game[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json')

    // firstValueFrom: resolve promise as soon as the first value arrives from the observable
    // lastValueFrom: waits for observable to complete, resolves promise with last value from observed stream
    return lastValueFrom(
      this.http.get<Game[]>(`/api/games`, {headers})
    )
  }

  getCommentsByGID(gid: number): Promise<Comment[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json')

    return lastValueFrom(
      this.http.get<Comment[]>(`/api/game/${gid}/comments`, {headers})
    )
  }

}
