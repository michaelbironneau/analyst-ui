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
    content: ''
  };
  compiles: boolean = true;
  compileError: string = '';
  constructor(private ws: WebsocketService) {
    ws.messages.subscribe(msg => {
      if (msg.type === 'COMPILE' && msg.data !== undefined){
        this.compiles = msg.data.success;
        this.compileError = msg.data.error||'';
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
  
  sendTest(){
    console.log('HERE');
  }
     
}

  
