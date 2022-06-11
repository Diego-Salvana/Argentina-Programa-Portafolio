import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from 'src/app/servicios/ui.service';

@Component({
   selector: 'app-card-info',
   templateUrl: './card-info.component.html',
   styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
   isActive: boolean = false;
   subscription = new Subscription();
   cardFormDisplay: string = 'none';
   @Input() id: number = 0;
   @Input() prop1: string = '';
   @Input() prop2: string = '';
   @Input() prop3: string = '';
   @Output() deleteEmitter = new EventEmitter();
   @Input() formTitle: string = '';
   @Input() formLabelUno: string = '';
   @Input() formLabelDos: string = '';
   @Input() formLabelTres: string = '';
   @Output() submitEmitter = new EventEmitter();

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
      if (this.cardFormDisplay === 'none')
         return (this.cardFormDisplay = 'block');

      return (this.cardFormDisplay = 'none');
   }

   delete() {
      this.deleteEmitter.emit();
   }

   submit() {
      if (this.prop1 === '' || this.prop2 === '' || this.prop3 === '')
         return alert('Todos los campos del formulario son obligatorios.');

      let { id, prop1, prop2, prop3 } = this,
         item = {
            id,
            prop1,
            prop2,
            prop3,
         };

      this.submitEmitter.emit(item);
      this.cardFormDisplay = 'none';
   }
}
