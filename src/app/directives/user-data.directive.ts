import {
  Directive,
  HostListener
} from '@angular/core';
import { User } from '../models/user.model';

@Directive({
  selector: '[userData]',
  inputs: ['userData']
})
export class UserDataDirective {
  userData!: User;

  constructor() { }

  @HostListener('mouseenter', ['$event']) mouseEnter(event: Event) {
    console.log('{ \n\tEvent: ', `'${event.type}',`, '\n\tUser data: ', this.userData, '\n}');
  }
  @HostListener('mouseleave', ['$event']) mouseLeave(event: Event) {
    console.log('Event: ', `'${event.type}'`);
  }
}
