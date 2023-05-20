import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api/api-services.service';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './vehicle-home.component.html',
  styleUrls: ['./vehicle-home.component.css']
})
export class VehicleHomeComponent implements OnInit{
  
  // variable to hold confirm booking spinner
  confirmBookingSpinner: boolean = false

   // variable to hold are you sure
   pleaseWait:boolean=false

  // logout value
  logoutScreenValue:boolean=false

  // terms and condition show
  termsandConditions:boolean=true

  // variable to hold proceed button
  proceedButton: boolean = false;

  // variable to hold price
  price:number=0

 
  // variable to hold details in payment div
  ownerName:any=''
  selectService:any=''
  contactNumber:any=''
  vehicleLocation:any=''
  pickupDate:any=''
  deliveryDate:any=''

  // array to hold all services

  allServices:any=[]

  // variable to hold username from local storage

  localStorageUsername:any=''

  constructor(private api:ApiServicesService,private fb:FormBuilder,private paymentRoute:Router){}

  ngOnInit(): void {

    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.paymentRoute.navigateByUrl('')
    }
    
   this.localStorageUsername= localStorage.getItem('username')

this.api.getAllServices().subscribe((result:any)=>{
  
  this.allServices=result

},
(result:any)=>{
  alert(result.error)
})

  }

serviceForm=this.fb.group({
  serviceOwner:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  serviceType:['',Validators.required],
  number:['',[Validators.required,Validators.pattern('[0-9]*')]],
  locationAddress:['',[Validators.required]],
  pickUpDate:['',[Validators.required]],
  deliveryDate:['',[Validators.required]]
})  

bookServiceButtonClicked(){
  if(this.serviceForm.valid){

this.ownerName=this.serviceForm.value.serviceOwner
this.selectService=this.serviceForm.value.serviceType
this.contactNumber=this.serviceForm.value.number
this.vehicleLocation=this.serviceForm.value.locationAddress
this.pickupDate=this.serviceForm.value.pickUpDate
this.deliveryDate=this.serviceForm.value.deliveryDate


// api call to get price of selected item
this.api.getPrice(this.selectService).subscribe((result:any)=>{
this.price=result


})
// to show terms and conditions

this.termsandConditions=false

// api call to save service form details




  


  }
  else{
    alert('Please fill all the fields')
  }
}

bookButtonClicked(){

  this.confirmBookingSpinner=true
  
  // api call to save items
  this.api.saveServiceAppointment(this.localStorageUsername,this.price,this.ownerName,this.selectService,this.contactNumber,this.vehicleLocation,this.pickupDate,this.deliveryDate).subscribe((result:any)=>{

    setTimeout(() => {
      
      // navigating to payment page

this.paymentRoute.navigateByUrl('service-payment')

    }, 1000);

  })
}

checkboxClicked(){

 
  this.proceedButton=!this.proceedButton

}

logOutButtonClicked(){
  this.logoutScreenValue=true

}

logOut(){

  this.pleaseWait=true
   // remove data stored in local storage
  localStorage.removeItem('username')
  localStorage.removeItem('token')
 
  setTimeout(() => {
   
  this.paymentRoute.navigateByUrl('')
  }, 2000);

}
noLogOut(){
  this.logoutScreenValue=false
}
}
