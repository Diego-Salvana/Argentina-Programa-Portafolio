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
   projectsList: any;
   display: string = 'none';
   cardInfoDisplay: string = 'none';
   urlProyectos: string = 'http://localhost:5001/proyectos';
   isActive: boolean = false;
   subscription = new Subscription();

   constructor(private svc: PortfolioService, private uiSvc: UiService) {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (value === false) {
            this.display = 'none';
            this.cardInfoDisplay = 'none';
         }
      });
   }

   ngOnInit(): void {
      this.svc.obtenerDatos(this.urlProyectos).subscribe((data) => {
         this.projectsList = data;
      });
   }

   agregar() {
      if (this.display === 'none') {
         this.display = 'block';
      } else {
         this.display = 'none';
      }
   }

   cardInfoEdit() {
      if (this.cardInfoDisplay === 'none') {
         this.cardInfoDisplay = 'block';
      } else {
         this.cardInfoDisplay = 'none';
      }
   }

   //CRUD
   add(item: any) {
      let newPro = {
         nombre: item.prop1,
         descripcion: item.prop2,
         link: item.prop3,
      };

      this.svc.agregarItem(this.urlProyectos, newPro).subscribe((el) => {
         this.projectsList.push(el);
      });

      this.display = 'none';
   }

   delete(item: any) {
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

      let url = `${this.urlProyectos}/${item.id}`;
      this.svc.modificarItem(url, item).subscribe();

      console.log(item);
      this.cardInfoDisplay = 'none';
   }
}
