import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../websocket.service';
import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  templateUrl: 'editor.component.html'
})
export class EditorComponent {
  _prev = '';
  _content: string = '';
  content: string = '';
  script = {
    content: '',
    logs: '',
    results: '',
    running: false
  };
  compiles: boolean = true;
  compileError: string = '';
  constructor(private ws: WebsocketService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    ws.messages.subscribe(msg => {
      if (msg.type === 'COMPILE' && msg.data !== undefined){
        this.compiles = msg.data.success;
        this.compileError = msg.data.error||'';
      } else if (msg.type === 'LOG' && msg.data.entry !== undefined){
        this.script.logs += msg.data.entry;
      } else if (msg.type === 'RUN' && msg.data !== undefined){
          this.script.running = false;
          if (msg.data.success){
            this.toastr.success('Script completed OK', 'Success');
          } else {
            this.script.logs += `<div class="alert alert-danger"><small>[ERROR]</small>${msg.data.error}</div>`;
            this.toastr.error('Script error - please check logs', 'Failure');
            
          }
      }
    });
    Observable.interval(1000).subscribe(x => {
      if (this.script.content.length > 0 && this.script.content != this._prev){
      this.ws.messages.next({type: "COMPILE", data: {script: this.script.content}});
      this._prev = this.script.content;
    }});

   
    
  }
  
  setContent($event){
    this.script.content = $event;
  }
  
  run(){
    this.script.logs = '';
    this.script.results = '';
    this.script.running = true;
    this.ws.messages.next({type: "RUN", data: {script: this.script.content}});
  }
     
}

  
