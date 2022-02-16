import { Component, OnInit } from '@angular/core';
import { SchoolAPI } from '../../../../@core/api/school/school.api';
import { ActivatedRoute } from '@angular/router';
import { MAIN_ROUTE } from 'src/app/@core/routes/main.routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISchool } from '../../../../@core/interfaces/school.interface'

@Component({
  selector: 'app-register-class',
  templateUrl: './register-class.component.html',
  styleUrls: ['./register-class.component.scss']
})
export class RegisterClassComponent implements OnInit {

  public MAIN_ROUTE = MAIN_ROUTE;

  public formClassData: FormGroup;

  public editClassControl: boolean = true;

  public schoolData: ISchool;

  constructor(private router: Router, private __schoolApi: SchoolAPI, private __formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formClassData = this.__formBuilder.group({
			id: [null, []],
			subject: [null, [Validators.required]],
			teacherName: [null, [Validators.required]],
			studentsAmount: [null, [Validators.required]]
		});

    this.route.paramMap.subscribe(params => {
      var idSchool = params.get('id');
      var idClass = params.get('idclass');

      this.loadSchoolInformation(parseInt(idClass), parseInt(idSchool));

      if(idClass == null){
        this.editClassControl = false;
      }
    });
  }

  public async loadSchoolInformation(idClass: number, idSchool: number){
    await this.__schoolApi.getSchoolById(idSchool).then((res: any) => {
      this.schoolData = res;
      
      if(idClass != null && !isNaN(idClass)){
        this.findClass(res, idClass);
      }
    })
  }

  public findClass(data: any, idClass: number){
    data.classes.forEach(element => {
      if(element.id == idClass){
        this.fillClassForm(element);
      }
    });
  }

  public fillClassForm(data: any){
    this.formClassData.patchValue({
      id: data.id,
      subject: data.subject,
      teacherName: data.teacherName,
      studentsAmount: data.studentsAmount
    });
  }

  public async confirmClassRegister(){
    if(this.formClassData.valid){
      if(!this.editClassControl){
        this.adjustClassId();
        this.verifyClassesFromSchool();
        await this.__schoolApi.deleteSchool(this.schoolData.id).then((res: any) => {
          this.schoolData.classes.push(this.formClassData.value)
        });
        await this.__schoolApi.newSchool(this.schoolData).then((res: any) =>{
          if(res){
            this.router.navigateByUrl(MAIN_ROUTE.Schools);
          }
        });
      }
      else {
        for(let i = 0; i < this.schoolData.classes.length; i++){
          if(this.formClassData.get('id').value == this.schoolData.classes[i].id){
            this.schoolData.classes.splice(i, 1)
            this.schoolData.classes.push(this.formClassData.value)
            await this.__schoolApi.editSchool(this.schoolData.id, this.schoolData).then((res: any) => {
              this.router.navigateByUrl(MAIN_ROUTE.Schools);
            });
            break;
          }
        }
      }
    }
  }

  public adjustClassId(){
    let idClass = this.schoolData.id;
    const forceAutoIncrement = 10;

    if(this.schoolData.classes != null){
      this.schoolData.classes.forEach(element =>{
        idClass += forceAutoIncrement; 
      });
    }
    
    this.formClassData.patchValue({
      id: idClass
    });
  }

  public verifyClassesFromSchool(){
    if(this.schoolData.classes == null){
      this.schoolData.classes = [];
    }
  }

}
