import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
 list = [1,2,3,4,5,6,7,8,9,10];
  layout: string = 'grid';

}
