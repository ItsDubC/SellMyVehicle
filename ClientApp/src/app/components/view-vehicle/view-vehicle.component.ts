import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef
  vehicle: any;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastrService: ToastrService,
    private photoService: PhotoService) { 
  
      route.params.subscribe(p => {
        this.vehicleId = +p["id"];

        if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
          router.navigate(["/vehicles"]);
          return;
        }
      })
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId).subscribe(v => this.vehicle = v, err => {
      if (err.constructor.name == "NotFoundError") {
        this.router.navigate(["/vehicles"]);
      }
    })
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.toastrService.success("Vehicle successfully deleted.", "Success");
        this.router.navigate(["/vehicles"]);
      });
    }
  }

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.photoService.upload(this.vehicleId, nativeElement.files[0])
      .subscribe(x => console.log(x));
  }
}
