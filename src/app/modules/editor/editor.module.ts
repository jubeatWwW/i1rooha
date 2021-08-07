import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '@shared/material.module';

import { EditorComponent } from './editor.component';
import { TreeComponent } from './components/tree.component';

import { EditorRoutingModule } from './editor.routing';

@NgModule({
  imports: [SharedMaterialModule, EditorRoutingModule, CommonModule],
  exports: [],
  declarations: [EditorComponent, TreeComponent],
  providers: [],
})
export class EditorModule {}
