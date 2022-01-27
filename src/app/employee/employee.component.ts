import { employeeModel } from './../Models/employeeModel';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup ,ReactiveFormsModule, FormBuilder } from '@angular/forms';

interface data{  
  id:number,
  name:string,
  age:number

}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  closeResult = ''; // Modal related
  formValueEmp!: FormGroup;
  employeeModelObj: employeeModel = new employeeModel();
  employeeData!: any;
  url: string = 'http://localhost:3000/Employee/';


  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formValueEmp = this.formbuilder.group({
      name:[''],
      age:[''],
    });
    this.getEmployeeDetails();
   
  }

  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValueEmp.value.name;
    this.employeeModelObj.age = this.formValueEmp.value.age;
    this.api.postEmployee(this.url,this.employeeModelObj)
    .subscribe((res) => {
      console.log(res);
      // alert('Employee Added Succesfully');
      this.getEmployeeDetails();
      this.formValueEmp.reset();
      
    });
}

  //Function to get all employee details
  getEmployeeDetails(){
    this.api.getEmployee(this.url)
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  //Function to get all Employee Details
  delEmployeeDetails(row: any){
    this.api.deleteEmployee(this.url,row.id)
    .subscribe(res=>{
      this.getEmployeeDetails();
      alert(row.name + " deleted.")
    })

  }

  //Populate form Employee
  onEdit(row: any){
    this.employeeModelObj.id = row.id; //to be used in the update function
    this.formValueEmp.controls['name'].setValue(row.name)
    this.formValueEmp.controls['age'].setValue(row.age)
  }

  //Update Employee details in Database
  updateEmployeeDetails(){
    
    this.employeeModelObj.name = this.formValueEmp.value.name;
    this.employeeModelObj.age = this.formValueEmp.value.age;

    this.api.updateEmployee(this.url,this.employeeModelObj, this.employeeModelObj.id) //calling the service
    .subscribe(res=>{
      this.formValueEmp.reset();
      this.getEmployeeDetails();

    })
  }

  //Next Page
  pageInc(){
    this.api.pageUp();
    this.getEmployeeDetails();

  }

  //Previous page
  pageDec(){
    this.api.pageDown();
    this.getEmployeeDetails();
  }

  //First Page
  pageStart(){
    this.api.pageFirst();
    this.getEmployeeDetails();
  }

  //Last page
  pageEnd(){
    this.api.pageLast(this.url)
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

//sorting the data by name
  sortCurrentName(){
    this.employeeData.sort((a:any,b:any)=>(a.name>b.name)?1:-1)
  }

//sortingthe data by age
  sortCurrentAge(){
    this.employeeData.sort((a:any,b:any)=>(a.age>b.age)?1:-1)
  }


//search
  search(val:string){
    this.api.searchEmployee(this.url,val)
    .subscribe(res=>{
      this.employeeData =res;
    })
     
  }






  //ng-Modal opening, Closing and other functioning
  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //ng-Modal opening, Closing and other functioning

}
