import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from "simple-datatables";
import { CompanyEntity } from 'src/app/models/company-entity.model';
import { Company } from 'src/app/models/company.model';
import { CompanyEntityService } from 'src/app/services/company-entity.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'compnay-entity-list',
  templateUrl: './company-entity-list.component.html',
  styleUrls: ['./company-entity-list.component.scss']
})
export class CompanyEntityComponent implements OnInit {

  companies?: Company[];

  companyEntityDetail !: FormGroup;
  companyEntities?: CompanyEntity[];

  companyEntityObject: CompanyEntity = {
    id: 0,
    name: '',
    company_id: 0
  }

  constructor(private formBuilder: FormBuilder, private companyEntityService: CompanyEntityService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.companies = data;
      }
    });

    console.log("Hadchi khdam")
    this.getAll();

    this.companyEntityDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      company_id: "Select Company"
    });

  }

  addCompanyEntity() {

    console.log(this.companyEntityObject);
    this.companyEntityObject.id = 0;
    this.companyEntityObject.name = this.companyEntityDetail.value.name;
    this.companyEntityObject.company_id = this.companyEntityDetail.value.company_id;

    this.companyEntityService.add(this.companyEntityObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    });

  }

  adddCompanyEntity() {

    this.companyEntityDetail.reset

  }

  editCompanyEntity(compEntity: CompanyEntity) {

    this.companyEntityDetail.controls['id'].setValue(compEntity.id);
    this.companyEntityDetail.controls['name'].setValue(compEntity.name);

  }

  updateCompanyEntity() {

    this.companyEntityObject.id = this.companyEntityDetail.value.id;
    this.companyEntityObject.name = this.companyEntityDetail.value.name;
    this.companyEntityObject.company_id = this.companyEntityDetail.value.company_id;

    this.companyEntityService.edit(this.companyEntityObject.id, this.companyEntityObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    })

  }


  delete(companyEntity: CompanyEntity) {

    this.companyEntityService.delete(companyEntity.id).subscribe({
      next: (data) => {
        let index = this.companyEntities!.indexOf(companyEntity);
        this.companyEntities!.splice(index, 1);
      }
    })

  }

  getAll(): void {

    this.companyEntityService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.companyEntities = data;
      }
    });
  }

}
