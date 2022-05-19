import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-proyectos',
   templateUrl: './proyectos.component.html',
   styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
   private urlProyectos: string = 'http://localhost:8080/api/proyectos';
   private subscription = new Subscription();
   public projectsList: any;
   public isActive: boolean = false;
   public displayForm: string = 'none';
   public cardFormDisplay: string = 'none';

   constructor(private svc: PortfolioService, private uiSvc: UiService) {
      this.isActive = uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (value === false) {
            this.displayForm = 'none';
            this.cardFormDisplay = 'none';
         }
      });

      this.svc.obtenerDatos(this.urlProyectos).subscribe((data) => {
         this.projectsList = data;
      });
   }

   agregar() {
      if (this.displayForm === 'none') {
         this.displayForm = 'block';
      } else {
         this.displayForm = 'none';
      }
   }

   cardInfoEdit() {
      if (this.cardFormDisplay === 'none') {
         this.cardFormDisplay = 'block';
      } else {
         this.cardFormDisplay = 'none';
      }
   }

   //CRUD
   add(item: any) {
      let newPro = {
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

   delete(item: any) {
      if (!confirm('¿Desea borrar el proyecto?')) return;

      let url = `${this.urlProyectos}/${item.id}`;
      this.svc.borrarItem(url).subscribe(() => {
         this.projectsList = this.projectsList.filter(
            (e: any) => e.id !== item.id
         );
      });
   }

   toggle(item: any) {
      if (item.empresa === '' || item.funcion === '' || item.anio === '')
         return alert('Todos los campos del formulario son obligatorios.');

      this.svc.modificarItem(this.urlProyectos, item).subscribe();

      this.cardFormDisplay = 'none';
   }
}
