import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Habilidad } from 'src/app/interfaces/habilidad.interface';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-habil-duras',
   templateUrl: './habil-duras.component.html',
   styleUrls: ['./habil-duras.component.css'],
})
export class HabilDurasComponent implements OnInit {
   urlHabilides: string =
      'https://cors-proxy-ap.herokuapp.com/https://portfolio-heroku-ap.herokuapp.com/api/habilidades';
   listaHabilidades: Habilidad[] = [];
   subscription = new Subscription();
   isActive: boolean = false;
   displayForm: string = 'none';

   constructor(private svc: PortfolioService, private uiSvc: UiService) {
      this.isActive = this.uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (!value) {
            this.displayForm = 'none';
         }
      });

      this.svc.obtenerDatos(this.urlHabilides).subscribe((data) => {
         data.sort((a: Habilidad, b: Habilidad) => {
            if (a.id < b.id) {
               return -1;
            } else if (a.id > b.id) {
               return 1;
            } else {
               return 0;
            }
         });

         this.listaHabilidades = data;
      });
   }

   agregar() {
      if (this.displayForm === 'none') return (this.displayForm = 'block');

      return (this.displayForm = 'none');
   }

   //CRUD
   add(item: any) {
      let newHab: Habilidad = {
         id: 0,
         iconoHTML: item.prop1,
         titulo: item.prop2,
         porcentaje: item.prop3,
      };

      this.svc.agregarItem(this.urlHabilides, newHab).subscribe(() => {
         this.svc.obtenerDatos(this.urlHabilides).subscribe((data) => {
            this.listaHabilidades.push(data[data.length - 1]);
         });
      });

      this.displayForm = 'none';
   }

   toggle(item: Habilidad) {
      this.svc.modificarItem(this.urlHabilides, item).subscribe();
   }

   delete(hab: Habilidad) {
      if (!confirm('¿Borrar item?')) return;

      let url = `${this.urlHabilides}/${hab.id}`;
      this.svc.borrarItem(url).subscribe(() => {
         this.listaHabilidades = this.listaHabilidades.filter(
            (e) => e.id !== hab.id
         );
      });
   }
}
