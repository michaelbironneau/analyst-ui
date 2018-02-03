import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../websocket.service';
import {Observable} from 'rxjs/Rx';

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
  };
  compiles: boolean = true;
  compileError: string = '';
  constructor(private ws: WebsocketService) {
    ws.messages.subscribe(msg => {
      if (msg.type === 'COMPILE' && msg.data !== undefined){
        this.compiles = msg.data.success;
        this.compileError = msg.data.error||'';
      } else if (msg.type === 'LOG' && msg.data.entry !== undefined){
        this.script.logs += msg.data.entry;
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
    this.ws.messages.next({type: "RUN", data: {script: this.script.content}});
  }
     
}

  
