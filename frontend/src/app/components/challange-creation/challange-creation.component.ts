import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import {ApiService} from "../../services/api.service";

interface Category {
  name: string;
}

interface Challenge  {
  id: number;
  question: string;
  description: string;
  category: string;
  points: number;
  cases: [
    {
      content: string;
      answer: string;
    }
  ]
}

@Component({
  selector: 'app-challange-creation',
  templateUrl: './challange-creation.component.html',
  styleUrl: './challange-creation.component.scss',
  providers: [ ApiService ],
})

export class ChallangeCreationComponent {
  formGroup!: FormGroup;
  titleValue: any;
  questionValue: any;
  answerValue: any;
  categories:Category[] = [
    { name: 'Java'},{ name: 'Python'}, {name: 'Javascript'}, {name:'Go'}, {name:'Php'}, {name:'C++'}, {name:'Assembly'}];
  selectedCategory: any;
  points: any;

  constructor(private api: ApiService) {
  }

  submitQuestion() {
    console.log(this.titleValue);
    console.log(this.questionValue);
    console.log(this.answerValue);
    console.log(this.points)
    console.log(this.selectedCategory.name);
    const challenge: Challenge = {
      id: 0,
      question: this.questionValue,
      description: this.titleValue,
      category: this.selectedCategory.name,
      points: this.points,
      cases: [
        {
          content: "",
          answer: this.answerValue
        }
      ]
    }

    this.api.createChallenge(challenge).subscribe((res) => {
      console.log(res);
    });
  }
}

