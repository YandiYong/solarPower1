import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators , FormGroup ,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallServicesService } from 'src/app/services/api-call-services.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
   users:any;
   token: any ="gfsgfeyyeyyehcbc1133ggjk"
  // private apiUrl='http://localhost:3000/Users';
   //Step:1
  constructor(private auth:AuthService, private router: Router ,private getService: ApiCallServicesService, private formBuilder: FormBuilder, private http: HttpClient){}
        //Step:2
       loginForm: any;
        //Step:3
       ngOnInit(){

          //Step:4 Renders users to html using pipe async(offer automatic subcribe)
          this.users = this.getService.getUsers();
//let unamePattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
           //Step:5 Building loginForm with validations
          this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required,Validators.email]],
            password: ['', Validators.required]

         })//End formBuild
       }//EndngOnInit

       login(): void {
        if (this.loginForm.invalid) {
          return;
        }
    
        this.auth.login(this.loginForm.value).subscribe(
          (response) => {
            this.auth.saveToken(response.token);
            const user = this.auth.getToken();
            console.log('Logged in user:', user);
            this.router.navigate(['input-appl']);
          },
          (error) => {
            console.error('Login failed', error);
            alert('User not found');
          }
        );
      }
  }

