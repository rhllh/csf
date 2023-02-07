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

    return lastValueFrom(
      this.http.get<Game[]>(`/api/games`, {headers})
    )
  }

  getCommentsByGID(gid: number): Promise<Comment[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json')

    return firstValueFrom(
      this.http.get<Comment[]>(`/api/game/${gid}/comments`, {headers})
    )
  }

}
