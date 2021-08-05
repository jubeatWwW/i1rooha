import { NgModule } from '@angular/core';

import { MatRippleModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [],
  exports: [
    MatRippleModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
  ],
  declarations: [],
  providers: [],
})
export class SharedMaterialModule {}
