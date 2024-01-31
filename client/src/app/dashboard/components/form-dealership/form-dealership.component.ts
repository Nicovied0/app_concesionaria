import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form-dealership',
  templateUrl: './form-dealership.component.html',
  styleUrls: ['./form-dealership.component.scss'],
})
export class FormDealershipComponent implements OnChanges {
  @Input() consultationType: string | undefined;
  @Input() profile: any;
  typeForm: boolean | undefined = undefined;

  constructor() {}

  ngOnChanges() {
    if (this.consultationType === 'new') {
      this.typeForm = true;
    }
    if (this.consultationType === 'existing') {
      this.typeForm = false;
    }
  }}
