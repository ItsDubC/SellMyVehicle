import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import { ToastrService } from "ngx-toastr";
//import * as Raven from 'raven-js'; // for Sentry.io

export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        @Inject(ToastrService) private toastrService: ToastrService) {}

    handleError(error) {
        this.ngZone.run(() => {
            this.toastrService.error("An unexpected error happened.", "Error", {
                timeOut: 5000,
                closeButton: true,
                positionClass: "toast-top-right"
            });
        });

        if (!isDevMode()) {
            //  Log entry in Sentry.io
            //  Raven.captureException(error.originalError || error);
        }
        else {  // in dev mode
            console.log(error);
            throw error;
        }
    }
}