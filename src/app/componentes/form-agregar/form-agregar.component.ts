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
   @Input() clase: string = '';
   @Output() itemEmitter = new EventEmitter();
   prop1: string = '';
   prop2: string = '';
   prop3: string = '';

   constructor() {}

   ngOnInit(): void {}

   onSubmit() {
      if (this.prop1 === '' || this.prop2 === '' || this.prop3 === '')
         return alert('Todos los campos del formulario son obligatorios.');

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
