import { NgModule } from '@angular/core';
import { SourceControlComponent } from './source-control.component';
import { SourceControlRoutingModule } from './source-control-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';  
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    SourceControlRoutingModule,
    TabsModule,
    CommonModule,
    MomentModule,
    ToastModule.forRoot(),
  ],
  declarations: [ SourceControlComponent],
  providers: []
})
export class SourceControlModule { }
