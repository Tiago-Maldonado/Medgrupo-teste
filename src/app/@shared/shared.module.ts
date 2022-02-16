import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

//Libraries 
import { FlexLayoutModule } from '@angular/flex-layout';

//Components

const IMPORTS = [
	FlexLayoutModule,
	HttpClientModule,
];

const BASE_MODULES = [
	CommonModule,
	RouterModule,
	FormsModule,
	ReactiveFormsModule,
	MaterialModule,
];

@NgModule({
  declarations: [
  ],
  imports: [...IMPORTS, ...BASE_MODULES],
  exports: [
    ...BASE_MODULES
  ]
})
export class SharedModule { }
