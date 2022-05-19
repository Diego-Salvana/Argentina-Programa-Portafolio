import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';

import { Educacion } from 'src/app/interfaces/educacion.interface';

@Component({
   selector: 'app-educacion',
   templateUrl: './educacion.component.html',
   styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
   private urlEducacion: string = 'http://localhost:8080/api/educacion';
   private subscription = new Subscription();
   public educationList: Educacion[] = [];
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

      this.svc.obtenerDatos(this.urlEducacion).subscribe((data) => {
         this.educationList = data;
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

   //CRUD de Items
   delete(edu: Educacion) {
      if (!confirm('¿Desea borrar educación?')) return;

      let url = `http://localhost:8080/api/eliminareducacion/${edu.id}`;
      console.log(edu);
      this.svc.borrarItem(url).subscribe(() => {
         this.educationList = this.educationList.filter(
            (e: any) => e.id !== edu.id
         );
      });
   }

   toggle(edu: Educacion) {
      console.log(edu);
      if (edu.institucion === '' || edu.carrera === '' || edu.estado === '')
         return alert('Todos los campos del formulario son obligatorios.');

      let url = `http://localhost:8080/api/modificareducacion`;
      this.svc.modificarItem(url, edu).subscribe();

      this.cardFormDisplay = 'none';
   }

   add(item: any) {
      let newItemEdu: Educacion = {
         id: 0,
         institucion: item.prop1,
         carrera: item.prop2,
         estado: item.prop3,
      };

      this.svc
         .agregarItem('http://localhost:8080/api/agregareducacion', newItemEdu)
         .subscribe(() => {
            this.svc
               .obtenerDatos('http://localhost:8080/api/educacion')
               .subscribe((data) => {
                  this.educationList.push(data[data.length - 1]);
               });
         });

      this.displayForm = 'none';
   }
}
