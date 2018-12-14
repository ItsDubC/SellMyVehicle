import { ErrorHandler, Inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(ToastrService) private toastrService: ToastrService) {}

    handleError(error) {
        console.log(error);
        this.toastrService.error("An unexpected error happened.", "Error", {
            //timeOut: 5000,
            //closeButton: false,
            positionClass: "toast-top-right"
          });
    }
}