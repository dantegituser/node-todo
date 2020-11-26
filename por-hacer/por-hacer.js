const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo grabar', err);
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (erro) {
        listadoPorHacer = [];
    }
    //console.log(listadoPorHacer);
};

const crear = (descripcion) => {

    cargarDB();
    let porhacer = {
        descripcion: descripcion,
        completado: false
    };
    listadoPorHacer.push(porhacer);
    guardarDB();
    return porhacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};