import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Subject} from 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Task } from './task';
import { SchedulerService } from './scheduler.service';
import { Repository } from '../source-control/repository';
import { SourceControlService } from '../source-control/source-control.service';

@Component({
  templateUrl: 'new-task.component.html'
})
export class NewTaskComponent {
  private showAddOption: Boolean = false;
  private repository: number;
  private repositories: Repository[] = [];
  private executable: string = '';
  private executableCustom: string = '';
  private executables: string[] = ['python', 'node', 'bash'];
  files: string[];
  fileMatches: Observable<any>;
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
  
  constructor(private ss: SchedulerService, private scs: SourceControlService, private router: Router){
   this.scs.getRepositories().subscribe(repos => {
     this.repositories = <Repository[]>[{name: 'None'}, ...repos];
     this.fileMatches = Observable.create((observer: any) => {
        // Runs on every search
      observer.next(this.task.command);
      }).mergeMap((token: string) => this.getStatesAsObservable(token));
     });
  }
  
  getStatesAsObservable(token: string): Observable<any>{
     const queryToken = token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
     let query = new RegExp(queryToken, 'ig');
     if (this.files === undefined) return Observable.of([]);
     const matches = this.files.filter((file: string) => query.test(file));
     return Observable.of(matches);
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
  
  repoChanged(event: any){
      if (this.repository === undefined){
        this.files = [];
        return;
      }
      this.scs.getFiles(this.repository).subscribe(files => {
        if (files === undefined) return;
        this.files = files;
      });
  }
  
  makeAQLArgs(){
    if (this.aqlOptions.length==0) return '';
    var args = {};
    this.aqlOptions.forEach(opt => {
      args[opt.name] = opt.value;
    });
    return JSON.stringify(args);
  }
  
  setSubprocessArgs(){
    const command = this.task.command;
    if (this.executable == 'Other'){
      this.task.command = this.executableCustom;
    } else {
      this.task.command = this.executable;
    }
    if (command.length > 0){
      this.task.args = command + ' ' + this.task.args;
    }
    
  }
  
  create(){
    if (this.task.is_aql){
      this.task.args = this.makeAQLArgs();
    } else {
      this.setSubprocessArgs();
    }
    this.ss.createTask(this.task).subscribe(resp => {
      this.task = JSON.parse(JSON.stringify(this.blank_task));
      this.router.navigate(['/scheduler/tasks']);
    })
  }
}

  
