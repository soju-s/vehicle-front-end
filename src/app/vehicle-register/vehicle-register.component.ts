import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '../api/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css']
})
export class VehicleRegisterComponent {
  // variable to hold person icon
  showIcon:boolean=true

  // variable to hold spinner value
  showSpinner:boolean=false

  constructor(private fb:FormBuilder,private api:ApiServicesService,private registerRouter:Router){}

  // registration form
  registerForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    confirmPassword:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })


  // register button clicked
  registerButtonClicked(){

   

    if(this.registerForm.valid){
      if(this.registerForm.value.password==this.registerForm.value.confirmPassword){

        let username=this.registerForm.value.username
        let email=this.registerForm.value.email
        let password=this.registerForm.value.password


        if(this.registerForm.value.username=='admin'){
          alert('Please Enter Valid Username')
          this.registerForm.reset()
        }
        else{

          this.api.newUserRegi(username,email,password).subscribe((result:any)=>{
            if(result){
              
              this.showSpinner=true
              this.showIcon=false
  
              // to store items in local storage
              localStorage.setItem('token',result.token)
  
              // store username in local storage
              localStorage.setItem('username',result.newUser.username)
  
          setTimeout(() => {
           
           this.registerRouter.navigateByUrl('home')
  
          }, 2000);
  
            }
            else{
             
            }
          },(result:any)=>{
            alert('Username Already Exist')
          })
  

        }

     

      }
      else{
        alert("Passwords do not match");
      }
    }
    else{
      alert("Please fill in all the fields");
    }
  }

}
