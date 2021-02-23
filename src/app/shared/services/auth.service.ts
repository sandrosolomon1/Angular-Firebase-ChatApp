import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {FbAuthResponse, User} from "../interfaces";
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject, Observable, of, pipe, Subject, Subscription, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  private _userData: Observable<firebase.User>;

  private currentUser: UserData;
  private currentUser$ = new BehaviorSubject<UserData>(null);


  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this._userData = afAuth.authState;

    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            console.log(currentUser)
            this.currentUser = currentUser;
            this.currentUser$.next(currentUser);
          });
      }
    });
  }

  private setToken(r: string | null) {
    if(r) localStorage.setItem('fb-token',r)
    else localStorage.clear()
  }

  get token(): string {
    return localStorage.getItem('fb-token')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
  }

  get userData(): Observable<firebase.User> {
    return this._userData;
  }

  logout(): void {
    this.afAuth.signOut().then(res => {
      console.log(this.currentUser$)
      this.setToken(null)
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigate(['/login'])
    });
  }

  SignIn(email: string, password: string): void {

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this._userData = this.afAuth.authState;

        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            // @ts-ignore
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
          });

        res.user.getIdToken().then(r => this.setToken(r))

        this.router.navigate(['/home'])

      }).catch(err => console.log(err.message));
  }

  searchUserInDatabase(user_id: string): Observable<UserData> {
    return this.afs.collection<UserData>('users').doc<UserData>(user_id).valueChanges();
  }

  getAllUsers(): Observable<any> {
    return this.afs.collection<any>('users').get()
  }

  SignUp(email: string,
         password: string,
         firstName: string,
         lastName: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)
        if (res) {
          this.afs.collection('users').doc(res.user.uid)
            .set({
              firstName,
              lastName,
              email
            }).then(value => {
            this.afs.collection<UserData>('users')
              .doc<UserData>(res.user.uid)
              .valueChanges()
              .subscribe(user => {
                if (user) {
                  this.currentUser$.next(user);
                }
              });

          });

          this.router.navigate(['/home'])
        }
      })
      .catch(err => console.log(`Something went wrong ${err.message}`));
  }
}
