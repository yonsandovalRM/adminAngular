import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: any;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.name = usuario.name;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }
  seleccionImagen(archivo: File) {
    if (!archivo) {
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'warning',
        title: 'El archivo seleccionado no es una imagen'
      });
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    // let urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
