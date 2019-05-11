import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaComponent } from './pages/area.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AreaCreateComponent } from './components/area-create/area-create.component';

const routes: Routes = [
  { path: '', component: AreaComponent },
  { path: 'areas/create', component: AreaCreateComponent },
  { path: 'areas/:id', component: AreaEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AreaRouter {
}
