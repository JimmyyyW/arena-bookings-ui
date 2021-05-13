import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorseComponentComponent } from './components/horse-component/horse-component.component';

const routes: Routes = [
  { path: 'horses', component: HorseComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
