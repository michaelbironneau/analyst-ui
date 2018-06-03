import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../websocket.service';
import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Repository } from './repository';

@Component({
  templateUrl: 'source-control.component.html'
})
export class SourceControlComponent {   
  repositories: Repository[] = [];  
  
  updateRepo(id: Number){
    
  }
}

  
