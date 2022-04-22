import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/servicios/ui.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-form-login',
   templateUrl: './form-login.component.html',
   styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
   booleanForm: boolean = false;
   subscription = new Subscription();
   urlUser: string = 'http://localhost:5001/user';
   user: string = '';
   password: string = '';

   constructor(
      private uiService: UiService,
      private portfolioSvc: PortfolioService,
   ) {
      this.subscription = this.uiService.onToggle().subscribe((value) => {
         this.booleanForm = value;
      });
   }

   ngOnInit(): void {}

   salir(): void {
      this.booleanForm = false;
      this.user = '';
      this.password = '';
      this.uiService.cambiarBooleano();
   }

   ingresar(): void {
      if (this.user === '' || this.password === '')
         return alert('Completar datos del formulario.');

      this.portfolioSvc.obtenerDatos(this.urlUser).subscribe((value) => {
         console.log(value);

         if (this.user !== value.usuario || this.password !== value.contraseña)
            return alert('Usuario o Contraseña inválidos.');

         this.uiService.cambiarBooleanoModificar();
         this.uiService.cambiarBooleano();

         this.user = '';
         this.password = '';
      });
   }
}
