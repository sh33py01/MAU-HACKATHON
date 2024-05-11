import {
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-challange-handler',
  templateUrl: './challange-handler.component.html',
  styleUrl: './challange-handler.component.scss'
})
export class ChallangeHandlerComponent implements OnInit {
  constructor(@Inject(DynamicDialogConfig) public data: any) {}
  @Input() question: string = this.data.question;

  ngOnInit() {
    this.question = this.data.data.question;
  }

  html: string | undefined;

  editorOptions = {theme: 'vs-dark', language: 'javascript', style: {width: '100%', height: '100%'}};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}

