import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../websocket.service';

@Component({
  templateUrl: 'editor.component.html'
})
export class EditorComponent {
  content = ``;
  constructor(private ws: WebsocketService) {
    ws.messages.subscribe(msg => console.log("Received", msg));
  }

  
}
