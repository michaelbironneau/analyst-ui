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
  private showAddOption: Boolean = false;
  private newAQLOption = {
    name: '',
    value: null,
    type: 'String'
  }
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
    command: '',
    args: '',
    schedule: '@daily'
  };
  private aqlOptions = [];

  constructor(private ss: SchedulerService, private router: Router){
   ;
  }
 
  deleteOption(i){
    this.aqlOptions.splice(i, 1);  
  }
  
  addOption(){
    const newOption = JSON.parse(JSON.stringify(this.newAQLOption));
    if (newOption.type == 'Number'){
      newOption.value = parseFloat(newOption.value);
    }
    let found = false;
    for (var i=0; i<this.aqlOptions.length; i++){
      if (this.aqlOptions[i].name.toLowerCase()==newOption.name.toLowerCase()){
        this.aqlOptions[i] = newOption;
        found = true;
        break;
      }
    }
    if (!found) this.aqlOptions.push(newOption);
    this.newAQLOption = {
      name: '',
      value: null,
      type: 'String'
    };
  }
  
  makeAQLArgs(){
    if (this.aqlOptions.length==0) return '';
    var args = {};
    this.aqlOptions.forEach(opt => {
      args[opt.name] = opt.value;
    });
    return JSON.stringify(args);
  }
  
  create(){
    if (this.task.is_aql){
      this.task.args = this.makeAQLArgs();
    }
    this.ss.createTask(this.task).subscribe(resp => {
      this.task = JSON.parse(JSON.stringify(this.blank_task));
      this.router.navigate(['/scheduler/tasks']);
    })
  }
}

  
