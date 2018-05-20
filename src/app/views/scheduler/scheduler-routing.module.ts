import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { SchedulerComponent } from './scheduler.component';
import { TasksComponent } from './tasks.component';
import { LogsComponent } from './logs.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    data: {
      title: 'Scheduler'
    },
    children: [{
      path: 'tasks',
      component: TasksComponent,
      data: {
        title: 'Tasks'
      }
    },{
      path: 'logs',
      component: LogsComponent,
      data: {
        title: 'Logs'
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule {}
