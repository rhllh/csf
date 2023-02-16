import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Listing, PostingResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  // post to redis temporarily (post request)
  postListing(listing: Listing, imageFile: File): Promise<PostingResult> {

    const fd: FormData = new FormData()

    fd.set("name", listing.name)
    fd.set("email", listing.email)
    fd.set("phone", listing.phone ? listing.phone : "")
    fd.set("title", listing.title)
    fd.set("description", listing.description)
    fd.set("image", imageFile)

    return lastValueFrom(
      this.http.post<PostingResult>("/api/posting", 
        fd
      )
    )
  }

  // confirm listing (put request)
  confirmListing(postingId: string, json: PostingResult): Promise<any> {
    return lastValueFrom(this.http.put(`/api/posting/${postingId}`, json))
  }
}
