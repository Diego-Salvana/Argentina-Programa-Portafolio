import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { NavComponent } from './componentes/nav/nav.component';
import { AcercaComponent } from './componentes/acerca/acerca.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilDurasComponent } from './componentes/habil-duras/habil-duras.component';
import { HabilBlandasComponent } from './componentes/habil-blandas/habil-blandas.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormAgregarComponent } from './componentes/form-agregar/form-agregar.component';
import { FormLoginComponent } from './componentes/form-login/form-login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { InterceptorService } from './servicios/interceptor.service';
import { CardInfoComponent } from './componentes/card-info/card-info.component';
import { CardHabilComponent } from './componentes/card-habil/card-habil.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { SpinnerInterceptor } from './Interceptores/spinner.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      NavComponent,
      AcercaComponent,
      ExperienciaComponent,
      EducacionComponent,
      HabilDurasComponent,
      HabilBlandasComponent,
      ProyectosComponent,
      FooterComponent,
      FormAgregarComponent,
      FormLoginComponent,
      PortfolioComponent,
      CardInfoComponent,
      CardHabilComponent,
      SpinnerComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
