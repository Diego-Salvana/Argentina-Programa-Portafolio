import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
   booleanoEnHeader: boolean = false;
   subscription = new Subscription();

   constructor(private uiSvc: UiService, private router: Router) {
      this.booleanoEnHeader = uiSvc.booleanoModificar;
      console.log(
         'Header: ',
         this.booleanoEnHeader,
         'UiSvc: ' + uiSvc.booleanoModificar
      );
   }

   ngOnInit(): void {
      this.subscription = this.uiSvc
         .onToggleModificar()
         .subscribe((value) => (this.booleanoEnHeader = value));
   }

   toggleBtnText() {
      if (!this.booleanoEnHeader) {
         this.router.navigate(['login']);
      } else {
         this.uiSvc.cambiarBooleanoModificar();
         localStorage.removeItem('token');
      }
   }
}
