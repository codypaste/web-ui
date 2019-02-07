import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  private setOptions(override) {
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut',
      ...override
    };
  }

  error(message: string, options?) {
    this.setOptions(options);
    toastr['error'](message);
  }

  success(message: string, options?) {
    this.setOptions(options);
    toastr['success'](message);
  }

  info(message: string, options?) {
    this.setOptions(options);
    toastr['info'](message);
  }
}
