import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import IUser from '../models/user.modules';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore
    ) { }

  public async createUser(userData : IUser){
    const userinfo = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )
    await this.db.collection('users').add({
      name : userData.name,
      age : userData.name,
      email : userData.email,
      phoneNumber : userData.phoneNumber
    })
  }
}
