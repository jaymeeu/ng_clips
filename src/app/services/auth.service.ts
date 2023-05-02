import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import IUser from '../models/user.modules';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usersCollection : AngularFirestoreCollection<IUser>

  // add dollar sign indictate a naming convention of an observable, it is optional but common among angular developers
  public isAuthenticated$ : Observable<boolean>
  public isAuthenticatedWithDelay$ : Observable<boolean>

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore
    ) { 
      this.usersCollection = db.collection('users')
      this.isAuthenticated$ = auth.user.pipe(
        map(user => !!user)
      )

      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )
    }

  public async createUser(userData : IUser){
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )
      if(!userCred.user ){
        throw new Error("user can't be found")
      }

      // await this.usersCollection.add({
      //   name : userData.name,
      //   age : userData.age,
      //   email : userData.email,
      //   phoneNumber : userData.phoneNumber
      // })
    
    //becuase we need to use the id from authentication as id of document in collection we will use doc - set
    await this.usersCollection.doc(userCred.user.uid).set({
      name : userData.name,
      age : userData.age,
      email : userData.email,
      phoneNumber : userData.phoneNumber
    })

    await userCred.user.updateProfile({
      displayName : userData.name
    })
  }
}
