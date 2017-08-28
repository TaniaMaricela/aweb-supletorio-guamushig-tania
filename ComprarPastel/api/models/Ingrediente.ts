/**
 * Created by poli_ on 14/8/2017.
 */
module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      enum: ['Crema en base de mantequilla', 'Crema chantillí clásica', 'Vainilla', 'Chocolate', 'Crema pastelera', 'Uvas', 'Frutillas'],
      unique: true,
      required: true
    },

    id_pastel: {
      model: 'pastel'
    }
  }

};
