import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.css']
})
export class ServiceStatusComponent implements OnInit{

  localStorageUsername:any=''

  allPaymentItems:any=[]
  allPendingItems:any=[]


  constructor(private api:ApiServicesService,private serviceStatusRouter:Router){}


ngOnInit(): void {
  if(!localStorage.getItem('token')){
    alert('Please Login')
    this.serviceStatusRouter.navigateByUrl('')
  }

  this.localStorageUsername= localStorage.getItem('username')

  this.api.getPaymentForServiceStatus(this.localStorageUsername).subscribe((result:any)=>{
    this.allPaymentItems=result
  })
 
  
  this.api.getPendingServiceForServiceStatus(this.localStorageUsername).subscribe((result:any)=>{
    this.allPendingItems=result
  })
}
}
