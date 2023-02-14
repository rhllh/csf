import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UploadResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  imageData = ""

  constructor(private http: HttpClient) { }

  upload(form: any, image: Blob): Promise<UploadResult> {
    const formData: FormData = new FormData()

    formData.set("title", form['title'])
    formData.set("comment", form['comments'])
    formData.set("file", image)

    return firstValueFrom(
      this.http.post<UploadResult>(`http://brave-vein-production.up.railway.app/upload`, formData)
    )

  }
}
