import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { Task } from './task';

@Component({
  templateUrl: 'scheduler.component.html'
})
export class SchedulerComponent {
}

  
