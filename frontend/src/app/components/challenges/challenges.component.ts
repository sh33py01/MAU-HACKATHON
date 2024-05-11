import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ChallangeHandlerComponent} from "../challange-handler/challange-handler.component";
import {ChallangeCreationComponent} from "../challange-creation/challange-creation.component";
import {ApiService} from "../../services/api.service";
import {ChallengeModel} from "./challenge.model";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.scss',
  providers: [ DialogService, ApiService ]
})
export class ChallengesComponent implements OnInit {
  dialogRef: DynamicDialogRef | undefined;
  challenges: ChallengeModel[] = [];

  list = [1,2,3,4,5,6,7,8,9,10];
  constructor(public dialogService: DialogService, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getChallengeList().subscribe((res: ChallengeModel[]) => {
      this.challenges = res;
      console.log(this.challenges);
    });
  }

  openChallange(id: any) {
    const challenge = this.challenges.find(challenge => challenge.id === id);
    if(challenge){
      this.dialogRef  = this.dialogService.open(ChallangeHandlerComponent, {
        data: challenge,
        header: `${challenge.description}`,
      });
    }
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
