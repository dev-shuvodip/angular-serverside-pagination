import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import {
  map,
  startWith,
  switchMap
} from 'rxjs/operators';

import { ApiPaginationService } from './services/api-pagination.service';
import { User, UserData } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  errorMessage!: string;
  isLoadingResults = true;

  page!: number;
  limit!: number;
  total!: number;
  dataSource: User[] = [];
  userData = new Observable<UserData>();
  pageEvent!: PageEvent;
  pageSizeOptions: number[] = [10, 20, 25];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (element: User) => `${element.id}`
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: User) => `${element.title}`
    },
    {
      columnDef: 'firstName',
      header: 'First Name',
      cell: (element: User) => `${element.firstName}`
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      cell: (element: User) => `${element.lastName}`
    }
  ];

  displayedColumns = [...this.columns.map(c => c.columnDef)];

  constructor(private apiPaginationService: ApiPaginationService) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.apiPaginationService.getUserData(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        this.isLoadingResults = false;
        if (data === null) {
          return [];
        }

        this.total = data.total;
        this.limit = data.limit;
        return data.data;
      })
    ).subscribe((data: User[]) => (this.dataSource = data));
  }
}
