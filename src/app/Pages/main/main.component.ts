import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

interface ISlide {
  image: string;
  active?: boolean;
}

interface ITime {
  hour: string,
  minutes: string,
  seconds: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  slideInterval: any;

  slides: ISlide[] = [
    { image: './assets/images/nfts/image1.png', active: true },
    { image: './assets/images/nfts/image2.png', active: false },
    { image: './assets/images/nfts/image3.png', active: false },
    { image: './assets/images/nfts/image4.png', active: false },
  ];

  isMobile: boolean = false;

  infoOpen: boolean = true;

  percent: number = 0;
  mintCount: number = 0;
  maxMint: number = 2500;

  timeInterval: any;
  mintTime: ITime = {
    hour: '',
    minutes: '',
    seconds: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.startMintCalculate();
    this.timeInterval = setInterval(() => {
      this.startMintCalculate();
    }, 1000);

    this.mintCalculate();

    if (window.innerWidth < 500) {
      this.isMobile = true;
    }

    this.slideInterval = setInterval(() => {
      let image = this.slides.filter(s => s.active)[0];
      if (image) {
        let index = this.slides.indexOf(image);
        if (index === this.slides.length - 1) {
          index = 0;
        }
        this.slides.forEach(s => s.active = false);
        this.slides[index + 1].active = true;
      }
    }, 3000);
  }

  mintCalculate() {
    this.percent = Number(((this.mintCount / this.maxMint) * 100).toFixed(2));
  }

  startMintCalculate() {
    let startMint = new Date(2022, 11, 29, 14, 0);

    let diffHour = moment(moment(startMint).diff(moment.utc())).format('HH');;
    let diffMinutes = moment(moment(startMint).diff(moment.utc())).format('mm');
    let diffSeconds = moment(moment(startMint).diff(moment.utc())).format('ss');
    this.mintTime = {
      hour: diffHour,
      minutes: diffMinutes,
      seconds: diffSeconds
    };
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
    clearInterval(this.timeInterval);
  }

}
