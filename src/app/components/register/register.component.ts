import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/interfaces/auth';
import { ApiCallServicesService } from 'src/app/services/api-call-services.service';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/passwordMatch-directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  newUser: any;;

  registerForm:any;

 constructor(private auth:AuthService, private getService: ApiCallServicesService,private http: HttpClient,private router:Router,private formBuilder: FormBuilder){}


    ngOnInit(){

      //let unamePattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$"
      this.registerForm = this.formBuilder.group({
        fullName:['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',Validators.required]

      },{
         validators: passwordMatchValidator
      })
    }

    register(){

         const postData =  {...this.registerForm.value};
        delete postData.confirmPassword;//TODO: not to save data to our database

        this.auth.register(postData).subscribe((res)=>{
          console.log(res)
          alert("User Successfully registered!")
          this.router.navigate(["/login"])
        },
          (error) => {
            alert("User not registered something went wrong!")
          }        
      )
    }
}
