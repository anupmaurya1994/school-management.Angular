import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_route, state) => {
  let route = inject(Router)
  if (localStorage.getItem('userId') != null) {
    return true;
  } else {
    route.navigate(['/'])
    return false;
  }
};
