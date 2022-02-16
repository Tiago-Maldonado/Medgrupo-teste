import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ISchool } from '../../../@core/interfaces/school.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SchoolAPI } from '../../../@core/api/school/school.api';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
  animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})
export class SchoolsComponent implements OnInit {
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatTable) table: MatTable<any>;

  public columnsToDisplay = ['icon','name', 'address', 'schoolPrincipal', 'actions'];

  public expandedElement: ISchool;

  public dataSource = new MatTableDataSource<any>();

  constructor(private __cdr: ChangeDetectorRef, private __schoolAPI: SchoolAPI) { }

  ngOnInit(): void {
    this.loadSchoolsInfo();
  }

  ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

  public async loadSchoolsInfo(){
    await this.__schoolAPI.getAllSchools().then((res: any) =>{
      this.dataSource.data = res;
    });
  }

  public async deleteSchool(id: number){
    await this.__schoolAPI.deleteSchool(id).then((res: any) => {
      this.loadSchoolsInfo();
    });
  }

  public async findClass(idSchool: number, idClass: number){
    await this.__schoolAPI.getSchoolById(idSchool).then((res: any) => {
      this.removeClass(res, idClass);
    });
  }

  public removeClass(data: any, idClass: number){
    for(let i = 0; i < data.classes.length; i++){
      if(idClass == data.classes[i].id){
        data.classes.splice(i, 1);
        this.__schoolAPI.editSchool(data.id, data);
        break;
      }
    }
    this.loadSchoolsInfo();
  }

}
