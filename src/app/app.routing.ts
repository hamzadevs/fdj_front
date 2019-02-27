import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';

const APP_ROUTES: Routes = [
    {path:"teams",component: TeamsComponent},
    {path:"team/:id",component: PlayersComponent}
]
export const routing: ModuleWithProviders=RouterModule.forRoot(APP_ROUTES);
export const routingComponents = [PlayersComponent,TeamsComponent]