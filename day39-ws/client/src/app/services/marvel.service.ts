import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Character } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http: HttpClient) { }

  public searchCharByStartsWith(keyword: string, offset: number): Promise<Character[]> {
    const params = new HttpParams().set("keyword", keyword)
                                  .set("offset", offset)
    const headers = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Access-Control-Allow-Origin', '*')

    return lastValueFrom(this.http.get<Character[]>(`/api/characters`, {headers, params}))
  }

  public getCharacterDetailById(id: number): Promise<Character> {
    // const params = new HttpParams().set("id", id)
    const headers = new HttpHeaders()
                          .set('content-type', 'application/json')
                          .set('Access-Control-Allow-Origin', '*')

    return lastValueFrom(
      this.http.get<Character>(`/api/character/${id}}`, 
      {headers})
    )
  }

  public postComment(id: number, comment: string): Promise<Character> {
    const params = new HttpParams().set("id", id)

    const headers = new HttpHeaders()
                          .set('Access-Control-Allow-Origin', '*')

    const formData = new FormData()
    formData.set("comment", comment)

    return lastValueFrom(
      this.http.post<Character>(`/api/character/${id}`, 
      formData, 
      {headers})
    )
  }

}
