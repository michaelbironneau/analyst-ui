import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import {CodeMirrorDirective} from '../../directives';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WebsocketService } from '../../websocket.service';
import { CommonModule } from '@angular/common';  
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    EditorRoutingModule,
    ChartsModule,
    TabsModule,
    CommonModule,
    ToastModule.forRoot(),
  ],
  declarations: [ EditorComponent, CodeMirrorDirective],
  providers: [WebsocketService]
})
export class EditorModule { }
