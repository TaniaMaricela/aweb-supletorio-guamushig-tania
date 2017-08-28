/**
 * Created by poli_ on 14/8/2017.
 */
declare let require;
declare let module;

var Passwords = require('machinepack-passwords');

module.exports = {
  Login: function (req, res) {
    var parametros = req.allParams();

    if (parametros.correo && parametros.password) {
      Usuario.findOne({
        correo: parametros.correo
      }).exec(function (err, usuarioEncontrado) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Hubo un problema en el login",
              rawError: err,
              url: "/Login"
            }
          })
        }

        if (usuarioEncontrado) {
          Passwords.checkPassword({
            passwordAttempt: parametros.password,
            encryptedPassword: usuarioEncontrado.password,
          }).exec({
            error: function (err) {
              return res.view('vistas/error', {
                error: {
                  descripcion: "Hubo un problema en el login",
                  rawError: err,
                  url: "/Login"
                }
              })
            },
            incorrect: function () {
              return res.view('vistas/error', {
                error: {
                  descripcion: "El password es incorrecto",
                  rawError: "Password Incorrecto",
                  url: "/Login"
                }
              })
            },
            success: function () {
              req.session.credencialSegura = usuarioEncontrado;
              return res.view('vistas/home');
            },
          });
        } else {
          return res.view('vistas/error', {
            error: {
              descripcion: "Necesitamos un usuario con el correo: " + parametros.correo,
              rawError: "No existe",
              url: "/Login"
            }
          })
        }
      })
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Necesitamos su correo y password",
          rawError: "No envía Parámetros",
          url: "/Login"
        }
      })
    }
  },

  Logout: function (req, res) {
    req.session.credencialSegura = undefined;
    return res.view('vistas/login');
  }
};
