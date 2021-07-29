import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobListingService } from '../job-listing.service';
import { Job } from '../job.model';
import { ResizeObserver } from '@juggle/resize-observer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private jobListService: JobListingService) { }
  jobList: Job[] | undefined;
  height ;
  public agNote: ElementRef;

  ngOnInit(): void {
    this.jobListService.getJobList().subscribe((list: Job[]) => {
      this.jobListService.deserialiseJobList(list);
    })
    this.jobListService.filteredJobList.subscribe((list: Job[]) => {
      this.jobList = list;
    })

    this.observer.observe(document.querySelector(".filter-container"));
  }

  observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
      console.log("width", entry.contentRect.width);
      console.log("height", entry.contentRect.height);
      if(entry.contentRect.height!== 0){
        this.height= (entry.contentRect.height - 36)
      }else{
        this.height = 0
      }
      ;
    });
  });
}
