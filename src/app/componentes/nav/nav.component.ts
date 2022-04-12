import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   @Input() text: string = '';
   @Input() color: string = '';
   @Output() btnClick = new EventEmitter();

   constructor() {}

   ngOnInit(): void {}

   onClick() {
      this.btnClick.emit();
   }
}
