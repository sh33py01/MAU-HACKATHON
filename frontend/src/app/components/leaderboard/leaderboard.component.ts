import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {LeaderBoardScore} from "./leaderboardScore.model";
import {Observable} from "rxjs";
import {ChallengeModel} from "../challenges/challenge.model";

interface Column {
  field: string;
  header: string;
}

interface Product {}
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit{
  leaderboard: LeaderBoardScore[] = [];
  data: any;
  options: any;
  data1: any;
  options1: any;

  products!: Product[];
  cols!: Column[];

   constructor(private api: ApiService) {}



  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.api.retrieveScoreboard().subscribe((res: LeaderBoardScore[]) => {
      for(let i = 0 ; i < res.length ; i++){
         res[i].rank = i+1;
        console.log('response: ' + JSON.stringify(res[i].rank));
      }
      this.leaderboard = res;
      console.log(this.leaderboard);
    });



    this.data = {
      labels: ['Java', 'Python', 'Javascript', 'Go', 'Php', 'C++', 'Assembly'],
      datasets: [
        {
          label: 'Your Score',
          borderColor: 'red',
          pointBackgroundColor: 'red',
          pointBorderColor: 'red',
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: 'red',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary
          },
          pointLabels: {
            color: textColorSecondary
          }
        }
      }
    };




    this.products = [
      {
        id: '1000',
        place: '1',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 58,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '2000',
        place: '2',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 30,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '3000',
        place: '3',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 22,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },
      {
        id: '4000',
        place: '4',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 15,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '5000',
        place: '5',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 9,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '6000',
        place: '6',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 8,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
      },
      {
        id: '7000',
        place: '7',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accessories',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },
      {
        id: '8000',
        place: '8',
        name: 'Galaxy Earrings',
        description: 'Product Description',
        image: 'galaxy-earrings.jpg',
        price: 34,
        category: 'Accessories',
        quantity: 3,
        inventoryStatus: 'INSTOCK',
        rating: 5
      }
    ];

    this.cols = [
      { field: 'rank', header: 'Place' },
      { field: 'username', header: 'Name' },
      // { field: 'category', header: 'Category' },
      { field: 'score', header: 'Points' }
    ];
    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Your Progress',
          data: [3, 0, 6, 1, 2, 1, 3],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
      ]
    };

    this.options1 = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }



}
