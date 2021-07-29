import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  isFilterEmpty: boolean = true;
  @ViewChild('content') elementView: ElementRef;


  ngOnInit(): void {
    this.jobListingService.filterObject.subscribe(filter =>{
      this.filter = filter;


    })
    this.jobListingService.isFilterEmpty.subscribe(isEmpty => {
      this.isFilterEmpty = isEmpty;
 
    })
  }

  removeFilter(category: string, filter ){
    this.jobListingService.removeFilter(category, filter);
  }
  clearFilter(){
    this.jobListingService.clearFilter();
  }


}
