import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { SoccerService } from './soccer.service';
import { League } from './League.interface'
import { debounceTime, tap, switchMap, finalize, startWith, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  
}
