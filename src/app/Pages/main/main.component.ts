import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

interface ISlide {
  image: string;
  active?: boolean;
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
    { image: './assets/images/nfts/image1.png', active: false },
    { image: './assets/images/nfts/image1.png', active: false },
    { image: './assets/images/nfts/image1.png', active: false },
  ];

  isMobile: boolean = false;

  constructor() { }

  ngOnInit(): void {

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

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    clearInterval(this.slideInterval); 
  }

}
