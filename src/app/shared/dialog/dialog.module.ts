import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacaoDialogComponent } from '../../features/produto/components/confirmacao-dialog/confirmacao-dialog.component';
import { MaterialModule } from '../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfirmacaoDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class DialogModule {}
