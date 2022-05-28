import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PeopleService } from '../people.service';
import { UserFilterComponent } from '../user-filter/user-filter.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  personList: Array<Object> = [];
  searchedList: Array<Object> = [];
  filteredList: Array<Object> = [];
  activeFilters: Object;

  constructor(private peopleService: PeopleService, private router: Router, private popoverController: PopoverController) {}

  ngOnInit() {
    this.peopleService.getPerson("search/?date_created_from=1-01-01")
    .subscribe(data => {
      this.personList = Object.keys(data).map(key => data[key])
      this.searchedList = Object.keys(data).map(key => data[key])
      this.filteredList = this.searchedList;
    });
    this.activeFilters = {
      particulier: true,
      zakelijk: true,
      ingepland: true,
      plannen: true,
      geinstalleerd: true
    };
  }

  searchPeople(query) {
    if(query.target.value != "") {
      this.peopleService.getPerson(`search/?search=${query.target.value}`)
      .subscribe(data => {
        this.searchedList = Object.keys(data).map(key => data[key])
        this.filterList();
      });
    }
    else {
      this.searchedList = this.personList;
      this.filterList();
    }
  }

  async openFilter(event) {
    const popover = await this.popoverController.create({
      component: UserFilterComponent,
      event: event,
      translucent: true,
      backdropDismiss: false,
      componentProps: { 
        particulier: this.activeFilters["particulier"],
        zakelijk: this.activeFilters["zakelijk"],
        ingepland: this.activeFilters["ingepland"],
        plannen: this.activeFilters["plannen"],
        geinstalleerd: this.activeFilters["geinstalleerd"]
      }
    });
    await popover.present();
    popover.onDidDismiss()
    .then((result) => {
      if(result != undefined) {
        this.activeFilters = result.data;
        this.filterList();
      }
    });
  }

  filterList() {
    this.filteredList = this.searchedList;
    if(this.activeFilters["particulier"] == false)
      this.filteredList = this.filteredList.filter(person => person["original_status"] !== 'Particulier');
    if(this.activeFilters["zakelijk"] == false)
      this.filteredList = this.filteredList.filter(person => person["original_status"] !== 'Zakelijk');
    if(this.activeFilters["ingepland"] == false)
      this.filteredList = this.filteredList.filter(person => person["request_status"] !==  "installatie ingepland")
    if(this.activeFilters["plannen"] == false)
      this.filteredList = this.filteredList.filter(person => person["request_status"] !==  "installatie plannen")
    if(this.activeFilters["geinstalleerd"] == false)
      this.filteredList = this.filteredList.filter(person => person["request_status"] !==  "geinstalleerd")
  }
}
