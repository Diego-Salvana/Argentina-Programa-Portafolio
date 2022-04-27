import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { FormLoginComponent } from './componentes/form-login/form-login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { AuthGuard } from './guards/auth.guard';

const routerOptions: ExtraOptions = {
   anchorScrolling: 'enabled',
   scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
   { path: 'portfolio', component: PortfolioComponent },
   { path: 'login', component: FormLoginComponent, canActivate: [AuthGuard] },
   { path: '**', redirectTo: 'portfolio', pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes, routerOptions)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
