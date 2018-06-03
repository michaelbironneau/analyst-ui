import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'editor',
        loadChildren: './views/editor/editor.module#EditorModule'
      },{
        path: 'scheduler',
        loadChildren: './views/scheduler/scheduler.module#SchedulerModule'
      }, {
        path: 'source-control',
        loadChildren: './views/source-control/source-control.module#SourceControlModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
