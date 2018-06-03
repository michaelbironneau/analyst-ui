import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../websocket.service';
import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Repository } from './repository';
import { SourceControlService } from './source-control.service';

@Component({
  templateUrl: 'source-control.component.html'
})
export class SourceControlComponent {   
  repositories: Repository[] = [];  
  showAddRepo: Boolean = false;
  newRepo = <Repository>{};
  
  constructor(private sc: SourceControlService, private toastr: ToastsManager, private vcr: ViewContainerRef){
      this.toastr.setRootViewContainerRef(vcr);
      this.update();
  }
  
  update(){
    this.sc.getRepositories().subscribe(repos => {
      this.repositories = repos;
    })
  }
  
  deleteRepo(id: Number){
    this.sc.deleteRepo(id).subscribe(resp => {
      this.toastr.success('Repository deleted', 'OK');
      this.update();
    })
  }
  
  updateRepo(id: Number, password: String){
    this.sc.updateRepo(id, password).subscribe(resp => {
      this.toastr.success('Repository updated', 'OK');
      this.update();
    })
  }
  
  createNewRepo(){
    this.sc.createRepo(this.newRepo).subscribe(resp => {
        this.toastr.success('Repository created', 'OK');
        this.update();
    });
  }
}

  
