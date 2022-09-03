import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyEntity } from '../models/company-entity.model';

const baseUrl = 'http://localhost:8080/api/v1/company/entity';

@Injectable({
  providedIn: 'root'
})
export class CompanyEntityService {

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<CompanyEntity[]> {
    return this.httpclient.get<CompanyEntity[]>(baseUrl);
  }

  getById(id: number): Observable<CompanyEntity> {
    return this.httpclient.get<CompanyEntity>(`${baseUrl}/${id}`);
  }

  getByName(name: String): Observable<CompanyEntity> {
    return this.httpclient.get<CompanyEntity>(`${baseUrl}/name/${name}`);
  }

  edit(id: number, companyEntity: CompanyEntity): Observable<CompanyEntity> {
    return this.httpclient.put<CompanyEntity>(`${baseUrl}/${id}`, companyEntity);
  }

  add(companyEntity: CompanyEntity): Observable<CompanyEntity> {
    return this.httpclient.post<CompanyEntity>(baseUrl, companyEntity);
  }

  delete(id: number): Observable<CompanyEntity> {
    return this.httpclient.delete<CompanyEntity>(`${baseUrl}/${id}`);
  }

}
