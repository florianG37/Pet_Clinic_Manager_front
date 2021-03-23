import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Employee {
  constructor(
    public empId: string,
    public name: string,
    public designation: string,
    public salary: string,
  ) { }
}
@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getPets() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })

    return this.httpClient.get('http://localhost:8080/api/pet', { headers });
  }
}
