import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { FrameComponent } from 'src/app/components/frame/frame.component';

declare let testFunc: any;

interface ISlide {
  image: string;
  active?: boolean;
}

interface ITime {
  day?: string,
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
    day: '',
    hour: '',
    minutes: '',
    seconds: ''
  };

  mintBtn = 'Mint now';
  mintIsStarted: boolean = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    // try {
    //   testFunc();
    // } catch (error) {
    //   console.log('Error', error);
    // }

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

  openFrame() {
    this.dialog.open(FrameComponent, {
      width: '600px',
      height: '600px',
      data: {}
    }).afterClosed().subscribe(r => {});
  }

  mintCalculate() {
    this.percent = Number(((this.mintCount / this.maxMint) * 100).toFixed(2));
  }

  startMintCalculate() {
    // let startMint = new Date(2023, 0, 9, 3, 30);
    let startMint = new Date(2023, 0, 12, 14, 0);
    let curTimeUtc = new Date(Number(moment.utc().format('YYYY')), Number(moment.utc().format('MM')) - 1, Number(moment.utc().format('DD')), Number(moment.utc().format('HH')), Number(moment.utc().format('mm'))).getTime();
    console.log('StartMint Test', moment(startMint).format('YYYY-MM-DD HH:mm:ss'));
    console.log('EndTimer', moment(curTimeUtc).format('YYYY-MM-DD HH:mm:ss'));
    console.log('-------------------------');


    if (curTimeUtc >= (startMint.getTime())) {
      clearInterval(this.timeInterval);
      this.startMint();
    }

    let diffTime = moment(moment(startMint).diff(moment.utc()));

    // let diffHour = moment(moment(startMint).diff(moment.utc())).format('HH');
    // let diffMinutes = moment(moment(startMint).diff(moment.utc())).format('mm');
    // let diffSeconds = moment(moment(startMint).diff(moment.utc())).format('ss');

    // let diffHour = moment(diffTime).format('HH');
    // let diffMinutes = moment(diffTime).format('mm');
    // let diffSeconds = moment(diffTime).format('ss');

    this.mintTime = {
      day: (Number(moment(diffTime).format('DD')) - 1).toString(),
      hour: moment(diffTime).format('HH'),
      minutes: moment(diffTime).format('mm'),
      seconds: moment(diffTime).format('ss')
    };
  }

  startMint() {
    // this.mintBtn = 'mint is live';
    this.mintIsStarted = true;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
    clearInterval(this.timeInterval);
  }

}
