import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false)

    }, { validators: this.sonIguales('password', 'password2') });
  }
  sonIguales(field1: string, field2: string) {
    return (group: FormGroup) => {
      let campo1 = group.controls[field1].value;
      let campo2 = group.controls[field2].value;
      if (campo1 === campo2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }
  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.conditions) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'warning',
        title: 'Debe aceptar las condiciones'
      });
      return;
    }

    let usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(res => this.router.navigate(['/login']));
    // console.log('Form válida: ', this.forma.valid);
    // console.log(this.forma.value);
  }

}
