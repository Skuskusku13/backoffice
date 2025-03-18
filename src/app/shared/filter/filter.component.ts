import {Component, Input, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatSelect,
    FormsModule,
    MatOption,
    MatOption
  ],
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{

  @Input() filters: { value: string, viewValue: string }[] = []
  @Input() titleForm = '';

  selectedValue = ""

  ngOnInit(): void {
    this.selectedValue = this.filters[0].value
  }

}
