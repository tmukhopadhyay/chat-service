import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if(sessionStorage.getItem('userName')) {
      return true;
    }

    this.router.navigate(['/sign-in']);
    return false;
  }
}
