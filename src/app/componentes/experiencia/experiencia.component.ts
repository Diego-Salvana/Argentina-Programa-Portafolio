import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Experiencia } from 'src/app/interfaces/experiencia.interface';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-experiencia',
   templateUrl: './experiencia.component.html',
   styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
   private urlExperiencia: string =
      'https://cors-proxy-ap.herokuapp.com/https://portfolio-heroku-ap.herokuapp.com/api/experiencia';
   private subscription = new Subscription();
   public experienceList: Experiencia[] = [];
   public isActive: boolean = false;
   public displayForm: string = 'none';

   constructor(private svc: PortfolioService, private uiSvc: UiService) {
      this.isActive = uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (value === false) {
            this.displayForm = 'none';
         }
      });

      this.svc.obtenerDatos(this.urlExperiencia).subscribe((data) => {
         data.sort((a: Experiencia, b: Experiencia) => {
            if (a.id < b.id) {
               return -1;
            } else if (a.id > b.id) {
               return 1;
            } else {
               return 0;
            }
         });

         this.experienceList = data;
      });
   }

   agregar() {
      if (this.displayForm === 'none') return (this.displayForm = 'block');

      return (this.displayForm = 'none');
   }

   //CRUD
   add(item: any) {
      let newExp: Experiencia = {
         id: 0,
         empresa: item.prop1,
         funcion: item.prop2,
         anio: item.prop3,
      };

      this.svc.agregarItem(this.urlExperiencia, newExp).subscribe(() => {
         this.svc.obtenerDatos(this.urlExperiencia).subscribe((data) => {
            this.experienceList.push(data[data.length - 1]);
         });
      });

      this.displayForm = 'none';
   }

   toggle(item: any) {
      let newExp: Experiencia = {
         id: item.id,
         empresa: item.prop1,
         funcion: item.prop2,
         anio: item.prop3,
      };

      this.svc.modificarItem(this.urlExperiencia, newExp).subscribe();
   }

   delete(exp: Experiencia) {
      if (!confirm('¿Desea borrar experiencia?')) return;

      let url = `${this.urlExperiencia}/${exp.id}`;
      this.svc.borrarItem(url).subscribe(() => {
         this.experienceList = this.experienceList.filter(
            (e) => e.id !== exp.id
         );
      });
   }
}
