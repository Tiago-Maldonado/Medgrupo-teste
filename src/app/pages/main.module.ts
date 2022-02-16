import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
import { AuthLayoutComponent } from '../@shared/layout/auth-layout/auth-layout.component';
import { SchoolsComponent } from './main/schools/schools.component';
import { MenuComponent } from './main/menu/menu.component';

const routes: Routes = [{
	path: '',
	component: AuthLayoutComponent,
	children: [
		{ path: '', redirectTo: 'menu', pathMatch: 'full' },
		{ path: 'menu', component: MenuComponent},
		{
			path: 'schools',
			loadChildren: () =>
				import('./main/schools/schools.module').then((m) => m.SchoolsModule),
		},
		{ path: '**', redirectTo: 'schools', pathMatch: 'full' },
	]
}];

@NgModule({
  declarations: [SchoolsComponent, MenuComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class MainModule { }
