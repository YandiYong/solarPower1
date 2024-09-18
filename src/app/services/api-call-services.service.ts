import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Users,Appliances } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiCallServicesService {
 //@Input( )
  private apiUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

    getUsers(): Observable<any>{
      return this.http.get(`${this.apiUrl}/Users`);
    }


    //setCurrent(theUser: any):void{}


    //private apiUrl1 = "http://localhost:3000/Appliances";

    getAppliances():Observable<any>{
      return this.http.get(`${this.apiUrl}/Appliances`);
    }
  
    addApp(appData:any):Observable<any>{
      return this.http.post(`${this.apiUrl}/Appliances`,appData)
    }
    


}
