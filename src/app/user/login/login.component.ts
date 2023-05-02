import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email : '',
    password : ''
  }

  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! your account is being created.'


  constructor (private auth : AngularFireAuth){}

  async login(){

    this.showAlert = true
    this.alertMsg = "Please wait! your account is being created."
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
     await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (error) {

      this.alertMsg = "An unexpected error occurred. Please try again."
        this.alertColor = 'red'
        this.inSubmission = false
        return
      
    }
    this.alertMsg = "Success. Your account has been created"
    this.alertColor = 'green'

  }
}
