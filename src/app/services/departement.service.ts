import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement.model';

const baseUrl = 'http://localhost:8080/api/v1/company/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Departement[]> {
    return this.httpclient.get<Departement[]>(baseUrl);
  }

  getById(id: number): Observable<Departement> {
    return this.httpclient.get<Departement>(`${baseUrl}/${id}`);
  }

  getByName(name: String): Observable<Departement> {
    return this.httpclient.get<Departement>(`${baseUrl}/name/${name}`);
  }

  edit(id: number, departement: Departement): Observable<Departement> {
    return this.httpclient.put<Departement>(`${baseUrl}/${id}`, departement);
  }

  add(departement: Departement): Observable<Departement> {
    return this.httpclient.post<Departement>(baseUrl, departement);
  }

  delete(id: number): Observable<Departement> {
    return this.httpclient.delete<Departement>(`${baseUrl}/${id}`);
  }
}
