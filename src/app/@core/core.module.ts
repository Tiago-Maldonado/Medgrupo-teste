import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from './api/api.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, ApiModule],
	exports: [ApiModule]
})
export class CoreModule { }
