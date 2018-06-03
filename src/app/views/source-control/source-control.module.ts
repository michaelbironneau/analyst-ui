import { NgModule } from '@angular/core';
import { SourceControlComponent } from './source-control.component';
import { SourceControlRoutingModule } from './source-control-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';  
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';
import { SourceControlService } from './source-control.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    SourceControlRoutingModule,
    TabsModule,
    CommonModule,
    MomentModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
  ],
  declarations: [ SourceControlComponent],
  providers: [SourceControlService]
})
export class SourceControlModule { }
