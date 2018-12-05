import { Component, OnInit } from '@angular/core';
import { MakeService } from 'src/app/services/make.service';
import { FeatureService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: any = {};

  constructor(private makeService: MakeService, private featureService: FeatureService) { }

  ngOnInit() {
    this.makeService.getAll().subscribe(makes => {
      this.makes = makes;
      console.log("MAKES", this.makes);
    });
  }

  onMakeChange() {
    var selectedMake = this.makes.find(x => x.id == this.vehicle.makeId);

    this.models = selectedMake ? selectedMake.models : [];
  }
}
