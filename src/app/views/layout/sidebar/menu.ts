import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Companies',
    icon: 'layout',
    link: '/company/company-list'
  },

  {
    label: 'Entities',
    icon: 'layout',
    link: '/company/company-entity-list'
  },

  {
    label: 'Departements',
    icon: 'layout',
    link: '/company/departement-list'
  },

  {
    label: 'Teams',
    icon: 'layout',
    link: '/company/team-list'
  },

  {
    label: 'Employees',
    icon: 'layout',
    link: '/company/employee-list'
  },

];
