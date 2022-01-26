import { baseModel } from "./baseModel";

export class employeeModel extends baseModel{
    
    name:string;
    age:number;

    constructor(){
        super()
        this.name='';
        this.age=0;
    }
}