import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit{
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

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
  }

}
