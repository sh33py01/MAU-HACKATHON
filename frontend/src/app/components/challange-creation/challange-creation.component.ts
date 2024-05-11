import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-challange-creation',
  templateUrl: './challange-creation.component.html',
  styleUrl: './challange-creation.component.scss'
})

export class ChallangeCreationComponent {
  formGroup!: FormGroup;
  titleValue: any;
  questionValue: any;
  answerValue: any;

  submitQuestion() {
    console.log(this.titleValue);
    console.log(this.questionValue);
    console.log(this.answerValue);
  }
}

