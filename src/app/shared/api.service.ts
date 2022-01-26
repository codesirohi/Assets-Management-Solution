import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface data{  
  id:number,
  name:string,
  age:number

}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // url: string = 'http://localhost:3000/Employee/';
  page:number =1;

  last: number = 1;  

  postEmployee(url:string, data: data) {
    return this.http.post<data>(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  pageUp(){

    this.page++;
  }

  pageDown(){
    if(this.page>1) this.page--;
    
  }

  pageFirst(){
    this.page = 1;
  }

  pageLast(){
    this.page = 40;
  }

  


  //page last not working  

  getEmployee(url:string) {
    return this.http.get<data>(url+'?_page='+ this.page+ '&_limit=5').pipe( 
      map((res: any) => {
        
        return res;

      })
    );
  }
  updateEmployee(url: string,data: data, id: number) {
    return this.http.put<data>(url + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteEmployee(url:string, id: number) {
    return this.http.delete<data>(url + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
