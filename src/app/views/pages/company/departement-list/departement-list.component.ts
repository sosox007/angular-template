import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from "simple-datatables";
import { CompanyEntity } from 'src/app/models/company-entity.model';
import { Departement } from 'src/app/models/departement.model';
import { CompanyEntityService } from 'src/app/services/company-entity.service';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss']
})
export class DepartementComponent implements OnInit {

  companyEntities?: CompanyEntity[];

  departementDetail !: FormGroup;
  departements?: Departement[];

  departementObject: Departement = {
    id: 0,
    name: '',
    companyEntity_id: 0
  }

  constructor(private formBuilder: FormBuilder, private departementService: DepartementService, private companyEntityService: CompanyEntityService) { }

  ngOnInit(): void {
    this.companyEntityService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.companyEntities = data;
      }
    });

    console.log("Hadchi khdam")
    this.getAll();

    this.departementDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      companyEntity_id: "Select CompanyEntity"
    });

  }

  addDepartement() {

    console.log(this.departementObject);
    this.departementObject.id = 0;
    this.departementObject.name = this.departementDetail.value.name;
    this.departementObject.companyEntity_id = this.departementDetail.value.companyEntity_id;

    this.departementService.add(this.departementObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    });

  }

  adddDepartement() {

    this.departementDetail.reset

  }

  editDepartement(departement: Departement) {

    this.departementDetail.controls['id'].setValue(departement.id);
    this.departementDetail.controls['name'].setValue(departement.name);

  }

  updateDepartement() {

    this.departementObject.id = this.departementDetail.value.id;
    this.departementObject.name = this.departementDetail.value.name;
    this.departementObject.companyEntity_id = this.departementDetail.value.companyEntity_id;

    this.departementService.edit(this.departementObject.id, this.departementObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    })

  }


  delete(departement: Departement) {

    this.departementService.delete(departement.id).subscribe({
      next: (data) => {
        let index = this.departements!.indexOf(departement);
        this.departements!.splice(index, 1);
      }
    })

  }

  getAll(): void {

    this.departementService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.departements = data;
      }
    });
  }

}
