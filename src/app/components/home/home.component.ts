import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallServicesService } from 'src/app/services/api-call-services.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  appList: any[] = [];
  sum: any =0;
  constructor(private router: Router, private getService: ApiCallServicesService, private auth: AuthService){}

  

  ngOnInit(){

    this.getApp();
    //console.log(this.calcSumTotalEnergy(this.appList))    
  }


  logOut(){
  localStorage.clear();
  this.router.navigate(["login"]);
  console.log("working")
 }

 getApp(): any{

     this.getService.getAppliances().subscribe(res=>{
      this.appList = res;
    
     })
  }

 calcTotalPower(appList: any): any{
  return appList = appList.no_Of_Load * appList.power_Of_Load;
}

calcTotalEnergy(appList: any): any{
  return appList = appList.no_Of_Load * appList.power_Of_Load * appList.operating_Hours;
}


  calcSumTotalEnergy(): Number{

    let totSum=0;

     for(let appliance of this.appList){
       totSum+= this.calcTotalEnergy(appliance);
     }

   return totSum;
  
 }




 calcSumTotalPower(): Number{

  let totSum=0;

   for(let appliance of this.appList){
     totSum+= this.calcTotalPower(appliance);
   }

 return totSum;
 
}



}
