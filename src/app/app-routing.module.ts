import { DepartmentComponent } from './department/department.component';

import { EmployeeComponent } from './employee/employee.component';
import { employeeModel } from './Models/employeeModel';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'emp',
    component: EmployeeComponent
  },
  {
    path: 'dep',
    component: DepartmentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
