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

@NgModule({
  imports: [
    SchedulerRoutingModule,
    ChartsModule,
    TabsModule,
    CommonModule,
    MomentModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastModule.forRoot(),
  ],
  declarations: [ SchedulerComponent, TasksComponent, LogsComponent, NewTaskComponent],
  providers: [SchedulerService, BsModalService]
})
export class SchedulerModule { }
