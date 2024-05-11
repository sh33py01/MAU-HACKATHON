import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {StepperModule} from "primeng/stepper";
import {ButtonModule} from "primeng/button";
import {MenuItem} from "primeng/api";
import {StepsModule} from "primeng/steps";

@Component({
  selector: 'app-challange-creation',
  templateUrl: './challange-creation.component.html',
  styleUrl: './challange-creation.component.scss'
})

export class ChallangeCreationComponent implements OnInit {

  sourceOptions: string[] = ['Alternative', 'Code'];
  targetOptions: string[] = [];
  selectedOption: string | undefined;

  textFormVisible = false;
  pickListFormVisible = false;

  display: boolean = false;
  activeIndex: number = 0;
  steps: MenuItem[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'}
  ];

  nextStep() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  cities!: City[];

  formGroup!: FormGroup;

  ngOnInit() {
    this.cities = [
      { name: 'Code', code: 'NY' },
      { name: 'Alternative', code: 'RM' }
    ];

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
    });
  }

  onSubmit() {
    // Handle form submission logic based on the selected form
    if (this.textFormVisible) {
      // Handle text form submission
    } else if (this.pickListFormVisible) {
      // Handle picklist form submission
    }
  }


  toggleForms(selectedValue: string) {
    this.textFormVisible = selectedValue === 'Alternative';
    this.pickListFormVisible = selectedValue === 'Code';
  }
}

interface City {
  name: string,
  code: string
}

