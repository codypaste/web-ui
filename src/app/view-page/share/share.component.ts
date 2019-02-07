import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.viewUrl = window.location.href;
  }

  copyLink() {
    this._clipboardService.copyFromContent(this.viewUrl);
    this._toastr.success('Link copied to your clipboard!');
  }

  editProject() {
    const id = this.route.snapshot.paramMap.get('id');
    const key = this.route.snapshot.queryParams.key;
  
    this._toastr.info('Opened project editor');    
    
    this.router.navigate(['/edit', id], {
      queryParams: {
        key: key
      }
    });
  }

}
