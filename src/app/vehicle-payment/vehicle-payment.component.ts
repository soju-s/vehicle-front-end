import { Component, OnInit } from '@angular/core';

import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { ApiServicesService } from '../api/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-payment',
  templateUrl: './vehicle-payment.component.html',
  styleUrls: ['./vehicle-payment.component.css']
})
export class VehiclePaymentComponent implements OnInit{

    payLaterSpinner:boolean=false

    // to get username from local storage
    localStorageUsername:any=''

    // thank you div show
    thankYou:boolean=true

    // selected price and other details
    selectedPrice:number=1
    vehicleOwnersName:string=''
    selectedService:any=''
    mobile:number=0
    address:any=''
    pickupdate:any=''
    paymentstatus:any=''
    deliverydate:any=''


    // array to hold all booked details
    allBookedDetails:any=[]
 

   // paypal variable
   public payPalConfig ? : IPayPalConfig;
   showSuccess:boolean=false
   showCancel:boolean=false
   showError:boolean=false
   showPaypal:boolean=false

   constructor(private api:ApiServicesService,private paymentRouter:Router ){}


   ngOnInit(): void {

    if(!localStorage.getItem('token')){
        alert('Please Login')
        this.paymentRouter.navigateByUrl('')
      }

    this.localStorageUsername= localStorage.getItem('username')

    // api call to get all booked datas
    this.api.getBookedService().subscribe((result:any)=>{
console.log(result);
this.allBookedDetails=result

this.getPrice()
 //    paypal config
     
 this.initConfig();

    },(result:any)=>{
        console.log(result.error);
        
    })
   
   }

//    function to get price from array
getPrice(){
    
    this.allBookedDetails.forEach((item:any)=>{
this.selectedPrice=item.price

this.vehicleOwnersName=item.ownersname
this.selectedService=item.services
this.mobile=item.contactnumber
this.address=item.address
this.pickupdate=item.pickupdate
this.deliverydate=item.deliverydate


    })
}


  closeButtonClicked(){

  }

  // paypal

private initConfig(): void {
  
  let amount =this.selectedPrice.toString()
 
  
  this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: amount,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: amount,
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'USD',
                      value:amount,
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.showSuccess = true;

          this.paymentstatus='Paid'


          
    this.api.savePaymentService(this.localStorageUsername,this.selectedPrice,this.vehicleOwnersName,this.selectedService,this.mobile,this.address,this.pickupdate,this.paymentstatus,this.deliverydate).subscribe((result:any)=>{
       

        if(result){
            this.thankYou=false

           
        }
    },
    (result:any)=>{
        console.log(result.error);
        
    })

    this.api.saveServiceHistory(this.localStorageUsername,this.selectedPrice,this.vehicleOwnersName,this.selectedService,this.mobile,this.address,this.pickupdate,this.paymentstatus,this.deliverydate).subscribe((result:any)=>{

    })


    this.api.deleteService().subscribe((result:any)=>{
        if(result){

            setTimeout(() => {

                this.paymentRouter.navigateByUrl('home')
    
                
        
            }, 3000);

        }
    },
    (result:any)=>{
        console.log(result.error);
    })
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.showCancel = true;

      },
      onError: err => {
          console.log('OnError', err);
          this.showError = true;
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          this.resetStatus();
      }
  };
}

resetStatus(){}


payLaterButtonClicked(){

    this.payLaterSpinner=true

    
    this.paymentstatus='Pay Later'


    this.api.savePaymentService(this.localStorageUsername,this.selectedPrice,this.vehicleOwnersName,this.selectedService,this.mobile,this.address,this.pickupdate,this.paymentstatus,this.deliverydate).subscribe((result:any)=>{
       

        if(result){
            this.thankYou=false

           
        }
    },
    (result:any)=>{
        console.log(result.error);
        
    })

    this.api.saveServiceHistory(this.localStorageUsername,this.selectedPrice,this.vehicleOwnersName,this.selectedService,this.mobile,this.address,this.pickupdate,this.paymentstatus,this.deliverydate).subscribe((result:any)=>{

    })


    this.api.deleteService().subscribe((result:any)=>{
        if(result){

            setTimeout(() => {

                this.paymentRouter.navigateByUrl('home')
    
                
        
            }, 3000);

        }
    },
    (result:any)=>{
        console.log(result.error);
    })

   
}

}
