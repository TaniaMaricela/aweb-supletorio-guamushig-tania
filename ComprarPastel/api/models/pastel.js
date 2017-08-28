module.exports = {
    attributes: {
        nombre: {
            type: 'string',
            required: true
        },
        tipo: {
            type: 'string',
            enum: ['Familiar', 'Mediana'],
            required: true
        },
        precio: {
            type: 'float',
            required: true
        },
        ingredientes: {
            collection: 'ingrediente',
            via: 'id_pastel'
        },
        id_user: {
            model: 'usuario'
        }
    },
    afterDestroy: function (destroyedRecords, cb) {
        Ingrediente.destroy({
            id_pastel: _.pluck(destroyedRecords, 'id')
        }).exec(cb);
    }
};
