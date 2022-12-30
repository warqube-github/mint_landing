import { Injectable } from '@angular/core';
import { utils } from "ethers";
import { CommonService } from '../common/common.service';


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  chain = { name: 'BNB Chain', chainId: 56, hexChainId: '0x38', networkType: 'binance-smart-chain' };

  constructor(
    private commonService: CommonService
  ) {
    // if (window.ethereum === undefined) {
    //   this.commonService.showError(
    //     'Non-Ethereum browser detected. Connect MetaMask'
    //   );
    // } else {
    //   window.web3 = window.web3.currentProvider;
    //   window.web3 = new window.Web3(window.ethereum);

    //   let networkType = localStorage.getItem('NetworkType');
    //   let walletType = localStorage.getItem('WalletType');


    // }
  }
}
