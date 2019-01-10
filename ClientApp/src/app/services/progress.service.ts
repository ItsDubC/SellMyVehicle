import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BrowserXhr } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private uploadProgress: Subject<any>;
  downloadProgress: Subject<any> = new Subject();

  constructor() { }

  startTrackingUploadProgress() {
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress) {
    this.uploadProgress.next(progress);
  }

  endTrackingUploadProgress() {
    this.uploadProgress.complete();
  }
}

@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {
  constructor(private service: ProgressService) {
    super();
  }

  build(): XMLHttpRequest {
    var xhr: XMLHttpRequest = super.build();

    xhr.onprogress = (event) => {
      this.service.downloadProgress.next(this.createProgress(event));
    };

    xhr.upload.onprogress = (event) => {
      this.service.notify(this.createProgress(event));
    };

    xhr.upload.onloadend = () => {
      this.service.endTrackingUploadProgress();
    }

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }
}
