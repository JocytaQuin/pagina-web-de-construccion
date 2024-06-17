document.addEventListener('DOMContentLoaded', () => {
    const formularioUsuario = document.getElementById('formularioUsuario');
    const listaUsuarios = document.getElementById('usuarios');
    const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
    const confNombre = document.getElementById('confNombre');
    const confApellido = document.getElementById('confApellido');
    const confCorreo = document.getElementById('confCorreo');
    const confCargo = document.getElementById('confCargo');
    const confFechaIngreso = document.getElementById('confFechaIngreso');
    const botonConfirmar = document.getElementById('botonConfirmar');

    formularioUsuario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const correo = document.getElementById('correo').value;
        const cargo = document.getElementById('cargo').value;
        const fechaIngreso = document.getElementById('fechaIngreso').value;

        if (!validarFormulario(correo, fechaNacimiento, fechaIngreso)) return;

        confNombre.textContent = nombre;
        confApellido.textContent = apellido;
        confCorreo.textContent = correo;
        confCargo.textContent = cargo;
        confFechaIngreso.textContent = fechaIngreso;

        modalConfirmacion.show();
    });

    botonConfirmar.addEventListener('click', () => {
        agregarUsuario();
        modalConfirmacion.hide();
    });

    function validarFormulario(correo, fechaNacimiento, fechaIngreso) {
        const correosExistentes = Array.from(listaUsuarios.getElementsByClassName('correo-usuario')).map(el => el.textContent);
        if (correosExistentes.includes(correo)) {
            alert('El correo electrónico ya está registrado.');
            return false;
        }

        const fechaNac = new Date(fechaNacimiento);
        const fechaIng = new Date(fechaIngreso);
        const edadAlIngreso = fechaIng.getFullYear() - fechaNac.getFullYear();

        if (edadAlIngreso < 18 || (edadAlIngreso === 18 && fechaIng < new Date(fechaNac.getFullYear() + 18, fechaNac.getMonth(), fechaNac.getDate()))) {
            alert('El trabajador debe tener al menos 18 años en la fecha de ingreso.');
            return false;
        }

        return true;
    }

    function agregarUsuario() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value;
        const cargo = document.getElementById('cargo').value;
        const fechaIngreso = document.getElementById('fechaIngreso').value;

        const tarjetaUsuario = document.createElement('div');
        tarjetaUsuario.className = 'col-12 col-sm-6 col-lg-3 tarjeta-usuario';

        tarjetaUsuario.innerHTML = `
            <h5>${nombre} ${apellido}</h5>
            <p class="correo-usuario">${correo}</p>
            <p>${cargo}</p>
            <p>${fechaIngreso}</p>
            <button class="btn btn-primary btn-sm">Eliminar</button>
        `;

        tarjetaUsuario.querySelector('button').addEventListener('click', () => {
            tarjetaUsuario.remove();
        });

        listaUsuarios.appendChild(tarjetaUsuario);

        formularioUsuario.reset();
    }
});





