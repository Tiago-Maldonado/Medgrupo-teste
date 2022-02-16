import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools.component';
import { RegisterSchoolComponent } from './register-school/register-school.component';
import { RegisterClassComponent } from './register-class/register-class.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolsComponent
	},
	{
		path: 'new',
		component: RegisterSchoolComponent
	},
	{
		path: 'edit/:id',
		component: RegisterSchoolComponent
	},
	{
		path: 'newclass/:id',
		component: RegisterClassComponent
	},
	{
		path: 'edit/:id/:idclass',
		component: RegisterClassComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
