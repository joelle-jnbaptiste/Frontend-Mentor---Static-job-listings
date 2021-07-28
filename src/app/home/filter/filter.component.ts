import { Component, OnInit } from '@angular/core';
import { JobListingService } from 'src/app/job-listing.service';
import { Filter } from './filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private jobListingService: JobListingService) { }

  filter: Filter = new Filter();
  ngOnInit(): void {
    this.jobListingService.filterObject.subscribe(filter =>{
      this.filter = filter;
      console.log(filter)
    })
  }

  removeFilter(category: string, filter ){
    this.jobListingService.removeFilter(category, filter);
  }
}
