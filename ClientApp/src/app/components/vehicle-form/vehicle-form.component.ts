import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MakeService } from 'src/app/services/make.service';
// import { FeatureService } from 'src/app/services/feature.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { SaveVehicle } from 'src/app/models/SaveVehicle';
import { Vehicle } from 'src/app/models/Vehicle';
import * as _ from "underscore";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
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
          this.vehicle.id = +p["id"] || 0;
      });
    }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, "id");
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

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      // if (err.status == 404)
        //   this.router.navigate(["/home"]);

      if (err.constructor.name == "NotFoundError")
          this.router.navigate(["/home"]);
    });
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(x => x.id == this.vehicle.makeId);

    this.models = selectedMake ? selectedMake.models : [];
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
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);

    result$.subscribe(vehicle => {
      this.toastrService.success("Vehicle successfully saved.", "Success");
      this.router.navigate(["/vehicles"]);
    });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.toastrService.success("Vehicle successfully deleted.", "Success");
        // navigate user to list of vehicles but for now, go home
        this.router.navigate(["/home"]);
      });
    }
    
  }
}
