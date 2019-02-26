import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';

const APP_ROUTES: Routes = [
    {path:"",component: TeamsComponent}
]
export const routing: ModuleWithProviders=RouterModule.forRoot(APP_ROUTES);