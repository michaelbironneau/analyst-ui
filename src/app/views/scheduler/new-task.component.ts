import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Task } from './task';
import { SchedulerService } from './scheduler.service';

@Component({
  templateUrl: 'new-task.component.html'
})
export class NewTaskComponent {
  private blank_task = {
    id: null,
    name: '',
    coalesce: false,
    is_aql: true,
    enabled: false,
    script_uri: '',
    schedule: '@daily'
  };
  private task = <Task>{
    id: null,
    name: '',
    coalesce: false,
    is_aql: true,
    enabled: false,
    script_uri: '',
    schedule: '@daily'
  };

  constructor(private ss: SchedulerService, private router: Router){
   ;
  }
  
  create(){
    this.ss.createTask(this.task).subscribe(resp => {
      this.task = JSON.parse(JSON.stringify(this.blank_task));
      this.router.navigate(['/scheduler/tasks']);
    })
  }
}

  
