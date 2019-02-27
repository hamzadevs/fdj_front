import { Injectable } from '@angular/core';
import { Team } from './team.interface';

@Injectable()
export class NavbarService {
  visible: boolean;
  team: Team

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  setTeam(team){this.team = team;}
  getTeam(){return this.team;}

}