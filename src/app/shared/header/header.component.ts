import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/login/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  navigateToPage(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
