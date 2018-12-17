import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MakeService } from 'src/app/services/make.service';
// import { FeatureService } from 'src/app/services/feature.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  features: any[];

  //constructor(private makeService: MakeService, private featureService: FeatureService) { }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastrService: ToastrService) { 
      route.params.subscribe(p => {
        if(p['id'])
          this.vehicle.id = +p["id"];
      });
    }

  ngOnInit() {
    let observables = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id > 0) {
      observables.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    forkJoin(observables).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (data[2])
        this.vehicle = data[2];
    }, err => {
      // if (err.status == 404)
        //   this.router.navigate(["/home"]);

      if (err.constructor.name == "NotFoundError")
          this.router.navigate(["/home"]);
    });

    // forkJoin([
    //   this.vehicleService.getVehicle(this.vehicle.id),
    //   this.vehicleService.getMakes(),
    //   this.vehicleService.getFeatures()
    // ]).subscribe(data => {
    //   this.makes = data[0];
    //   this.features = data[1];
    // }, err => {
    //   // if (err.status == 404)
    //     //   this.router.navigate(["/home"]);

    //   if (err.constructor.name == "NotFoundError")
    //       this.router.navigate(["/home"]);
    // });

    // if(this.vehicle.id > 0){
    //   this.vehicleService.getVehicle(this.vehicle.id).subscribe(vehicle => { 
    //     this.vehicle = vehicle; 
    //   }, err => {
    //     // if (err.status == 404)
    //     //   this.router.navigate(["/home"]);
  
    //     if (err.constructor.name == "NotFoundError")
    //       this.router.navigate(["/home"]);
    //   });
    // }

    // this.vehicleService.getMakes().subscribe(makes => {
    //   this.makes = makes;
    // });

    // this.vehicleService.getFeatures().subscribe(features => {
    //   this.features = features;
    // });
  }

  onMakeChange() {
    var selectedMake = this.makes.find(x => x.id == this.vehicle.makeId);

    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);

      if (index > -1)
        this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x));
  }
}
