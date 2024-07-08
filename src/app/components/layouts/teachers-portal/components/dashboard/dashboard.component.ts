import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  greetingMessage: string = ""
  chart: any;
  pieChart: any;
  logInUser: any = ''

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.setGreeting()
    this.createChart()
    this.createPieChart()


    this.logInUser = JSON.parse(localStorage.getItem('LogInUser') || '')

    setInterval(() => {
      let greet = document.getElementById('greetings') as HTMLSpanElement;
      if (greet) {
        greet.innerHTML = this.greetingMessage
      }
    }, 1)

  }

  setGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      this.greetingMessage = 'Good Morning'
    }
    else if (currentHour >= 12 && currentHour < 18) {
      this.greetingMessage = 'Good Afternoon'
    }
    else {
      this.greetingMessage = 'Good Evening'
    }
  }


  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40, 20],
          backgroundColor: [
            // '#E25E3E',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }

  createPieChart() {

    this.pieChart = new Chart("pieChart", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: [
          'Sky-blue',
          'Blue',
          'Orange',
          'Yellow',
          'Dark-grey',
          'Grey',
          'Maroon',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [350, 50, 35, 30, 20, 10, 5],
          backgroundColor: [
            '#39A7FF',
            '#0174BE',
            '#FF6C22',
            '#FFC436',
            '#45474B',
            '#A9A9A9',
            '#BB2525',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 1.6
      }

    });
  }
}
