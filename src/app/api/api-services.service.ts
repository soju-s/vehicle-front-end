import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  

  // variable to hold base url
  Base_url='https://wheels-doc-service.onrender.com'

  constructor(private http:HttpClient) { }

  // api call for all services
  getAllServices(){
    return this.http.get(`${this.Base_url}/all-services`)
  }

  // api call for new user registration
  newUserRegi(username:any,email:any,password:any){

    const body={
      username,
      email,
      password
    }
    return this.http.post(`${this.Base_url}/new-user`,body)
  }

  // api call for login
  loginUser(username:any,password:any){
    const body={
      username,
      password
    }
    return this.http.post(`${this.Base_url}/login-user`,body)
  }

  // api call to get selected item price
  getPrice(title:any){

    const body={title}

    return this.http.post(`${this.Base_url}/getservice-price`,body)

  }
  
// api call to save service appointment

saveServiceAppointment(username:any,price:any,ownersname:any,services:any,contactnumber:any,address:any,pickupdate:any,deliverydate:any){
const body={
  username,
  price,
  ownersname,
  services,
  contactnumber,
  address,
  pickupdate,
  deliverydate

}
return this.http.post(`${this.Base_url}/save-service`,body)
}

// api call to get booked service datas

getBookedService(){
  return this.http.get(`${this.Base_url}/getbook-service`)
}

// api call to save payment services
savePaymentService(username:any,price:any,ownersname:any,services:any,contactnumber:any,address:any,pickupdate:any,paymentstatus:any,deliverydate:any){

  const body={
    username,
    price,
    ownersname,
    services,
    contactnumber,
    address,
    pickupdate,
    paymentstatus,
    deliverydate
  }

  return this.http.post(`${this.Base_url}/save-payment`,body)

}

saveServiceHistory(username:any,price:any,ownersname:any,services:any,contactnumber:any,address:any,pickupdate:any,paymentstatus:any,deliverydate:any){
  const body={
    username,
    price,
    ownersname,
    services,
    contactnumber,
    address,
    pickupdate,
    paymentstatus,
    deliverydate
  }
  return this.http.post(`${this.Base_url}/save-history`,body)

}

// api call to delete booked service
deleteService(){


  return this.http.delete(`${this.Base_url}/delete-booked`)
}

// api call to get service history
getServiceHistory(username:any){
  const body={
    username
  }
  return this.http.post(`${this.Base_url}/get-servicehistory`,body)
}

// api call to get payment service for admin
getPaymentService(){
  return this.http.get(`${this.Base_url}/get-paymentservice`)
}

// delete payment items
deletePaymentService(_id:any){

  return this.http.delete(`${this.Base_url}/delete-paymentservice/${_id}`)

}

// api call to save items to onService Schema
saveOnService(service:any){
  const body={
    username:service.username,
    price:service.price,
    ownersname:service.ownersname,
    services:service.services,
    contactnumber:service.contactnumber,
    address:service.address,
    pickupdate:service.pickupdate,
    paymentstatus:service.paymentstatus,
    deliverydate:service.deliverydate
  }

  return this.http.post(`${this.Base_url}/save-onservice`,body)

}

// api call to get all pending service
getPendingService(){
  return this.http.get(`${this.Base_url}/get-onservice`)
}

// api call to delete pending item
deletePendingService(_id:any){
  return this.http.delete(`${this.Base_url}/delete-onservice/${_id}`)
}

// api call to edit service price
editServicePrice(_id:any,price:any){
  const body={
    _id,
    price
  }
  return this.http.post(`${this.Base_url}/edit-service`,body)
}

// api call to get payment service for service status component
getPaymentForServiceStatus(username:any){
  const body={username}

  return this.http.post(`${this.Base_url}/get-paymentstatus`,body)

}

// api call to get pending service for service status component
getPendingServiceForServiceStatus(username:any){
  const body={username}

  return this.http.post(`${this.Base_url}/get-pendingstatus`,body)
}

// token appending in header
appendToken(){

  let token=localStorage.getItem('token')

  let headers=new HttpHeaders()
  if(token){
headers=headers.append('verify-token',token)

  }
  return 

}

// api call to edit profile
editProfile(username:any,NewPassword:any,NewEmail:any,NewUsername:any){

  const body={
    username,
    NewPassword,
    NewEmail,
    NewUsername
  }
  return this.http.post(`${this.Base_url}/edit-profile`,body)
}

}
