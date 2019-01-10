import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MakeService } from './services/make.service';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HttpModule, BrowserXhr } from '@angular/http'
import { FeatureService } from './services/feature.service';
import { VehicleService } from './services/vehicle.service';
import { ToastrModule } from 'ngx-toastr'
import { AppErrorHandler } from './common/app-error-handler';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: "vehicles", pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: "home" },
    ]),
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    VehicleService,
    PhotoService,
    ProgressService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
