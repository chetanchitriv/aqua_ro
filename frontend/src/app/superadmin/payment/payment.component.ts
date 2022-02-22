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


  
 
  //payment
//   pay(){
//   options = {
//   "key": "rzp_test_QTqT8RlhnJKjDk", // Enter the Key ID generated from the Dashboard
//   "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//   "currency": "INR",
//   "name": "Shankar Sales",
//   "description": "Test Transaction",
//   "image": "https://image.freepik.com/free-vector/credit-card-landing-page-payment-concept_23-2148298750.jpg",
//   "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//   "handler": function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }){
//       alert(response.razorpay_payment_id);
//       alert(response.razorpay_order_id);
//       alert(response.razorpay_signature)
//   },
//   "prefill": {
//       "name": "Aqua Ro",
//       "email": "aqua@gmail.com",
//       "contact": "9999999999"
//   },
//   "notes": {
//       "address": "Razorpay Corporate Office"
//   },
//   "theme": {
//       "color": "#0800ff"
//   }
// };


// this.username=localStorage.getItem("user")
    // this.rzp1 = new this.ser.nativeWindow.Razorpay(this.options)
    // this.rzp1.open();

// }

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
