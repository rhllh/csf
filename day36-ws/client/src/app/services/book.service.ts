import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { Book } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Promise<Book[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json')

    return firstValueFrom(
      this.http.get<Book[]>('/api/books', {headers})
    )
    
  }

  getBookById(id: string): Promise<Book> {
    const headers = new HttpHeaders().set('content-type', 'application/json')

    return firstValueFrom(
      this.http.get<Book>(`/api/book/${id}`, {headers})
    )
  }
}
