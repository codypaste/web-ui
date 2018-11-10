import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const key = this.route.snapshot.queryParams.key;
    const x = await this.api.retrieveProject(id);
    console.log(id, key, x);
  }

}
