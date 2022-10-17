import {
  Directive,
  HostListener
} from '@angular/core';
import { User } from '../models/user.model';

@Directive({
  selector: '[appUserData]',
  inputs: ['appUserData']
})
export class UserDataDirective {
  appUserData!: User;

  constructor() { }

  @HostListener('mouseenter') mouseEnter(event: MouseEvent) {
    console.log('{ \n\tEvent: ', '\'mouseenter\',', '\n\tUser data: ', this.appUserData, '\n}');
  }
  @HostListener('mouseleave') mouseLeave(event: MouseEvent) {
    console.log('Event: ', '\'mouseleave\'');
  }
}
