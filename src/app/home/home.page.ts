import { Component } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private personList: Object = [];
  private filteredList: Object = [];

  constructor(private peopleService: PeopleService) {this.getPeople()}

  getPeople() {
    this.peopleService.getPerson("search/?date_created_from=1-01-01")
    .subscribe(data => {
      this.personList = data;
      this.filteredList = this.personList;
    });
  }

  // Alternatief zou zijn om niet per query via de API te zoeken, maar om te zoeken in de complete dataset
  // om zo onnodige API calls te voorkomen
  filterPeople(event) {
    if(event.target.value != "") {
      this.peopleService.getPerson(`search/?search=${event.target.value}`)
      .subscribe(data => {
        this.filteredList = data
      });
    }
    else {
      this.filteredList = this.personList;
    }
  }
}
