import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mintCount = new FormControl('');

  constructor(
    private service: MainService
  ) { }

  ngOnInit(): void {
  }

  update() {
    console.log('MintCount', Number(this.mintCount.value));
    this.service.updateMintCount(Number(this.mintCount.value)).subscribe(res => {
      console.log('Res Test', res);
      this.mintCount.setValue(0);
    })
  }

}
