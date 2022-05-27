import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  personList: Array<Object> = [];
  searchedList: Array<Object> = [];

  constructor(private peopleService: PeopleService, private router: Router) {}

  ngOnInit() {
    this.peopleService.getPerson("search/?date_created_from=1-01-01")
    .subscribe(data => {
      this.personList = Object.keys(data).map(key => data[key])
      this.searchedList = Object.keys(data).map(key => data[key])
    });
  }

  searchPeople(event) {
    if(event.target.value != "") {
      this.peopleService.getPerson(`search/?search=${event.target.value}`)
      .subscribe(data => {
        this.searchedList = Object.keys(data).map(key => data[key])
      });
    }
    else {
      this.searchedList = this.personList;
    }
  }

  filterPeople() {
    
  }
}
