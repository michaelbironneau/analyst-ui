import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef,  TemplateRef } from '@angular/core';
import { Task } from './task';
import { Invocation } from './invocation';
import { SchedulerService } from './scheduler.service';
import {ActivatedRoute} from "@angular/router";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  templateUrl: 'logs.component.html'
})
export class LogsComponent {
  taskId: number;
  tasks: {[k: number]: Task} = {};
  invocations: Invocation[];
  logModalRef: BsModalRef;
  invocationLog: String;
  lastUpdate: Date;
  
  constructor(private modalService: BsModalService, private ss: SchedulerService, private route: ActivatedRoute){
      this.route.params.subscribe( params => {
        this.taskId = params.id?parseInt(params.id):null;  
        this.update()} );
  }
  
  openLogModal(template: TemplateRef<any>) {
    this.logModalRef = this.modalService.show(template);
  }
  
  
   update(){
    this.ss.getTasks().subscribe(taskArray => {
      taskArray.forEach(task => {
        this.tasks[task.id.valueOf()] = task;
      });
      this.lastUpdate = new Date();
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

  
