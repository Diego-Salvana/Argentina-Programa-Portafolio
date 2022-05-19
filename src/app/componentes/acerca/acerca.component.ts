import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-acerca',
   templateUrl: './acerca.component.html',
   styleUrls: ['./acerca.component.css'],
})
export class AcercaComponent implements OnInit {
   private urlDatosPersonales = 'http://localhost:8080/api/datospersonales';
   private subscription = new Subscription();
   public acerca: string = '';
   public display: string = 'none';
   public isActive: boolean = false;

   constructor(private Svc: PortfolioService, private uiSvc: UiService) {
      this.isActive = uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.Svc.obtenerDatos(this.urlDatosPersonales).subscribe((data) => {
         this.acerca = data.acerca;
      });

      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (value === false) this.display = 'none';
      });
   }

   agregar() {
      if (this.display === 'none') {
         this.display = 'block';
      } else {
         this.display = 'none';
      }
   }

   guardar() {
      if (this.acerca === '')
         return alert('Debes escribir un texto para modificar.');

      let datosPers = {
         id: 1,
         nombre: 'Diego',
         apellido: 'Salvañá',
         edad: 32,
         acerca: this.acerca,
      };

      this.Svc.modificarItem(this.urlDatosPersonales, datosPers).subscribe();
      this.display = 'none';
   }
}
