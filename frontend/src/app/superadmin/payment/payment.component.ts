import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentform: any= FormGroup;
  nativeWindow: any;
  rzp1: any;
  options:any;


  constructor(private ser: UserService) { }

  ngOnInit(): void {
  }

pay(){
    this.options = {
      "key": "rzp_test_QTqT8RlhnJKjDk", 
      "amount": "50000", 
    //   "amount": this.grandTotal + "00", 
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Aqua Ro",
      "description": "Get your Recharge Now!!!",
      "image": "https://s3.amazonaws.com/logosnap/logos/2022/Feb/small-2287-62147c139c5e0.png",
      "order_id": "", 
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": {
        //   "name": this.username,
        //   "email": this.user.email,
        //   "contact": this.user.phoneno
        "name": "Aqua Ro",
              "email": "aqua@gmail.com",
              "contact": "9999999999"

      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#ff0813"
      }
    }
    // this.username=localStorage.getItem("user")
    this.rzp1 = new this.ser.nativeWindow.Razorpay(this.options)
    this.rzp1.open();
  }



}
