import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsRoutingModule } from './schools-routing.module';
import { SharedModule } from '../../../@shared/shared.module';
import { RegisterSchoolComponent } from './register-school/register-school.component';
import { RegisterClassComponent } from './register-class/register-class.component';

@NgModule({
  declarations: [RegisterSchoolComponent, RegisterClassComponent],
  imports: [
    CommonModule,
    SharedModule,
    SchoolsRoutingModule
  ]
})
export class SchoolsModule { }
