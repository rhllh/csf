import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  imageData = ""
  form!: FormGroup
  blob!: Blob

  constructor(private fb: FormBuilder, public svc: CameraService, private router: Router) {}

  ngOnInit(): void {
    // if there is no image data available
    if (!this.svc.imageData) {
      this.router.navigate(['/'])
      return
    }

    this.imageData = this.svc.imageData
    this.form = this.fb.group({
      title: this.fb.control<string>(''),
      comments: this.fb.control<string>('')
    })
    this.blob = this.dataURItoBlob(this.imageData)
  }

  upload() {
    const value = this.form.value
    console.log(`form: ${value}`)

    this.svc.upload(value, this.blob)
            .then(result => {
              console.log("key: ", result.key)
              this.router.navigate(['/'])
            })
            .catch(error => {
              console.log(error)
            })
  }

  dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});
  }

}
