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
   acerca: string = '';
   display: string = 'none';
   urlDatosPersonales = 'http://localhost:5001/datosPersonales';
   booleanoEnAcerca: boolean = false;
   subscription = new Subscription();

   constructor(private Svc: PortfolioService, private uiSvc: UiService) {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.booleanoEnAcerca = value;
         if (value === false) this.display = 'none';
      });
   }

   ngOnInit(): void {
      this.Svc.obtenerDatos(this.urlDatosPersonales).subscribe((data) => {
         this.acerca = data.acerca;
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
         nombre: 'Diego',
         apellido: 'Salvañá',
         edad: 32,
         acerca: this.acerca,
      };

      this.Svc.modificarItem(this.urlDatosPersonales, datosPers).subscribe();
      this.display = 'none';
   }
}
