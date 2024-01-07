import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnderecoComponent } from './endereco.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [EnderecoComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [EnderecoComponent]
})
export class EnderecoModule { }
