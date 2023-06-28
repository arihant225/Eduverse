import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { MenuService } from '../menu.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateService implements CanActivate {
  canActivate(): Promise<boolean> {
  return this.user.CheckAuthorize();
  }
  constructor(private user: UserService) { 
    
  }
}
