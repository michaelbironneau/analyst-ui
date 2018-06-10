import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { SchedulerComponent } from './scheduler.component';
import { TasksComponent } from './tasks.component';
import { LogsComponent } from './logs.component';
import { NewTaskComponent } from './new-task.component';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerService } from './scheduler.service';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';  
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MomentModule } from 'ngx-moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {BrowserModule} from '@angular/platform-browser';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SourceControlService } from '../source-control/source-control.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    SchedulerRoutingModule,
    ChartsModule,
    //BrowserAnimationsModule,
    //BrowserModule,
    TabsModule,
    CommonModule,
    MomentModule,
    HttpModule,
    FormsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [ SchedulerComponent, TasksComponent, LogsComponent, NewTaskComponent],
  providers: [SchedulerService, BsModalService, SourceControlService]
})
export class SchedulerModule { }
