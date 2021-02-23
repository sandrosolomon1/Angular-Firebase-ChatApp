import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase/app";
import { tap, map, switchMap, first } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,private auth: AuthService) {
    console.log('let there be presence');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    //this.updateOnAway();
  }


  getPresence(uid: string): Observable<any> {
    return this.db.object(`status/${uid}`).valueChanges();
  }

  setPresence(status: string) {
    let user;
    this.auth.CurrentUser().subscribe(res => user = res)
    if (user) {
      return this.db.object(`status/${user.id}`).update({ status, timestamp: this.timestamp });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }

  // Implement presence logic here

  updateOnUser() {
    const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    return this.afAuth.authState.pipe(
      switchMap(user =>  user ? connection : of('offline')),
      tap(status => this.setPresence(status))
    );
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
            });
        }
      })
    );
  }

  updateOnAway() {
    document.onvisibilitychange = (e) => {

      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }

  async signOut() {
    await this.setPresence('offline');
    this.auth.logout()
  }

}
