import { Component } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ChallangeHandlerComponent} from "../challange-handler/challange-handler.component";
import {ChallangeCreationComponent} from "../challange-creation/challange-creation.component";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.scss',
  providers: [ DialogService ]
})
export class ChallengesComponent {
  dialogRef: DynamicDialogRef | undefined;

  list = [1,2,3,4,5,6,7,8,9,10];
  constructor(public dialogService: DialogService) { }

  openChallange(id: any) {
    this.dialogRef  = this.dialogService.open(ChallangeHandlerComponent, {
      data: { questionId: id, question: 'Write a function that returns the sum of two numbers'},
      // showHeader: false,
      header: `Challenge ${id}`,
      // width: '70%'
    });
  }

  handleFixedButtonClick() {
    this.dialogRef  = this.dialogService.open(ChallangeCreationComponent, {
      // data: { questionId: 1, question: 'Write a function that returns the sum of two numbers'},
      // showHeader: false,
      header: 'Create a Challenge',
      // width: '70%'
    });
  }
}
