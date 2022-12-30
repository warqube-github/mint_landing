import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastr: ToastrService,
  ) { }

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
