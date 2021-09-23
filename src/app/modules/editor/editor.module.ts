import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeModule } from '@circlon/angular-tree-component';
import { SharedMaterialModule } from '@shared/material.module';
import { SharedPrimengModule } from '@shared/primeng.module';

import { EditorComponent } from './editor.component';
import { TreeComponent } from './components/tree.component';

import { EditorRoutingModule } from './editor.routing';

@NgModule({
  imports: [
    SharedMaterialModule,
    SharedPrimengModule,
    EditorRoutingModule,
    CommonModule,
    TreeModule,
  ],
  exports: [],
  declarations: [EditorComponent, TreeComponent],
  providers: [],
})
export class EditorModule {}
