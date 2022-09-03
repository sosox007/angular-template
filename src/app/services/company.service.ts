import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

const baseUrl = 'http://localhost:8080/api/v1/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Company[]> {
    return this.httpclient.get<Company[]>(`${baseUrl}/${"old"}`);
  }

  getById(id: number): Observable<Company> {
    return this.httpclient.get<Company>(`${baseUrl}/${id}`);
  }

  getByName(name: String): Observable<Company> {
    return this.httpclient.get<Company>(`${baseUrl}/name/${name}`);
  }

  add(company: Company): Observable<Company> {
    return this.httpclient.post<Company>(baseUrl, company);
  }

  edit(id: number, company: Company): Observable<Company> {
    return this.httpclient.put<Company>(`${baseUrl}/${id}`, company);
  }

  delete(id: number): Observable<Company> {
    return this.httpclient.delete<Company>(`${baseUrl}/${id}`);
  }

}
