import { baseModel} from "./baseModel";

export class departmentModel extends baseModel{

    depId: number;
    depName: string;
    

    constructor(){
        super()
        this.depId=0;
        this.depName='';
        
    }
}