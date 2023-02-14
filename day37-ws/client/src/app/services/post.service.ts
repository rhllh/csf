import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, lastValueFrom, Subscription } from 'rxjs';
import { GetImageResult, GetPostResult, PostResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  postToFeed(formData: FormData): Promise<any> {
    
    console.log("in service - postToFeed")

    return firstValueFrom(
      this.http.post<any>('/api/post', formData)
    )
  }

  retrievePostFromFeed(postId: string): Promise<GetPostResult> {

    console.log("in service - retrievePost")

    return firstValueFrom(
      this.http.get<GetPostResult>(`/api/get/${postId}`)
    )

  }

  retrieveImageFromFeed(postId: string): Promise<GetImageResult> {
    console.log("in service - retrieveImage")

    return firstValueFrom(
      this.http.get<GetImageResult>(`/api/get/${postId}/image`)
    )
  }
}
