import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostDetails, UploadData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public getAllPosts(): Promise<PostDetails[]> {
    
    return firstValueFrom(
      this.http.get<PostDetails[]>('/get')
    )
  }

  public uploadPost(uploadData: UploadData, imageFile: File): Promise<PostDetails> {
    const fd: FormData = new FormData()
    
    fd.set("image", imageFile)
    fd.set("title", uploadData.title)
    fd.set("text", uploadData.text)

    return firstValueFrom(
      this.http.post<PostDetails>('/post', fd)
    )
  }
}
