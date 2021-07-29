import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Job } from './job.model';
import { Role } from './role.model';
import { Language } from './language.enum';
import { Tool } from './tool.enum';
import { Level } from './level.enum';
import { Filter } from './home/filter/filter.model';

@Injectable({
  providedIn: 'root'
})
export class JobListingService {

  constructor(private http: HttpClient) { }
  languageFilter: Array<any> | undefined = [];
  toolsFilter: Array<any> | undefined = [];
  roleFilter: any | undefined = undefined;
  levelFilter: any | undefined = undefined;
  jobList: Array<Job> = [];

  filteredJobList: BehaviorSubject<Array<Job> | undefined> = new BehaviorSubject(undefined);
  filterObject: BehaviorSubject<Filter> = new BehaviorSubject({ languages: this.languageFilter, tools: this.toolsFilter, level: this.levelFilter, role: this.roleFilter });
  isFilterEmpty: BehaviorSubject<boolean> | undefined = new BehaviorSubject(true);

  getJobList(): Observable<Job[]> {
    return this.http
      .get('../../assets/data.json')
      .pipe(
        map((res) => <Job[]>res))
      ;
  }

  deserialiseJobList(jobListResponse: Job[]) {
    let jobList: Job[] = [];
    jobListResponse.forEach((job: any) => {
      jobList.push(new Job().deserialize(job));
    });
    this.jobList = jobList;
    this.filteredJobList.next(jobList);
  }

  onFilterJobList() {

    this.filteredJobList.next(this.jobList.filter((job) => {
      this.isFilterEmpty.next(false);
      return (this.filterLanguage(job) && this.filterLevel(job) && this.filterRole(job) && this.filterTools(job))
    }))

    if (this.languageFilter?.length === 0 && this.toolsFilter?.length === 0 && this.roleFilter === undefined && this.levelFilter === undefined) {
      this.filteredJobList.next(this.jobList)
      this.isFilterEmpty.next(true);
    }

    
  }

  filterLanguage(job: Job): boolean {
    let isLanguage = true;
    if (this.toolsFilter.length > 0) {
      this.languageFilter?.forEach((filter) => {
        if (job.languages?.includes(filter) === false) {
          isLanguage = false
        }
      })
    }

    return isLanguage
  }
  filterLevel(job: Job): boolean {
    let isLevel = true;
    if (this.levelFilter !== undefined) {
      if (job.level !== this.levelFilter) {
        isLevel = false
      }
    }
    return isLevel
  }
  filterRole(job: Job): boolean {
    let isRole = true;
    if (this.roleFilter !== undefined) {
      if (job.role !== this.roleFilter) {
        isRole = false
      }
    }
    return isRole
  }

  filterTools(job: Job): boolean {
    let isTool = true;
    if (this.toolsFilter.length > 0) {
      this.toolsFilter?.forEach(filter => {
        if (job.tools?.includes(filter) === false) {
          isTool = false
        }
      })
    }

    return isTool;
  }

  addFilter(category: string, value: Role | Language | Level | Tool | undefined) {
    if (category === "languages") {
      if (!this.languageFilter?.includes(value)) {
        this.languageFilter?.push(value)
      }
    }
    if (category === "tools") {
      if (!this.toolsFilter?.includes(value)) {
        this.toolsFilter?.push(value)
      }
    }
    if (category === "level") {
      this.levelFilter = value

    }
    if (category === "role") {
      this.roleFilter = value
    }
    this.filterObject.next({ languages: this.languageFilter, tools: this.toolsFilter, level: this.levelFilter, role: this.roleFilter })
    this.onFilterJobList()
  }

  removeFilter(category, filter) {
    if (category === "level") {
      this.levelFilter = undefined;
    }
    if (category === "role") {
      this.roleFilter = undefined;
    }

    if (category === "tools") {
      let index = this.toolsFilter.indexOf(filter)
      if (index !== -1) {
        this.toolsFilter.splice(index, 1);
      }
    }

    if (category === "languages") {
      let index = this.languageFilter.indexOf(filter)
      if (index !== -1) {
        this.languageFilter.splice(index, 1);
      }
    }

    this.filterObject.next({ languages: this.languageFilter, tools: this.toolsFilter, level: this.levelFilter, role: this.roleFilter })
    this.onFilterJobList()
  }

  clearFilter() {
    this.languageFilter = [];
    this.toolsFilter = [];
    this.levelFilter = undefined;
    this.roleFilter = undefined;
    this.filterObject.next({ languages: this.languageFilter, tools: this.toolsFilter, level: this.levelFilter, role: this.roleFilter })
    this.isFilterEmpty.next(false);
    this.onFilterJobList()
  }
}