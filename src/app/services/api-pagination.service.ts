import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserData } from '../models/user.model';
import { appConfig } from '../../environments/appConfig'

@Injectable({
  providedIn: 'root'
})

export class ApiPaginationService {
  constructor(private httpClient: HttpClient) { }

  getUserData(page: number, limit: number): Observable<UserData> {
    const headers: HttpHeaders = new HttpHeaders({
      'app-id': `${appConfig.appId}`
    })

    const options = {
      'headers': headers
    }

    return this.httpClient.get<UserData>(`${environment.apiUrl}?page=${page}&limit=${limit}`, options)
  }
}
