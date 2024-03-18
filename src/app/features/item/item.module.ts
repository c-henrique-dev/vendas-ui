import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './components/item.component';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class ItemModule {}
