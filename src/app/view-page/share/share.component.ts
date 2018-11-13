import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'src/app/_services/toastr.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  viewUrl: string;

  constructor(
    private _clipboardService: ClipboardService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.viewUrl = window.location.href;
  }

  copyLink() {
    console.log('copy');
    this._clipboardService.copyFromContent(this.viewUrl);
    this._toastr.success('Link copied to your clipboard!');
  }

}
