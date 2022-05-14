import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginaPublicaComponent } from './pages/pagina-publica/pagina-publica.component';
import { PaginaProtegidaComponent } from './pages/pagina-protegida/pagina-protegida.component';


const routes: Routes = [
  { 
    path: 'login-callback',
    component: LoginCallbackComponent,
    data: {
      title: 'Login'
    }
  },
  { 
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },  
  { 
    path: 'pagina-publica',
    component: PaginaPublicaComponent,
    data: {
      title: 'Página Publica'
    }
  },
  { 
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
      path: 'pagina-protegida',
      canActivate: [AuthGuard],      
      component: PaginaProtegidaComponent,
      data: {
        title: 'Página Protegida'
      }
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
