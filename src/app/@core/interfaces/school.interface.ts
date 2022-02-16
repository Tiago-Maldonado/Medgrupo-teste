import { IClass } from "./class.interface";

export interface ISchool {
    id: number;
    name: string;
    address: string;
    schoolPrincipal: string;
    classes: Array<IClass>
}