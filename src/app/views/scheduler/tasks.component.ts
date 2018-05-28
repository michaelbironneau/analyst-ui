import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef, TemplateRef } from '@angular/core';
import { Task } from './task';
import { SchedulerService } from './scheduler.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Invocation } from './invocation';

@Component({
  templateUrl: 'tasks.component.html'
})
export class TasksComponent {
    scheduleModalRef: BsModalRef;
    scriptModalRef: BsModalRef;
    private editTask: Task;
    private lastUpdated: Date;
    private tasks: Task[] = [];
    private lastInvocation: {[k: number]: Invocation}= {};
    private confirmations: {[k: number]: Boolean} = {};
    
  constructor(private ss: SchedulerService, private modalService: BsModalService,
    public toastr: ToastsManager, vcr: ViewContainerRef){
      this.toastr.setRootViewContainerRef(vcr);
      this.update();
  }
  
  updateScript(){
       this.ss.updateTask(this.editTask).subscribe(resp => {
         this.toastr.success('Script updated', 'OK');
       });
  }
  
  updateSchedule(){
        this.ss.updateTask(this.editTask).subscribe(resp => {
          this.toastr.success('Schedule updated', 'OK');
        });
  }
  
  cloneTaskForEdit(ix: number){
    this.editTask = JSON.parse(JSON.stringify(this.tasks[ix]));
  }
  
  deleteTask(id: number){
    this.ss.deleteTask(id).subscribe(r => {
      this.confirmations[id] = false;
      this.toastr.success('Task deleted', 'OK');
      this.update();
    })
  }
  
  openScheduleModal(template: TemplateRef<any>) {
    this.scheduleModalRef = this.modalService.show(template);
  }
  
  openScriptModal(template: TemplateRef<any>) {
    this.scriptModalRef = this.modalService.show(template);
  }
  
  update(){
    this.lastInvocation = {};
    this.ss.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      tasks.forEach(task => {
        this.ss.getLastInvocation(task).subscribe(invocation => {
          this.lastInvocation[task.id.valueOf()] = invocation;
          console.log(this.lastInvocation);
        });
      })
      this.lastUpdated = new Date();
     });
  }
  
  enableDisable(id: number, enabled: Boolean){
    if (enabled){
        this.ss.enableTask(id).subscribe(resp => {
          this.toastr.success('Task enabled', 'OK');
          this.update();
        });
    } else {
        this.ss.disableTask(id).subscribe(resp => {
          this.toastr.success('Task disabled', 'OK');
          this.update();
        })
    }
  }
}

  
