import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Habilidad } from 'src/app/interfaces/habilidad.interface';

import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-card-habil',
   templateUrl: './card-habil.component.html',
   styleUrls: ['./card-habil.component.css'],
})
export class CardHabilComponent implements OnInit {
   @Input() id: number = 0;
   @Input() iconoHTML: string = '';
   @Input() titulo: string = '';
   @Input() porcentaje: number = 0;
   mouseOver: boolean = false;
   isActive: boolean = false;
   subscription = new Subscription();
   cardFormDisplay: string = 'none';
   @Output() submitEmitter = new EventEmitter();
   @Output() deleteEmitter = new EventEmitter();

   constructor(private uiSvc: UiService) {
      this.isActive = this.uiSvc.booleanoModificar;
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc.onToggleModificar().subscribe((value) => {
         this.isActive = value;
         if (!value) this.cardFormDisplay = 'none';
      });
   }

   showForm() {
      this.cardFormDisplay = 'block';
   }

   submit() {
      if (this.iconoHTML === '' || this.titulo === '' || !this.porcentaje)
         return alert('Todos los campos del formulario son obligatorios.');

      if (this.porcentaje < 0 || this.porcentaje > 100)
         return alert('El porcentaje debe estar entre 0 y 100.');

      let { id, iconoHTML, titulo, porcentaje } = this,
         item: Habilidad = {
            id,
            iconoHTML,
            titulo,
            porcentaje,
         };

      this.submitEmitter.emit(item);
      this.cardFormDisplay = 'none';
   }

   delete() {
      this.deleteEmitter.emit();
   }

   exit() {
      this.cardFormDisplay = 'none';
   }
}
