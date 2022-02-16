import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolAPI } from '../../../../@core/api/school/school.api';
import { ActivatedRoute } from '@angular/router';
import { MAIN_ROUTE } from 'src/app/@core/routes/main.routes';


@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.component.html',
  styleUrls: ['./register-school.component.scss']
})
export class RegisterSchoolComponent implements OnInit {
  public MAIN_ROUTE = MAIN_ROUTE;

  public formSchoolData: FormGroup;

  public newSchoolControl: boolean = false;

  constructor(private __schoolApi: SchoolAPI, private __formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');

      if(id != null){
        this.loadSchoolInformation(parseInt(id));
      }
      else {
        this.newSchoolControl = true;
      }
    });

    this.formSchoolData = this.__formBuilder.group({
			id: [null, []],
			name: [null, [Validators.required]],
			address: [null, [Validators.required]],
			schoolPrincipal: [null, [Validators.required]],
			classes: [null, []],
		});
  }

  public async loadSchoolInformation(id: number){
    await this.__schoolApi.getSchoolById(id).then((res: any) => {
      this.fillSchoolForm(res);
    });
  }

  public fillSchoolForm(data: any){
    this.formSchoolData.patchValue({
      id: data.id,
      name: data.name,
      address: data.address,
      schoolPrincipal: data.schoolPrincipal,
      classes: data.classes
    });
  }

  public confirmSchoolRegister(){
    if(this.formSchoolData.valid){
      if(this.newSchoolControl){
        this.__schoolApi.newSchool(this.formSchoolData.value);
      }
      else {
        this.__schoolApi.editSchool(this.formSchoolData.get('id').value, this.formSchoolData.value);
      }
    }
  }

}
