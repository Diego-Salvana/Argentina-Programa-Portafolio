import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-form-agreg',
   templateUrl: './form-agregar.component.html',
   styleUrls: ['./form-agregar.component.css'],
})
export class FormAgregarComponent implements OnInit {
   @Input() titulo: string = '';
   @Input() labelUno: string = '';
   @Input() labelDos: string = '';
   @Input() labelTres: string = '';
   @Input() input3Type: string = 'text';
   @Input() clase: string = '';
   @Output() itemEmitter = new EventEmitter();
   prop1: string = '';
   prop2: string = '';
   prop3: any;

   constructor() {}

   ngOnInit(): void {}

   onSubmit() {
      if (this.prop1 === '' || this.prop2 === '' || !this.prop3)
         return alert('Todos los campos del formulario son obligatorios.');

      if (this.input3Type === 'number' && (this.prop3 < 0 || this.prop3 > 100))
         return alert('El porcentaje debe estar entre 0 y 100.');

      let { prop1, prop2, prop3 } = this,
         newItem = {
            prop1,
            prop2,
            prop3,
         };

      this.itemEmitter.emit(newItem);

      this.prop1 = '';
      this.prop2 = '';
      this.prop3 = '';
   }
}
