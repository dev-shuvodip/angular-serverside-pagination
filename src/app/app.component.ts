import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { ApiPaginationService } from './api-pagination.service';
import { User, UserData } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  errorMessage!: string;
  userData = new Observable<UserData>();
  users: User[] = [];
  total!: number;
  page!: number;
  limit!: number;

  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['id', 'title', 'firstName', 'lastName'];
  dataSource: User[] = []

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private apiPaginationService: ApiPaginationService) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.apiPaginationService.getUserData(
          this.paginator.pageIndex, this.paginator.pageSize
        );
      }),
      map(data => {
        if (data === null) {
          return [];
        }

        this.total = data.total;
        this.limit = data.limit
        return data.data;
      })
    ).subscribe(data => (this.dataSource = data));
  }
}
