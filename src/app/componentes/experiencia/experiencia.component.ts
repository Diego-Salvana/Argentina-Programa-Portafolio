import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-experiencia',
   templateUrl: './experiencia.component.html',
   styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
   private urlExperiencia: string = 'http://localhost:8080/api/experiencia';
   private subscription = new Subscription();
   public experienceList: any;
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
      this.svc.obtenerDatos(this.urlExperiencia).subscribe((data) => {
         this.experienceList = data;
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
      let newExp = {
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

   delete(item: any) {
      if (!confirm('¿Desea borrar experiencia?')) return;

      let url = `${this.urlExperiencia}/${item.id}`;
      this.svc.borrarItem(url).subscribe(() => {
         this.experienceList = this.experienceList.filter(
            (e: any) => e.id !== item.id
         );
      });
   }

   toggle(item: any) {
      if (item.empresa === '' || item.funcion === '' || item.anio === '')
         return alert('Todos los campos del formulario son obligatorios.');

      this.svc.modificarItem(this.urlExperiencia, item).subscribe();

      console.log(item);
      this.cardFormDisplay = 'none';
   }
}
