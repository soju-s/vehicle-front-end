import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css']
})
export class ServiceHistoryComponent implements OnInit{

  historyDetails:any=[]

  localStorageUsername:any=''

  constructor(private api:ApiServicesService,private serviceHistoryRouter:Router){}

  ngOnInit(): void {

    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.serviceHistoryRouter.navigateByUrl('')
    }

    this.localStorageUsername= localStorage.getItem('username')
    console.log(this.localStorageUsername);
    

    this.api.getServiceHistory(this.localStorageUsername).subscribe((result:any)=>{
      console.log(result);
      this.historyDetails=result
    })
    
  }

}
