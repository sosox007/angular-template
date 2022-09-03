import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from "simple-datatables";
import { CompanyEntity } from 'src/app/models/company-entity.model';
import { Departement } from 'src/app/models/departement.model';
import { Team } from 'src/app/models/team.model';
import { CompanyEntityService } from 'src/app/services/company-entity.service';
import { DepartementService } from 'src/app/services/departement.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamComponent implements OnInit {

  departements?: Departement[];

  teamDetail !: FormGroup;
  teams?: Team[];

  teamObject: Team = {
    id: 0,
    name: '',
    departement_id: 0
  }

  constructor(private formBuilder: FormBuilder, private teamService: TeamService, private departementService: DepartementService) { }

  ngOnInit(): void {
    this.departementService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.departements = data;
      }
    });

    console.log("Hadchi khdam")
    this.getAll();

    this.teamDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      departement_id: "Select Departement"
    });

  }

  addTeam() {

    console.log(this.teamObject);
    this.teamObject.id = 0;
    this.teamObject.name = this.teamDetail.value.name;
    this.teamObject.departement_id = this.teamDetail.value.departement_id;

    this.teamService.add(this.teamObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    });

  }

  adddTeam() {

    this.teamDetail.reset

  }

  editTeam(team: Team) {

    this.teamDetail.controls['id'].setValue(team.id);
    this.teamDetail.controls['name'].setValue(team.name);

  }

  updateTeam() {

    this.teamObject.id = this.teamDetail.value.id;
    this.teamObject.name = this.teamDetail.value.name;
    this.teamObject.departement_id = this.teamDetail.value.departement_id;

    this.teamService.edit(this.teamObject.id, this.teamObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    })

  }


  delete(team: Team) {

    this.teamService.delete(team.id).subscribe({
      next: (data) => {
        let index = this.teams!.indexOf(team);
        this.teams!.splice(index, 1);
      }
    })

  }

  getAll(): void {

    this.teamService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.teams = data;
      }
    });
  }

}
