import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
//import { FormsModule } from "@angular/forms"

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};
  allVehicles: Vehicle[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(m => {
      this.makes = m;
    });

    this.vehicleService.getVehicles().subscribe(v => {
      this.vehicles = v;
      this.allVehicles = v;
    })
  }

  onFilterChange() {
    var vehicles = this.allVehicles;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    
      // if (this.filter.modelId)
      //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);

      this.vehicles = vehicles;
  }

  resetFilters() {
    this.filter = {};
    this.onFilterChange();
  }
}
