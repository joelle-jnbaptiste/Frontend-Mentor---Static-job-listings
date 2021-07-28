import { Component, Input, OnInit } from '@angular/core';
import { JobListingService } from 'src/app/job-listing.service';
import { Job } from 'src/app/job.model';
import { Language } from 'src/app/language.enum';
import { Level } from 'src/app/level.enum';
import { Role } from 'src/app/role.model';
import { Tool } from 'src/app/tool.enum';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() job : Job = new Job();

  constructor(private jobListingService : JobListingService) { }

  ngOnInit(): void {
   }
   onClickTag(category:string, value:Role|Language|Level|Tool|undefined){
    this.jobListingService.addFilter(category, value)
   }
}
