import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Task } from './task';
import { SchedulerService } from './scheduler.service';

@Component({
  templateUrl: 'tasks.component.html'
})
export class TasksComponent {
    private tasks: Task[] = [];
    private confirmations: {[k: number]: Boolean} = {};
  constructor(private ss: SchedulerService){
   ss.getTasks().subscribe(tasks => {this.tasks = tasks});
  }
  
  deleteTask(id: number){
    this.ss.deleteTask(id).subscribe(r => {
      this.confirmations[id] = false;
      this.ss.getTasks().subscribe(tasks => {this.tasks = tasks});
    })
  }
}

  
