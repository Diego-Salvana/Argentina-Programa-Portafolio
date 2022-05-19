import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UiService } from 'src/app/servicios/ui.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
   selector: 'app-form-login',
   templateUrl: './form-login.component.html',
   styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
   public form: FormGroup;

   constructor(
      private uiService: UiService,
      private authSvc: AuthService,
      private router: Router,
      private formBuilder: FormBuilder
   ) {
      this.form = this.formBuilder.group({
         id: 1,
         usuario: ['', [Validators.required, Validators.email]],
         contrasena: ['', [Validators.required, Validators.minLength(2)]],
      });
   }

   ngOnInit(): void {}

   get Usuario() {
      return this.form.get('usuario');
   }

   get Contrasena() {
      return this.form.get('contrasena');
   }

   irPortfolio(): void {
      this.router.navigate(['portfolio']);
   }

   ingresar(event: Event): void {
      event.preventDefault;

      if (!this.form.valid)
         return alert('Completar correctamente los datos del formulario.');

      this.authSvc.iniciarSesion(this.form.value).subscribe((data) => {
         //console.log('DATA: ', JSON.stringify(data), data.Verificacion);
         if (!data.token) return alert('Usuario o contraseña inválidos.');

         this.uiService.cambiarBooleanoModificar();

         this.router.navigate(['portfolio']);
      });
   }
}
