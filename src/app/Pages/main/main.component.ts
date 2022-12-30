import { CommonService } from './../../shared/services/common/common.service';
import { WalletsComponent } from './../../components/wallets/wallets.component';
import { AuthService } from './../../shared/services/metamask/auth.service';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

declare let testFunc: any;

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

  mintBtn = 'Mint now';
  mintIsStarted: boolean = false;

  metamask_address: string = '';
  walletConnected: boolean = false;

  constructor(
    private commonService: CommonService,
    private metamaskAuth: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
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

    this.commonService.walletUser.subscribe(result => {
      if (result.chainId > 0 && result.walletConnected) {
        this.metamask_address = result.address;

        // this.ContractDetails = ContractDetails1ETH;
        // this.TokenAbi = TokenAbi;

        this.walletConnected = true;
        this.cdr.detectChanges();
      } else {
        console.log('Disconect');
        this.metamask_address = '';
        this.walletConnected = false;
      }
    })
  }

  openConnects() {
    this.dialog.open(WalletsComponent, {
      width: '250px',
      height: 'auto',
      data: {}
    }).afterClosed().subscribe(wallet => {
      console.log('Response Select Wallet', wallet);
      if (wallet === 'metamask') {
        this.metamaskAuth.conectMetamask().then(async res => {
          if (res.status) {

            localStorage.setItem('WalletType', wallet);

            const walletUserObj = {
              networkType: 'ethereum',
              walletType: wallet,
              chainId: 1,
              address: res.address,
              walletConnected: true,
            };

            this.commonService.walletUser.next(walletUserObj);
            this.commonService.showSuccsess('Login successfully');

          } else {
            this.commonService.resetUser();
            this.commonService.showError(res.message);
          }
        })
      }
    });
  }

  disconect() {
    this.commonService.resetUser();
    this.metamaskAuth.disconect();
  }


  mintCalculate() {
    this.percent = Number(((this.mintCount / this.maxMint) * 100).toFixed(2));
  }

  startMintCalculate() {
    // let startMint = new Date(2022, 11, 29, 4, 8);
    let startMint = new Date(2022, 11, 29, 14, 0);
    let endTimer = new Date(Number(moment.utc().format('YYYY')), Number(moment.utc().format('MM')) - 1, Number(moment.utc().format('DD')), Number(moment.utc().format('HH')), Number(moment.utc().format('mm'))).getTime();


    if (endTimer >= (startMint.getTime())) {
      clearInterval(this.timeInterval);
      this.startMint();
    }

    let diffHour = moment(moment(startMint).diff(moment.utc())).format('HH');;
    let diffMinutes = moment(moment(startMint).diff(moment.utc())).format('mm');
    let diffSeconds = moment(moment(startMint).diff(moment.utc())).format('ss');
    this.mintTime = {
      hour: diffHour,
      minutes: diffMinutes,
      seconds: diffSeconds
    };
  }

  startMint() {
    this.mintBtn = 'mint is live';
    this.mintIsStarted = true;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
    clearInterval(this.timeInterval);
  }

}
