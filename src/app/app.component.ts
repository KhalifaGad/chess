import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { GameMode } from "src/app/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chess';
  gameMode?: GameMode;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        // Perform logic based on the current URL to determine if the section should be displayed
        this.gameMode = this.urlToPlayMode(currentUrl);
      }
    });
  }

  urlToPlayMode(url: string) {
    if(url.includes('offline')) {
      return GameMode.OFFLINE;
    }
    if(url.includes('online')) {
      return GameMode.ONLINE;
    }
    return undefined;
  }

  goOnline() {
    void this.router.navigate(['/online']);
  }

  goOffline() {
    void this.router.navigate(['/offline']);
  }

}
