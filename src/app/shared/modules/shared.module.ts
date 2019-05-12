import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcombComponent } from '../components/breadcomb/breadcomb.component';
import { HeaderComponent } from '../components/header/header.component';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    BreadcombComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    BreadcombComponent
  ]
})
export class SharedModule { }
