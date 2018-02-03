import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import {CodeMirrorDirective} from '../../directives';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WebsocketService } from '../../websocket.service';
import { CommonModule } from '@angular/common';  

@NgModule({
  imports: [
    EditorRoutingModule,
    ChartsModule,
    TabsModule,
    CommonModule,
  ],
  declarations: [ EditorComponent, CodeMirrorDirective],
  providers: [WebsocketService]
})
export class EditorModule { }
