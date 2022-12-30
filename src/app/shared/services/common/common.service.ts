import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  walletUser = new BehaviorSubject<IWalletUser>({
    networkType: '',
    walletType: '',
    chainId: 1,
    address: '',
    walletConnected: false
  });

  constructor(
    private toastr: ToastrService,
  ) { }

  resetUser() {
    localStorage.clear();
    const walletUserObj = {
      networkType: '',
      walletType: '',
      chainId: 1,
      address: '',
      walletConnected: false,
    };
    this.walletUser.next(walletUserObj);
  }

  showSuccsess(message: string): void {
    this.toastr.success(message);
  }

  showError(message: string): void {
    this.toastr.error(message);
  }

  showWarning(message: string): void {
    this.toastr.warning(message);
  }

  showInfo(message: string): void {
    this.toastr.info(message);
  }
}


export interface IWalletUser {
  networkType: string,
  walletType: string,
  chainId: number,
  address: string,
  balance?: number,
  walletConnected: boolean
}