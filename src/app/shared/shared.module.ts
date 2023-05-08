import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
  ],
  providers: [],
  declarations: [
    MenuComponent
  ],
  exports: [MenuComponent]
})
export class SharedModule {}
