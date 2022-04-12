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
   experienceList: any;
   display: string = 'none';
   cardInfoDisplay: string = 'none';
   urlExperiencia: string = 'http://localhost:5001/experiencia';
   isActive: boolean = false;
   subscription = new Subscription();

   constructor(private svc: PortfolioService, uiSvc: UiService) {
      this.subscription = uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (value === false) {
            this.display = 'none';
            this.cardInfoDisplay = 'none';
         }
      });
   }

   ngOnInit(): void {
      this.svc.obtenerDatos(this.urlExperiencia).subscribe((data) => {
         this.experienceList = data;
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
      let newExp = {
         empresa: item.prop1,
         funcion: item.prop2,
         anio: item.prop3,
      };

      this.svc.agregarItem(this.urlExperiencia, newExp).subscribe((exp) => {
         this.experienceList.push(exp);
      });

      this.display = 'none';
   }

   delete(item: any) {
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

      let url = `${this.urlExperiencia}/${item.id}`;
      this.svc.modificarItem(url, item).subscribe();

      console.log(item);
      this.cardInfoDisplay = 'none';
   }
}
