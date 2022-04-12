import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-educacion',
   templateUrl: './educacion.component.html',
   styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
   educationList: any;
   display: string = 'none';
   urlEducacion: string = 'http://localhost:5001/educacion';
   cardInfoDisplay: string = 'none';
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
      this.svc.obtenerDatos(this.urlEducacion).subscribe((data) => {
         this.educationList = data;
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

   //CRUD de Items
   delete(edu: any) {
      let url = `${this.urlEducacion}/${edu.id}`;
      console.log(edu);
      this.svc.borrarItem(url).subscribe(() => {
         this.educationList = this.educationList.filter(
            (e: any) => e.id !== edu.id
         );
      });
   }

   toggle(edu: any) {
      if (edu.institucion === '' || edu.carrera === '' || edu.estado === '')
         return alert('Todos los campos del formulario son obligatorios.');

      let url = `${this.urlEducacion}/${edu.id}`;
      this.svc.modificarItem(url, edu).subscribe();

      console.log(edu);
      this.cardInfoDisplay = 'none';
   }

   add(item: any) {
      let newItemEdu = {
         institucion: item.prop1,
         carrera: item.prop2,
         estado: item.prop3,
      };

      this.svc.agregarItem(this.urlEducacion, newItemEdu).subscribe((item) => {
         this.educationList.push(item);
      });

      this.display = 'none';
   }
}
