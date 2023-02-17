import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

declare const gigya:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'b2b-demo';

  user: any;
  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    gigya.accounts.addEventHandlers({
      onLogin: (event:any) => {
        console.log(event);
        this.user = event.profile;
        this.ref.detectChanges();
      }
    });
    gigya.accounts.getAccountInfo({
      callback: (response:any) => {
        console.log(response);
        if(response.errorCode === 0) {
          this.user = response.profile;
          this.ref.detectChanges();
        }
      }
    });
  }

  registerOrg(): void {
    gigya.accounts.showScreenSet({
      screenSet: 'Default-OrganizationRegistration',
      containerID: 'registerOrg'
    });
  }

  login() {
    gigya.accounts.showScreenSet({
      screenSet: 'Default-RegistrationLogin'
    })
  }

  showProfile() {
    gigya.accounts.showScreenSet({
      screenSet: 'Default-ProfileUpdate'
    })
  }

  logout() {
    gigya.accounts.logout();
    this.user = undefined;
  }

}
