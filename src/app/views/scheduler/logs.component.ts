import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Task } from './task';
import { Invocation } from './invocation';
import { SchedulerService } from './scheduler.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'logs.component.html'
})
export class LogsComponent {
  taskId: number;
  tasks: {[k: number]: Task} = {};
  invocations: Invocation[];
  
  constructor(private ss: SchedulerService, private route: ActivatedRoute){
      this.route.params.subscribe( params => {
        this.taskId = params.id?parseInt(params.id):null;  
        this.update()} );
  }
  
   update(){
    this.ss.getTasks().subscribe(taskArray => {
      taskArray.forEach(task => {
        this.tasks[task.id.valueOf()] = task;
      });
      if (this.taskId != null){
        this.ss.getInvocationsForTask(this.taskId).subscribe(invocations => {
        this.invocations = invocations;
      })    
      } else {
        this.ss.getInvocations().subscribe(invocations => {
        this.invocations = invocations;
      })    
      }
        
     });
  }
}

  
