import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Educacion } from 'src/app/interfaces/educacion.interface';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-educacion',
   templateUrl: './educacion.component.html',
   styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
   private urlEducacion: string =
      'https://cors-proxy-ap.herokuapp.com/https://portfolio-heroku-ap.herokuapp.com/api/educacion';
   private subscription = new Subscription();
   public educationList: Educacion[] = [];
   public isActive: boolean = false;
   public displayForm: string = 'none';

   constructor(private svc: PortfolioService, private uiSvc: UiService) {
      this.isActive = uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (!value) this.displayForm = 'none';
      });

      this.svc.obtenerDatos(this.urlEducacion).subscribe((data) => {
         data.sort((a: Educacion, b: Educacion) => {
            if (a.id < b.id) {
               return -1;
            } else if (a.id > b.id) {
               return 1;
            } else {
               return 0;
            }
         });

         this.educationList = data;
      });
   }

   agregar() {
      if (this.displayForm === 'none') return (this.displayForm = 'block');

      return (this.displayForm = 'none');
   }

   //CRUD de Items
   delete(edu: Educacion) {
      if (!confirm('¿Desea borrar educación?')) return;

      let url = `${this.urlEducacion}/${edu.id}`;
      console.log(edu);
      this.svc.borrarItem(url).subscribe(() => {
         this.educationList = this.educationList.filter((e) => e.id !== edu.id);
      });
   }

   toggle(item: any) {
      let newEdu: Educacion = {
         id: item.id,
         institucion: item.prop1,
         carrera: item.prop2,
         estado: item.prop3,
      };

      let url = `${this.urlEducacion}/modificar`;
      this.svc.modificarItem(url, newEdu).subscribe();
   }

   add(item: any) {
      let newItemEdu: Educacion = {
         id: 0,
         institucion: item.prop1,
         carrera: item.prop2,
         estado: item.prop3,
      };

      let url = `${this.urlEducacion}/agregar`;
      this.svc.agregarItem(url, newItemEdu).subscribe(() => {
         this.svc.obtenerDatos(this.urlEducacion).subscribe((data) => {
            this.educationList.push(data[data.length - 1]);
         });
      });

      this.displayForm = 'none';
   }
}
