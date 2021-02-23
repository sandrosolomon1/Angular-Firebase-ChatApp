import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {PresenceService} from "../../../shared/services/presence.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private presence: PresenceService) {
  }

  ngOnInit(): void {
  }

  async logout() {
    await this.presence.signOut()
  }
}
