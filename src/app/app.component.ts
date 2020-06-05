import { Component } from '@angular/core';
import { PushNotificationService} from 'ngx-push-notifications';

export declare class PushNotificationOptions {
  body: string;
  icon: string;
  sound: string;
  data: any;
  tag: string;
  dir: NotificationDirection;
  lang: string;
  renotify: boolean;
  sticky: boolean;
  vibrate: Array<number>;
  noscreen: boolean;
  silent: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helloworld';
  isGranted = this._pushNotificationService.isPermissionGranted;

  constructor(private _pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    this._pushNotificationService.requestPermission();
  }

  myFunction() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';
 
    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
}

}
