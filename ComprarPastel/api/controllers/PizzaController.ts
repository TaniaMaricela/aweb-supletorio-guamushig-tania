/**
 * Created by poli_ on 14/8/2017.
 */
declare let Pizza;
declare let Ingrediente;

module.exports = {

  CrearPizza: function (req, res) {

    if (req.method == 'POST') {
      var parametros = req.allParams();

      if (parametros.nombre && parametros.tipo && parametros.precio && parametros.masa && parametros.principal
        && parametros.adicional && parametros.id_user) {

        var pizzaCrear = {
          nombre: parametros.nombre,
          tipo: parametros.tipo,
          precio: parametros.precio,
          id_user: parametros.id_user
        };

        Pizza.create(pizzaCrear).exec(function (err, pizzaCreada) {
          if (err) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Fallo al crear la Pizza",
                rawError: err,
                url: "/crearPastel"
              }
            });
          }

          var ingredienteMasa = {
            nombre: parametros.masa
          };

          var ingredientePrincipal = {
            nombre: parametros.principal
          };

          var ingredienteAdicional = {
            nombre: parametros.adicional
          };

          Ingrediente.create(ingredienteMasa).exec(function (err, masaCreada) {
            if (err) {
              return res.view('vistas/error', {
                error: {
                  descripcion: "Fallo al añadir la Masa",
                  rawError: err,
                  url: "/crearPastel"
                }
              });
            }

            Ingrediente.create(ingredientePrincipal).exec(function (err, principalCreado) {
              if (err) {
                return res.view('vistas/error', {
                  error: {
                    descripcion: "Fallo al añadir el ingrediente principal",
                    rawError: err,
                    url: "/crearPastel"
                  }
                });
              }

              Ingrediente.create(ingredienteAdicional).exec(function (err, adicionalCreado) {
                if (err) {
                  return res.view('vistas/error', {
                    error: {
                      descripcion: "Fallo al añadir el ingrediente adicional",
                      rawError: err,
                      url: "/crearPastel"
                    }
                  });
                }

                return res.view('vistas/crearPastel');
              })
            });

          });


        });
      } else {
        return res.view('vistas/error', {
          error: {
            descripcion: "No se completaron todos los campos",
            rawError: "Campos Incompletos",
            url: "/crearPastel"
          }
        });
      }
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Error en el método HTTP",
          rawError: "Método Inválido",
          url: "/crearPastel"
        }
      })
    }

  }
};
