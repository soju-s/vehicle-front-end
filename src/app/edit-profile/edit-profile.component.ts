import { Component } from '@angular/core';
import { ApiServicesService } from '../api/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  errorMessage:boolean=false


  profileEditedSuccess:boolean=false

  NewUsername:any
  NewEmail:any
  NewPassword:any

  // object to hold login details
  loginDetails:any={}

  // variable to hold confrim password div
  showConfirmPassword:boolean=true
  
  // variable to hold username from local storage
  username:any
// variable to hold password from input
  confirmPassword:any

  constructor(private api:ApiServicesService,private ProfileRouter:Router){}

  confirmButtonCLicked(password:any){

   this.username= localStorage.getItem('username')

this.confirmPassword=password.value

this.api.loginUser(this.username,this.confirmPassword).subscribe((result:any)=>{

  this.showConfirmPassword=false
 
  this.loginDetails=result
  
},
(result:any)=>{
  alert('Invalid Password')
})

  }

  updateButtonClicked(newusername:any,email:any,password:any){
    this.username=localStorage.getItem('username')

   this.NewUsername= newusername.value
   this.NewEmail=email.value
   this.NewPassword=password.value
   
   
    
    this.api.editProfile(this.username,this.NewPassword,this.NewEmail,this.NewUsername).subscribe((result:any)=>{
     
      
      localStorage.removeItem('username')
      localStorage.setItem('username',result.username)

      this.profileEditedSuccess=true

      setTimeout(() => {

        this.ProfileRouter.navigateByUrl('home')
        
      }, 2000);

    },
    (result:any)=>{
      this.errorMessage=true

      
      setTimeout(() => {

        this.ProfileRouter.navigateByUrl('home')
        
      }, 2000);
    })

  }

}
