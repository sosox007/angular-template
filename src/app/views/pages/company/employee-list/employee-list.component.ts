import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from "simple-datatables";
import { Employee } from 'src/app/models/employee.model';
import { Team } from 'src/app/models/team.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeComponent implements OnInit {

  teams?: Team[];

  employeeDetail !: FormGroup;
  employees?: Employee[];

  employeeObject: Employee = {
    id: 0,
    name: '',
    team_id: 0
  }

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.teams = data;
      }
    });

    console.log("Hadchi khdam")
    this.getAll();

    this.employeeDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      team_id: "Select Team"
    });

  }

  addEmployee() {

    console.log(this.employeeObject);
    this.employeeObject.id = 0;
    this.employeeObject.name = this.employeeDetail.value.name;
    this.employeeObject.team_id = this.employeeDetail.value.team_id;

    this.employeeService.add(this.employeeObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    });

  }

  adddEmployee() {

    this.employeeDetail.reset

  }

  editEmployee(employee: Employee) {

    this.employeeDetail.controls['id'].setValue(employee.id);
    this.employeeDetail.controls['name'].setValue(employee.name);

  }

  updateEmployee() {

    this.employeeObject.id = this.employeeDetail.value.id;
    this.employeeObject.name = this.employeeDetail.value.name;
    this.employeeObject.team_id = this.employeeDetail.value.team_id;

    this.employeeService.edit(this.employeeObject.id, this.employeeObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    })

  }


  delete(employee: Employee) {

    this.employeeService.delete(employee.id).subscribe({
      next: (data) => {
        let index = this.employees!.indexOf(employee);
        this.employees!.splice(index, 1);
      }
    })

  }

  getAll(): void {

    this.employeeService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data;
      }
    });
  }

}
