import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

const baseUrl = 'http://localhost:8080/api/v1/company/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.httpclient.get<Employee[]>(baseUrl);
  }

  getById(id: number): Observable<Employee> {
    return this.httpclient.get<Employee>(`${baseUrl}/${id}`);
  }

  getByName(name: String): Observable<Employee> {
    return this.httpclient.get<Employee>(`${baseUrl}/name/${name}`);
  }

  edit(id: number, employee: Employee): Observable<Employee> {
    return this.httpclient.put<Employee>(`${baseUrl}/${id}`, employee);
  }

  add(employee: Employee): Observable<Employee> {
    return this.httpclient.post<Employee>(baseUrl, employee);
  }

  delete(id: number): Observable<Employee> {
    return this.httpclient.delete<Employee>(`${baseUrl}/${id}`);
  }
}
