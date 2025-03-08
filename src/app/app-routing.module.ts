import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifSearchComponent } from './components/gif-search/gif-search.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';

const routes: Routes = [
  { path: '', component: GifSearchComponent },
  { path: 'detail/:id', component: GifDetailComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }