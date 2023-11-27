// searchform.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchformComponent implements OnInit {
  searchResult: any;

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const resultString = params['searchResult'];
      this.searchResult = JSON.parse(resultString);
      console.log("Du har kommet til search.form", this.searchResult);
    });
  }



}
