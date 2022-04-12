import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
   booleanoEnHeader: boolean = false;
   subscription = new Subscription();

   constructor(private uiSvc: UiService) {
      this.subscription = uiSvc
         .onToggleModificar()
         .subscribe((value) => (this.booleanoEnHeader = value));
   }

   ngOnInit(): void {}

   toggleBtnText() {
      if (this.booleanoEnHeader === false) {
         this.uiSvc.cambiarBooleano();
      } else {
         this.uiSvc.cambiarBooleanoModificar();
      }
   }
}
