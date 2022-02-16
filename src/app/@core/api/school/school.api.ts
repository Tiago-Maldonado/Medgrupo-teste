import { Inject, Injectable, Injector } from '@angular/core';
import { stringFormat } from 'src/app/@core/utils/string-format.utils';
import { ApiBase } from '../api.base';
import { ENDPOINTS } from '../api.endpoints';

@Injectable({
	providedIn: 'root'
})
export class SchoolAPI extends ApiBase {

	constructor(@Inject(Injector) injector: Injector) {
		super(injector);
	}

     public newSchool(school: any){
         return this._post(ENDPOINTS.Schools, school);
    }

	public getAllSchools() {
		return this._get(ENDPOINTS.Schools)
	}

	public getSchoolById(id: number) {
	 	const endpoint = stringFormat(ENDPOINTS.SchoolById, id);
	 	return this._get(endpoint)
	}

	public editSchool(id: number, school: any) {
	 	const endpoint = stringFormat(ENDPOINTS.SchoolById, id);
	 	return this._put(endpoint, school)
	}

	public deleteSchool(id: number) {
		const endpoint = stringFormat(ENDPOINTS.SchoolById, id);
	 	return this._delete(endpoint)
	}
}
