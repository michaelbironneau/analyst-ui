import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SchedulerComponent } from './scheduler.component';
import { TasksComponent } from './tasks.component';
import { LogsComponent } from './logs.component';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerService } from './scheduler.service';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { CommonModule } from '@angular/common';  
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    SchedulerRoutingModule,
    ChartsModule,
    TabsModule,
    CommonModule,
    ToastModule.forRoot(),
  ],
  declarations: [ SchedulerComponent, TasksComponent, LogsComponent],
  providers: [SchedulerService]
})
export class SchedulerModule { }
