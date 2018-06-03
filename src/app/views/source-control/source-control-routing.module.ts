import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { SourceControlComponent } from './source-control.component';

const routes: Routes = [
  {
    path: '',
    component: SourceControlComponent,
    data: {
      title: 'Source Control'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceControlRoutingModule {}
