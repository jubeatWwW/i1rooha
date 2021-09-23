import { NgModule } from '@angular/core';

import { SharedMaterialModule } from '../shared/material.module';

import { AppRoutingModule } from '../app-routing.module';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [AppRoutingModule, SharedMaterialModule],
  exports: [],
  declarations: [LayoutComponent, HeaderComponent, SidenavComponent],
  providers: [],
})
export class LayoutModule {}
