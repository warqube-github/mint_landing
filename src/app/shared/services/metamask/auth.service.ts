import { Injectable } from '@angular/core';
import { utils } from "ethers";
import { CommonService } from '../common/common.service';
import { environment } from 'src/environments/environment';


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ropstenProvider: any;
  configWallet: any;

  network: INetwork = { name: 'Ethereum', chainId: 1, hexChainId: '0x1', networkType: 'ethereum' };
  rpc = environment.ethereumRPC;

  constructor(
    private commonService: CommonService
  ) {
    if (window.ethereum === undefined) {
      this.commonService.showError(
        'Non-Ethereum browser detected. Connect MetaMask'
      );
    } else {
      window.web3 = window.web3.currentProvider;
      window.web3 = new window.Web3(window.ethereum);

      let walletType = localStorage.getItem('WalletType') as string;

      if (walletType && walletType === 'metamask') {
        console.log('Local Storage Test', walletType);
        
        this.conectMetamask().then(async res => {
          if (res.status) {

            const walletUserObj = {
              networkType: 'ethereum',
              walletType: walletType,
              chainId: 1,
              address: res.address,
              walletConnected: true,
            };

            this.commonService.walletUser.next(walletUserObj);
          } else {
            this.commonService.resetUser();
            this.commonService.showError(res.message);
          }
        });
      }
    }
  }

  public async conectMetamask(): Promise<any> {

    return new Promise(async (resolve, reject) => {
      if (typeof window.web3 !== 'undefined') {
        await this.switchEtheriumChain().then(async (res) => {
          if (res.status) {

            await window.ethereum
              .request({
                method: 'eth_requestAccounts',
              })
              .then((result: any) => {
                if (result.length > 0) {
                  const sucMsg = {
                    status: true,
                    message: 'Login successfully',
                    address: utils.getAddress(result[0]),
                  };
                  resolve(sucMsg);
                } else {
                  const failMsg = {
                    status: false,
                    message: 'No account found',
                  };
                  resolve(failMsg);
                }
              })
              .catch((err: any) => {
                if (err.code === 4001) {
                  const failMsg = {
                    status: false,
                    message: 'User rejected the request.',
                  };
                  resolve(failMsg);
                }
              });
          } else {
            resolve(res);
          }
        });
      } else {
        localStorage.setItem('Login_status', 'false');
        const failMsg = {
          status: false,
          message: 'Metamask extension not added on your browser',
        };
        resolve(failMsg);
      }
    }) as Promise<any>;
  }

  public async switchEtheriumChain(): Promise<IMessage> {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        await window.ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: this.network.hexChainId }],
          })
          .then(() => {
            const sucMessage: IMessage = {
              status: true,
              message: 'Corret Network',
            };
            resolve(sucMessage);
          })
          .catch(async (err: any) => {
            if (err.code === 4001) {
              const failMsg: IMessage = {
                status: false,
                message: 'User rejected the request',
              };
              resolve(failMsg);
            }
            if (err.code === 4902) {

              await window.ethereum
                .request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: this.network.hexChainId,
                      chainName: this.network.name,
                      rpcUrls: [this.rpc],
                    },
                  ],
                })
                .then((result: any) => {

                  const sucMessage: IMessage = {
                    status: true,
                    message: 'Corret Network',
                  };
                  resolve(sucMessage);
                })
                .catch((err: any) => {
                  if (err.code === 4001) {
                    const failMsg: IMessage = {
                      status: false,
                      message: 'User rejected the request',
                    };
                    resolve(failMsg);
                  }
                });
            }
          });
      }
    });
  }

  public async disconect() {
    let obj: any = {};
    await this.sleep(1000);
    console.log('Disconnet', this.commonService.walletUser.value);

    obj[1] = environment.infuraURL + environment.infuraId;
    this.configWallet = {
      infuraId: environment.infuraId,
      rpc: obj,
      chainId: 1
    }

    const WalletConnectProvider = window.WalletConnectProvider.default;
    this.ropstenProvider = new WalletConnectProvider(this.configWallet);
    this.ropstenProvider.disconnect();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export interface IMessage {
  status: boolean;
  message: string;
  address?: string;
}

export interface INetwork {
  chainId: number;
  hexChainId: string;
  name: string;
  networkType: string;
}