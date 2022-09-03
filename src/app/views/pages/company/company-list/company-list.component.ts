import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from "simple-datatables";
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'compnay-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyComponent implements OnInit {
  companyDetail !: FormGroup;
  companies?: Company[];

  companyObject: Company = {
    id: 0,
    name: '',
    address: '',
    email: ''
  }

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService) { }

  ngOnInit(): void {

    console.log("Hadchi khdam")
    this.getAll();

    this.companyDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      address: [''],
      email: ['']
    });

  }

  addCompany() {

    console.log(this.companyObject);
    this.companyObject.id = 0;
    this.companyObject.name = this.companyDetail.value.name;
    this.companyObject.address = this.companyDetail.value.address;
    this.companyObject.email = this.companyDetail.value.email;

    this.companyService.add(this.companyObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    });

  }

  adddCompany() {

    this.companyDetail.reset

  }

  editCompany(comp: Company) {

    this.companyDetail.controls['id'].setValue(comp.id);
    this.companyDetail.controls['name'].setValue(comp.name);
    this.companyDetail.controls['email'].setValue(comp.email);
    this.companyDetail.controls['address'].setValue(comp.address);

  }

  updateCompany() {

    this.companyObject.id = this.companyDetail.value.id;
    this.companyObject.name = this.companyDetail.value.name;
    this.companyObject.address = this.companyDetail.value.address;
    this.companyObject.email = this.companyDetail.value.email;

    this.companyService.edit(this.companyObject.id, this.companyObject).subscribe(res => {
      console.log(res);
      this.getAll();
    }, err => {
      console.log(err);
    })

  }


  delete(company: Company) {

    this.companyService.delete(company.id).subscribe({
      next: (data) => {
        let index = this.companies!.indexOf(company);
        this.companies!.splice(index, 1);
      }
    })

  }

  getAll(): void {

    this.companyService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.companies = data;
      }
    });
  }

}
