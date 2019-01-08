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
  //vehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {
    pageSize: 2
  };
  columns = [
    { title: "Id" },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact Name", key: "contactName", isSortable: true },
  ];
  queryResult: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(m => {
      this.makes = m;
    });

    this.populateVehicles();
  }

  populateVehicles() {
    //this.vehicleService.getVehicles(this.query).subscribe(v => this.vehicles = v);
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);
  }

  onFilterChange() {
    //this.filter.modelId = 8;
    this.populateVehicles();
  }

  resetFilters() {
    this.query = {};
    this.onFilterChange();
  }

  sortBy(field) {
    console.log("clicked");
    if (this.query.sortBy == field) {
      this.query.isSortAscending = !this.query.isSortAscending;
    }
    else {
      this.query.sortBy = field;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }

  onPageChange(pageNumber) {
    this.query.page = pageNumber;
    this.populateVehicles();
  }
}
