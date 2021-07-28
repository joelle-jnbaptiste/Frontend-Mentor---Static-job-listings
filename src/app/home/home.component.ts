import { Component, OnInit } from '@angular/core';
import { JobListingService } from '../job-listing.service';
import { Job } from '../job.model';
import { Role } from '../role.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private jobListService: JobListingService) { }

  jobList: Job[] | undefined;
  ngOnInit(): void {
    this.jobListService.getJobList().subscribe((list: Job[]) => {
      this.jobListService.deserialiseJobList(list);
    })
    this.jobListService.filteredJobList.subscribe((list: Job[]) => {
      this.jobList = list;
    })
  }

}
