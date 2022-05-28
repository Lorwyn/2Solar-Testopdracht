import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent implements OnInit {

  particulier: Boolean;
  zakelijk: Boolean;
  ingepland: Boolean;
  plannen: Boolean;
  geinstalleerd: Boolean;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  particulierChange(event) {
    this.particulier = event.checked;
  }

  zakelijkChange(event) {
    this.zakelijk = event.checked;
  }

  ingeplandChange(event) {
    this.ingepland = event.checked;
  }

  plannenChange(event) {
    this.plannen = event.checked;
  }

  geinstalleerdChange(event) {
    this.geinstalleerd = event.checked;
  }

  applyFilter() {
    let args = {
      particulier: this.particulier,
      zakelijk: this.zakelijk,
      ingepland: this.ingepland,
      plannen: this.plannen,
      geinstalleerd: this.geinstalleerd
    }
    this.popoverController.dismiss(args);
  }
}
