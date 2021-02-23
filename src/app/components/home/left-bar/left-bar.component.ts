import { Component, OnInit } from '@angular/core';
import {AuthService, UserData} from "../../../shared/services/auth.service";
import {PresenceService} from "../../../shared/services/presence.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

  users: any[] = []
  presences: any[] = []
  uid: string

  constructor(private auth: AuthService, private presence: PresenceService) {
  }

  ngOnInit(): void {
    this.auth.getAllUsers().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let status
        this.presence.getPresence(doc.id).subscribe(res => {
          status = res
        })

        this.users.push({
          id: doc.id,
          data: doc.data(),
          status
        })
      });
    });
    console.log(this.users)
    //this.auth.CurrentUser().subscribe(res => this.uid = res.id);
  }



}
