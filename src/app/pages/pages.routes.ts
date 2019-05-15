import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent, data: { titulo: 'Dashboard', descripcion: 'aqui la descripcion de la página' }
            },
            {
                path: 'progress',
                component: ProgressComponent, data: { titulo: 'Progress', descripcion: 'aqui la descripcion de la página' }
            },
            {
                path: 'graficas1',
                component: Graficas1Component, data: { titulo: 'Gráficas', descripcion: 'aqui la descripcion de la página' }
            },
            {
                path: 'promesas',
                component: PromesasComponent, data: { titulo: 'Promesas', descripcion: 'aqui la descripcion de la página' }
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent, data: { titulo: 'Ajustes', descripcion: 'aqui la descripcion de la página' }
            },
            {
                path: 'perfil',
                component: ProfileComponent, data: { titulo: 'Perfil', descripcion: 'aqui la descripcion de la página' }
            },
            {
                path: '', redirectTo: '/dashboard', pathMatch: 'full'
            }
        ]
    },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
