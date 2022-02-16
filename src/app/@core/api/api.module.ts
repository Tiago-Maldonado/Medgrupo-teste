import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAPI } from './school/school.api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule],
  providers: [SchoolAPI],
})
export class ApiModule { }
