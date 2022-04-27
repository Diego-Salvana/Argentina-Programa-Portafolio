import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/servicios/ui.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
   selector: 'app-form-login',
   templateUrl: './form-login.component.html',
   styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
   public user: string = '';
   public password: string = '';

   constructor(
      private uiService: UiService,
      private router: Router,
      private authSvc: AuthService
   ) {}

   ngOnInit(): void {}

   irPortfolio(): void {
      this.router.navigate(['portfolio']);
   }

   ingresar(): void {
      if (this.user === '' || this.password === '')
         return alert('Completar datos del formulario.');

      this.authSvc.obtenerUsuario().subscribe((usuario) => {
         if (this.user !== usuario.user || this.password !== usuario.password)
            return alert('Usuario o Contraseña inválidos.');
         //this.user = '';
         //this.password = '';

         localStorage.setItem('token', usuario.password);
         this.uiService.cambiarBooleanoModificar();
         this.router.navigate(['']);
      });
   }
}
