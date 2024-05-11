import { Component } from '@angular/core';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
  providers: []
})
export class GuestComponent {
  list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  protected readonly location = location;
  visible: boolean = false;

  submitResults() {
    this.visible = true;
  }

  finalizeSubmit() {
    location.replace('/login');
  }
}
