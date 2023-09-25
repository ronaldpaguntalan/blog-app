import { Component, inject } from '@angular/core';
import { Subscription } from '../models/subscription';
import { SubscribersService } from '../services/subscribers.service';


@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  isEmailError : boolean = false;
  isSubscribed : boolean = false;

  constructor(private subService : SubscribersService){}


  onSubmit(formVal : any){
    const subData : Subscription = {
      name: formVal.value.Name, 
      email: formVal.value.Email
    }

    this.subService.checkEmail(subData.email).subscribe(val => {
      if(val.empty){
        this.subService.addSubs(subData)
        this.isSubscribed = true
        
      }
      else{
        this.isEmailError = true
        
      }
    })
  }

}
