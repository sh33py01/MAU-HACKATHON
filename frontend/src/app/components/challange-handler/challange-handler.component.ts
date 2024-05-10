import { Component, Input } from '@angular/core';
import {MenuItem} from "primeng/api";

  @Component({
  selector: 'app-challange-handler',
  templateUrl: './challange-handler.component.html',
  styleUrl: './challange-handler.component.scss'
})
export class ChallangeHandlerComponent {
    @Input() question: string | undefined
    items: MenuItem[]  = [
      {
        icon: 'pi pi-times',
        command: () => {
          // CLOSE MODAL
        }
      },
      {
        icon: 'pi pi-check',
        command: () => {
          // SUBMIT
        }
      }


    ];



  }

