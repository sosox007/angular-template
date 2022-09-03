import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

const baseUrl = 'http://localhost:8080/api/v1/company/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Team[]> {
    return this.httpclient.get<Team[]>(baseUrl);
  }

  getById(id: number): Observable<Team> {
    return this.httpclient.get<Team>(`${baseUrl}/${id}`);
  }

  getByName(name: String): Observable<Team> {
    return this.httpclient.get<Team>(`${baseUrl}/name/${name}`);
  }

  edit(id: number, team: Team): Observable<Team> {
    return this.httpclient.put<Team>(`${baseUrl}/${id}`, team);
  }

  add(team: Team): Observable<Team> {
    return this.httpclient.post<Team>(baseUrl, team);
  }

  delete(id: number): Observable<Team> {
    return this.httpclient.delete<Team>(`${baseUrl}/${id}`);
  }
}
