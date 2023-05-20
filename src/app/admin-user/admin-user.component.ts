import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api/api-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit{

// variable to hold search term from search box
  searchTerm:any=''

  newPriceValue:any
  

  // variable to hold all service array
  allServices:any=[]

  // variable to hold payment service array
  allPaymentItems:any=[]

  // variable to hold onservice array
  onServiceItems:any=[]

  constructor(private api:ApiServicesService,private adminRouter:Router){

  }

  ngOnInit(): void {

    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.adminRouter.navigateByUrl('')
    }
    
    this.api.getPaymentService().subscribe((result:any)=>{
   
     
this.allPaymentItems=result

      
    })

this.api.getPendingService().subscribe((result:any)=>{
  this.onServiceItems=result
  
  
})

this.api.getAllServices().subscribe((result:any)=>{
this.allServices=result


})
  }


  logOutButtonClicked(){

    localStorage.removeItem('token')

this.adminRouter.navigateByUrl('')

  }

  sendDriverButonClicked(_id:any,items:any){

    // api call to save in onservice schema
    this.api.saveOnService(items).subscribe((result:any)=>{
this.onServiceItems=result
console.log(result);

    },
    (result:any)=>{
      alert(result.error)
    })


    // api call to delete
    this.api.deletePaymentService(_id).subscribe((result:any)=>{
      
      this.allPaymentItems=result
      window.location.reload()
    },
    (result:any)=>{
      alert(result.error)
    })

  }

  finishButtonCLicked(_id:any){
    this.api.deletePendingService(_id).subscribe((result:any)=>{
      this.onServiceItems=result
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  saveButtonClicked(_id:any,newPrice:any){
   this.newPriceValue= newPrice.value

this.api.editServicePrice(_id,this.newPriceValue).subscribe((result:any)=>{

  this.allServices=result
 
},
(result:any)=>{
  alert(result.error)
}
)

  }

  search(event:any){
this.searchTerm=event.target.value
  }
}
