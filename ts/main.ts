window.addEventListener('load', () => {
  fillTable();

  $('btnShow')?.addEventListener('click', showForm);
  $('btnAgregar')?.addEventListener('click', agregar);
  $('btnCerrar')?.addEventListener('click', clearForm);
  $('btnCerrarX')?.addEventListener('click', clearForm);
  $('slVehiculo')?.addEventListener('change', refresh)
  $('promedio')?.addEventListener('click', sacarPromedio);
});

function sacarPromedio(){
  let vehiculos = localStorage.getItem('vehiculos');

  if(vehiculos){
    let vehiculosAmostrar = ($('slVehiculo') as HTMLSelectElement).value; 
    let arrayVehiculos: Array<any> = JSON.parse(vehiculos).filter((v: any) => (v.tipo == vehiculosAmostrar || vehiculosAmostrar == 'Todo'));
    let suma: number = 0;
    let promedio: number = 0;

    if(arrayVehiculos.length > 0) {

      suma = arrayVehiculos.reduce((prev: number, current: any) => {
        return prev += Number(current.precio);
      }, 0);
      promedio = suma / arrayVehiculos.length
    }
    

    ($('lblPromedio') as HTMLLabelElement).textContent = (promedio).toString();
  }
}

function refresh(){
  clearTable();
  fillTable();
}

function showForm(){
  show($('screenLock'));
}

function agregar(e: MouseEvent){
  e.preventDefault();

  let data = {
    marca: ($('txtMarca') as HTMLInputElement).value,
    modelo: ($('txtModelo') as HTMLInputElement).value,
    precio: ($('txtPrecio') as HTMLInputElement).value,
    tipo: ($('slForm') as HTMLSelectElement).value
  }

  save(data);
}

function eliminar(id: number){
  let vehiculos = localStorage.getItem('vehiculos');

  if(vehiculos){
    let arrayVehiculos: Array<any> = JSON.parse(vehiculos);

    arrayVehiculos.splice(id, 1);
    localStorage.setItem('vehiculos', JSON.stringify(arrayVehiculos));

    refresh();
  }
}

function save(obj: any){
  let vehiculos = localStorage.getItem('vehiculos');
  let arrayVehiculos = [];
  let id: number = 0;

  if(vehiculos){
    arrayVehiculos = JSON.parse(vehiculos);
    id = arrayVehiculos.reduce((prev: number, current: any) => {
      return prev < current.id
    }, 0);
  }

  obj.id = id + 1;
  arrayVehiculos.push(obj);
  localStorage.setItem('vehiculos', JSON.stringify(arrayVehiculos));

  refresh();
  clearForm();
}

function fillTable(){
  let vehiculos = localStorage.getItem('vehiculos');

  if(vehiculos){
    let vehiculosAmostrar = ($('slVehiculo') as HTMLSelectElement).value; 
    let arrayVehiculos: Array<any> = JSON.parse(vehiculos).filter((v: any) => (v.tipo == vehiculosAmostrar || vehiculosAmostrar == 'Todo'));

    arrayVehiculos.forEach((v, i) => {
      let tbody = $('tbody');
      let tr = document.createElement('tr');
      let tdId = document.createElement('td');
      let tdMarca = document.createElement('td');
      let tdModelo = document.createElement('td');
      let tdPrecio = document.createElement('td');
      let tdAccion = document.createElement('td');
      let btnAccion = document.createElement('button');

      tdId.appendChild(document.createTextNode(v.id));
      tdMarca.appendChild(document.createTextNode(v.marca));
      tdModelo.appendChild(document.createTextNode(v.modelo));
      tdPrecio.appendChild(document.createTextNode(v.precio));

      btnAccion.appendChild(document.createTextNode('Eliminar'));
      btnAccion.addEventListener('click', () => {eliminar(i)});
      btnAccion.className = 'red';
      tdAccion.appendChild(btnAccion);

      tr.appendChild(tdId);
      tr.appendChild(tdMarca);
      tr.appendChild(tdModelo);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdAccion);
      tr.id= i.toString();

      tbody?.appendChild(tr);
    })
  }

}

function clearTable(){
  let tbody = $('tbody');
  while (tbody?.firstChild) {
    tbody.removeChild((tbody.lastChild as Node));
  }
}

//--common

function clearForm(){
  ($('txtMarca') as HTMLInputElement).value = '';
  ($('txtModelo') as HTMLInputElement).value = '';
  ($('txtPrecio') as HTMLInputElement).value = '';
  ($('slForm') as HTMLSelectElement).value = 'Camioneta';

  hide($('screenLock'));
}

function show(element?: HTMLElement | null){
  if(element)
    element.className = 'visible';
}

function hide(element?: HTMLElement | null){
  if(element)
    element.className = 'invisible';
}

function $(id: string) {
  return document.getElementById(id);
}