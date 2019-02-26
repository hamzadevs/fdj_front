import { Component, OnInit } from '@angular/core';
import { League } from '../League.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SoccerService } from '../soccer.service';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'FDJ Search';
  filteredLeagues: League[] = [];
  leaguesForm: FormGroup;
  isLoading = false;


  constructor(private fb: FormBuilder, private soccerService: SoccerService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.leaguesForm = this.fb.group({
      leagueInput: null
    })
    this.leaguesForm.get('leagueInput')
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.soccerService.search({name: value})
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(leagues => this.filteredLeagues = leagues.results);
    }
    

    displayFn(league: League) {
      if (league) { return league.name; }
    }
    getTeam(league: League) {
      console.log(league)
      // here you can get id 
   }

}
