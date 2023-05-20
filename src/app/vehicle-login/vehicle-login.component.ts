import { Component, OnInit} from '@angular/core';
import { ApiServicesService } from '../api/api-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-login',
  templateUrl: './vehicle-login.component.html',
  styleUrls: ['./vehicle-login.component.css']
})
export class VehicleLoginComponent implements OnInit{
  // variable to hold login spinner
  loginSpinner:boolean=false

  // variable to hold all service array
  allServices:any=[]

  // variable to hold login display screen

  loginDisplay:boolean=false

  // function to change login display screen

  loginDisplayButton(){
this.loginDisplay=true
  }
  // function to calcel login
  loginCancelButton(){
    this.loginDisplay=false
  }

  // constructor
  constructor(private api:ApiServicesService,private fb:FormBuilder,private loginRouter:Router){}

ngOnInit(): void {
  this.api.getAllServices().subscribe((result:any)=>{
    
    this.allServices=result
    
  },
  (result:any)=>{
    alert(result.error)
  })

}

// form group
loginForm=this.fb.group({
  username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

// login button clicked

loginButtonClicked(){

  if(this.loginForm.valid){

    let username=this.loginForm.value.username
    let password=this.loginForm.value.password

    if(this.loginForm.value.username=='admin'){


      this.api.loginUser(username,password).subscribe((result:any)=>{


      
        // login spinner
        this.loginSpinner=true
    
        // local storage for token
        localStorage.setItem('token',result.token)
    
       
        setTimeout(() => {
    
    this.loginRouter.navigateByUrl('admin-user')
          
        }, 2000);
    
        }
        ,(result:any)=>{
    
          alert(result.error)
    
        })

    }
    else{

      
    this.api.loginUser(username,password).subscribe((result:any)=>{

      
      // login spinner
      this.loginSpinner=true
  
      // local storage for token
      localStorage.setItem('token',result.token)
  
      // local storage for username
      localStorage.setItem('username',result.loginUserName.username)
  
      setTimeout(() => {
  
  this.loginRouter.navigateByUrl('home')
        
      }, 2000);
  
      }
      ,(result:any)=>{
  
        alert(result.error)
  
      })


    }



  }
  else{
    alert('Please valid enter username and password')
  }
}
}
