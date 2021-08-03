import { NgModule } from '@angular/core';

import { SharedMaterialModule } from '@shared/material.module';

import { EditorComponent } from './editor.component';
import { TreeComponent } from './components/tree.component';

import { EditorRoutingModule } from './editor.routing';

@NgModule({
  imports: [SharedMaterialModule, EditorRoutingModule],
  exports: [],
  declarations: [EditorComponent, TreeComponent],
  providers: [],
})
export class EditorModule {}
