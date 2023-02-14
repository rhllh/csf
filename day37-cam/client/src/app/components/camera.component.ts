import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  // templateUrl: './camera.viewchild.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  // size of webcam view
  width = 400

  multipleWebcamsAvailable = false

  // latest snapshot
  webcamImage!: WebcamImage

  // webcam snapshot trigger - this is an observable (input)
  // when it fires, an image will be captured and emitted
  trigger = new Subject<void>()

  constructor(private svc: CameraService, private router: Router) {}

  ngOnInit(): void {
    // check how many video inputs available
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  // when snap button is clicked
  triggerSnapshot(): void {
    this.trigger.next();
    
    // 1. fires trigger event
    // 2. [trigger] in html -> triggerobservable
    // "If the given Observable emits, 
    // an image will be captured and emitted through 'imageCapture' EventEmitter (output)"
    // 3. imageCapture (handleImage) is called
    // "imageCapture: EventEmitter<WebcamImage>: Whenever an image is captured (i.e. triggered by [trigger]), 
    // the image is emitted via this EventEmitter. 
    // The image data is contained in the WebcamImage data 
    // structure as both, plain Base64 string and data-url."
    // 4. assign WebCamImage to variable
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    this.svc.imageData = this.webcamImage.imageAsDataUrl
    this.router.navigate(['/upload'])
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
