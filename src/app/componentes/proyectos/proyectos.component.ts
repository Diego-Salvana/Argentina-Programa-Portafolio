import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/interfaces/proyecto.interface';

import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-proyectos',
   templateUrl: './proyectos.component.html',
   styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
   private urlProyectos: string =
      'https://cors-proxy-ap.herokuapp.com/https://portfolio-heroku-ap.herokuapp.com/api/proyectos';
   private subscription = new Subscription();
   public projectsList: Proyecto[] = [];
   public isActive: boolean = false;
   public displayForm: string = 'none';

   constructor(private svc: PortfolioService, private uiSvc: UiService) {
      this.isActive = uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (value === false) this.displayForm = 'none';
      });

      this.svc.obtenerDatos(this.urlProyectos).subscribe((data) => {
         data.sort((a: Proyecto, b: Proyecto) => {
            if (a.id < b.id) {
               return -1;
            } else if (a.id > b.id) {
               return 1;
            } else {
               return 0;
            }
         });

         this.projectsList = data;
      });
   }

   agregar() {
      if (this.displayForm === 'none') return (this.displayForm = 'block');

      return (this.displayForm = 'none');
   }

   //CRUD
   add(item: any) {
      let newPro: Proyecto = {
         id: 0,
         nombre: item.prop1,
         descripcion: item.prop2,
         link: item.prop3,
      };

      this.svc.agregarItem(this.urlProyectos, newPro).subscribe(() => {
         this.svc.obtenerDatos(this.urlProyectos).subscribe((data) => {
            this.projectsList.push(data[data.length - 1]);
         });
      });

      this.displayForm = 'none';
   }

   toggle(item: any) {
      let newPro: Proyecto = {
         id: item.id,
         nombre: item.prop1,
         descripcion: item.prop2,
         link: item.prop3,
      };

      this.svc.modificarItem(this.urlProyectos, newPro).subscribe();
   }

   delete(project: Proyecto) {
      if (!confirm('??Desea borrar el proyecto?')) return;

      let url = `${this.urlProyectos}/${project.id}`;
      this.svc.borrarItem(url).subscribe(() => {
         this.projectsList = this.projectsList.filter(
            (e) => e.id !== project.id
         );
      });
   }
}
