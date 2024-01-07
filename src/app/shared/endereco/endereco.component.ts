import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from './model/endereco.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent {
 formEndereco!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {   
}

  criarFormulario() {
    this.formEndereco = this.formBuilder.group({
      rua: ['', Validators.required],
      complemento: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      bairro: ['', Validators.required],
    });
    return this.formEndereco;
  }

  valoresControl() {
    const payload: Endereco = {
    rua: this.formEndereco.controls['rua'].value,
    complemento: this.formEndereco.controls['complemento'].value,
    numero: this.formEndereco.controls['numero'].value,
    cep: this.formEndereco.controls['cep'].value,
    cidade: this.formEndereco.controls['cidade'].value,
    estado: this.formEndereco.controls['estado'].value,
    bairro: this.formEndereco.controls['bairro'].value,
    }

    return payload;
  }

}
