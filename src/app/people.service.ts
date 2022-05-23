import { Injectable } from '@angular/core';
      
import { HttpClient, HttpResponse } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer API HERE"
  })
};

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  private apiUrl = "https://app.2solar.nl/api/person";

  getPerson(id: string){
    const requestUrl = `${this.apiUrl}/${id}`;
    return this.http.get<object>(requestUrl, httpOptions);
  }
}
