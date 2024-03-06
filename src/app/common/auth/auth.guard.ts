import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const authenticationService: AuthenticationService = inject(
    AuthenticationService
  );

  return authenticationService.usuarioEstaLogado().pipe(
    tap((estaLogado) => {
      if (!estaLogado) {
        router.navigate(["auth/login"]);
      } 
    })
  );
};
