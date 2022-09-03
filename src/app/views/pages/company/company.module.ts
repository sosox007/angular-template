import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './company.component';
import { CompanyComponent } from './company-list/company-list.component';

import { DepartementComponent } from './departement-list/departement-list.component';
import { CompanyEntityComponent } from './company-entity-list/company-entity-list.component';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee-list/employee-list.component';
import { TeamComponent } from './team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'company-list',
        pathMatch: 'full'
      },
      {
        path: 'company-list',
        component: CompanyComponent
      },
      {
        path: 'company-entity-list',
        component: CompanyEntityComponent
      },
      {
        path: 'departement-list',
        component: DepartementComponent
      },
      {
        path: 'team-list',
        component: TeamComponent
      },
      {
        path: 'employee-list',
        component: EmployeeComponent
      }

    ]
  }
]

@NgModule({
  declarations: [PagesComponent, CompanyComponent, CompanyEntityComponent, DepartementComponent
    , TeamComponent, EmployeeComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ]
})
export class PagesModule { }
