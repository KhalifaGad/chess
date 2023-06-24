import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from "@angular/router";
import { APP_TEMPLATE } from "src/app/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chess';
  appTemplate: APP_TEMPLATE = APP_TEMPLATE.WELCOME;
  protected readonly APP_TEMPLATE = APP_TEMPLATE;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(this.onRouterEvent.bind(this));
  }

  onRouterEvent(event: Event) {
    if (!(event instanceof NavigationEnd)) return;

    const currentUrl = event.url;
    this.appTemplate = this.urlToTemplate(currentUrl);
  }

  urlToTemplate(url: string) {
    return {
      '': APP_TEMPLATE.WELCOME,
      '/': APP_TEMPLATE.WELCOME,
      '/mainpage': APP_TEMPLATE.WITH_NAV,
      '/online': APP_TEMPLATE.WITH_NAV,
      '/iframepage': APP_TEMPLATE.SIMPLE,
    }[url] ?? APP_TEMPLATE.WELCOME;
  }

  goOnline() {
    void this.router.navigate(['/online']);
  }

  goOffline() {
    void this.router.navigate(['/mainpage']);
  }
}
