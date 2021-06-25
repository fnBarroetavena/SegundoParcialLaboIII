"use strict";
window.addEventListener('load', function () {
    var _a, _b, _c, _d, _e, _f;
    fillTable();
    (_a = $('btnShow')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', showForm);
    (_b = $('btnAgregar')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', agregar);
    (_c = $('btnCerrar')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', clearForm);
    (_d = $('btnCerrarX')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', clearForm);
    (_e = $('slVehiculo')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', refresh);
    (_f = $('promedio')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', sacarPromedio);
});
function sacarPromedio() {
    var vehiculos = localStorage.getItem('vehiculos');
    if (vehiculos) {
        var vehiculosAmostrar_1 = $('slVehiculo').value;
        var arrayVehiculos = JSON.parse(vehiculos).filter(function (v) { return (v.tipo == vehiculosAmostrar_1 || vehiculosAmostrar_1 == 'Todo'); });
        var suma = 0;
        var promedio = 0;
        if (arrayVehiculos.length > 0) {
            suma = arrayVehiculos.reduce(function (prev, current) {
                return prev += Number(current.precio);
            }, 0);
            promedio = suma / arrayVehiculos.length;
        }
        $('lblPromedio').textContent = (promedio).toString();
    }
}
function refresh() {
    clearTable();
    fillTable();
}
function showForm() {
    show($('screenLock'));
}
function agregar(e) {
    e.preventDefault();
    var data = {
        marca: $('txtMarca').value,
        modelo: $('txtModelo').value,
        precio: $('txtPrecio').value,
        tipo: $('slForm').value
    };
    save(data);
}
function eliminar(id) {
    var vehiculos = localStorage.getItem('vehiculos');
    if (vehiculos) {
        var arrayVehiculos = JSON.parse(vehiculos);
        arrayVehiculos.splice(id, 1);
        localStorage.setItem('vehiculos', JSON.stringify(arrayVehiculos));
        refresh();
    }
}
function save(obj) {
    var vehiculos = localStorage.getItem('vehiculos');
    var arrayVehiculos = [];
    var id = 0;
    if (vehiculos) {
        arrayVehiculos = JSON.parse(vehiculos);
        id = arrayVehiculos.reduce(function (prev, current) {
            return prev < current.id;
        }, 0);
    }
    obj.id = id + 1;
    arrayVehiculos.push(obj);
    localStorage.setItem('vehiculos', JSON.stringify(arrayVehiculos));
    refresh();
    clearForm();
}
function fillTable() {
    var vehiculos = localStorage.getItem('vehiculos');
    if (vehiculos) {
        var vehiculosAmostrar_2 = $('slVehiculo').value;
        var arrayVehiculos = JSON.parse(vehiculos).filter(function (v) { return (v.tipo == vehiculosAmostrar_2 || vehiculosAmostrar_2 == 'Todo'); });
        arrayVehiculos.forEach(function (v, i) {
            var tbody = $('tbody');
            var tr = document.createElement('tr');
            var tdId = document.createElement('td');
            var tdMarca = document.createElement('td');
            var tdModelo = document.createElement('td');
            var tdPrecio = document.createElement('td');
            var tdAccion = document.createElement('td');
            var btnAccion = document.createElement('button');
            tdId.appendChild(document.createTextNode(v.id));
            tdMarca.appendChild(document.createTextNode(v.marca));
            tdModelo.appendChild(document.createTextNode(v.modelo));
            tdPrecio.appendChild(document.createTextNode(v.precio));
            btnAccion.appendChild(document.createTextNode('Eliminar'));
            btnAccion.addEventListener('click', function () { eliminar(i); });
            btnAccion.className = 'red';
            tdAccion.appendChild(btnAccion);
            tr.appendChild(tdId);
            tr.appendChild(tdMarca);
            tr.appendChild(tdModelo);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdAccion);
            tr.id = i.toString();
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        });
    }
}
function clearTable() {
    var tbody = $('tbody');
    while (tbody === null || tbody === void 0 ? void 0 : tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }
}
//--common
function clearForm() {
    $('txtMarca').value = '';
    $('txtModelo').value = '';
    $('txtPrecio').value = '';
    $('slForm').value = 'Camioneta';
    hide($('screenLock'));
}
function show(element) {
    if (element)
        element.className = 'visible';
}
function hide(element) {
    if (element)
        element.className = 'invisible';
}
function $(id) {
    return document.getElementById(id);
}
