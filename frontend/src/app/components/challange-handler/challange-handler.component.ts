import {
  Component,
  Inject,
  Input,
  OnInit, Optional,
} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-challange-handler',
  templateUrl: './challange-handler.component.html',
  styleUrl: './challange-handler.component.scss'
})
export class ChallangeHandlerComponent implements OnInit {
  constructor(@Optional() @Inject(DynamicDialogConfig) public data: any, private api: ApiService) {}
  @Input() question: string | undefined;

  ngOnInit() {
    this.question = this.data.data.question;
  }

  html: string | undefined;

  editorOptions = {theme: 'vs-dark', language: 'python', style: {width: '100%', height: '100%'}};
  code: string= '';
  protected readonly location = location;


  submitChallenge() {
    this.api.submitChallenge(this.data.data.id, this.code).subscribe((res) => {
     if(res){
       location.reload();
     }
    });
  }
}

