import { Component, Input, OnInit, output } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatSelect,
    FormsModule,
    MatOption,
    MatOption,
  ],
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  @Input() filters: { value: string; viewValue: string }[] = [];
  @Input() titleForm = '';
  selectedValue = '';
  public filterUpdate = output<any>();

  ngOnInit(): void {
    this.selectedValue = this.filters[0].value;
  }

  onFilterChange($event: any) {
    console.log('event_value',$event.value);
    this.filterUpdate.emit($event.value);
  }
}
