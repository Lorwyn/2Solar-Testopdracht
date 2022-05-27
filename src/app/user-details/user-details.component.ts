import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {

  person: Object = {};

  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.peopleService.getPerson(id)
    .subscribe(data => {
      let tempArray = Object.keys(data).map(key => data[key])
      this.person = tempArray[0];
    });
  }

  goBack(): void {
    this.location.back();
  }
}
