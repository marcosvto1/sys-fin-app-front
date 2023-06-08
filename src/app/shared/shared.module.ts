import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class SharedModule {}
