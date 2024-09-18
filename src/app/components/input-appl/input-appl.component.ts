import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallServicesService } from 'src/app/services/api-call-services.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-input-appl',
  templateUrl: './input-appl.component.html',
  styleUrls: ['./input-appl.component.scss']
})
export class InputApplComponent {

  applForm:any;
  users:any[]=[];
  constructor(private auth:AuthService, private getService: ApiCallServicesService,private http: HttpClient,private router:Router,private formBuilder: FormBuilder){}


  ngOnInit(){

    //let unamePattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$"
    this.applForm = this.formBuilder.group({
      loadName:['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      noOfLoad:['',[Validators.required]],
      loadPower:['',[Validators.required]],
      effectiveSunlight:['',Validators.required],
      operatingHours:['',Validators.required]

    })

    this.getService.getUsers().subscribe(res=>{
      this.users = res;
    }
    )
  }
  
addAppl(){
  const userId = this.auth.getUserId();
  const postData =  {...this.applForm.value};
  console.log(userId)

   this.auth.addAppliance(postData,userId).subscribe((res)=>{
    //console.log(res)
    
    alert("Appliance Successfully added!")
   //this.router.navigate(["/login"])
  },
    (error) => {
      alert("Appliance not!")
    }        
)
}


}


