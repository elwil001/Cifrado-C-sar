import { cipher } from './cipher.js';
import { muro } from './muro.js';

window.cipher = cipher;
window.muro = muro;

//Elementos de DOM
const botonCif = document.getElementById('boton-cifrar')
const botonBorDescif = document.getElementById('borrar-nocifrado')
const botonResCif = document.getElementById('resetear-nocifrado')
const botonDescif = document.getElementById('boton-descifrar')
const botonBorCif = document.getElementById('borrar-cifrado')
const botonResDescif = document.getElementById('resetear-cifrado')
const offset = document.querySelector('select')
const inputNoCif = document.getElementById('nocifrado')
const inputCif = document.getElementById('cifrado')
const archMens = document.getElementById('archivar-mensaje')
window.cipher.currOffset = parseInt(offset.value)

//Event Listener Functions
function mostrarMuro(){
  let mensDiv;
  const todosMensajes = window.muro.map((mens) => {
    mensDiv = document.createElement("div")
    const mensContP = document.createElement("P")
    const mensCont = document.createTextNode(`Mensaje: ${mens.mensaje}`)
    mensContP.appendChild(mensCont)
    mensDiv.appendChild(mensContP)
    const mensOffsetP = document.createElement("P")
    const mensOffset = document.createTextNode(`Offset: ${mens.offset}`)
    mensOffsetP.appendChild(mensOffset)
    mensDiv.appendChild(mensOffsetP)
    document.getElementById('muro-mensajes').appendChild(mensDiv)
  })
  const lsData = localStorage.getItem('Mensajes')
  if(lsData){
    const lsDataArray = JSON.parse(lsData)
    const lsDataDiv = document.createElement("div")
    const lsDataContP = document.createElement("P")
    const lsDataCont = document.createTextNode(`Mensaje: ${lsDataArray.mensaje}`)
    lsDataContP.appendChild(lsDataCont)
    lsDataDiv.appendChild(lsDataContP)
    const lsDataOffsetP = document.createElement("P")
    const lsDataOffset = document.createTextNode(`Offset: ${lsDataArray.offset}`)
    lsDataOffsetP.appendChild(lsDataOffset)
    lsDataDiv.appendChild(lsDataOffsetP)
    document.getElementById('muro-mensajes').appendChild(lsDataDiv)
  } else{
    return
  }
}

function actualizarMuro(){
  const nuevoItem = window.muro.slice(-1)
  const nuevoDiv = document.createElement("div")
  const nuevoP = document.createElement("P")
  const nuevoCont = document.createTextNode(`Mensaje: ${nuevoItem[0].mensaje}`)
  nuevoP.appendChild(nuevoCont)
  nuevoDiv.appendChild(nuevoP)
  const nuevOffsetP = document.createElement("P")
  const nuevOffset = document.createTextNode(`Offset: ${nuevoItem[0].offset}`)
  nuevOffsetP.appendChild(nuevOffset)
  nuevoDiv.appendChild(nuevOffsetP)
  document.getElementById('muro-mensajes').appendChild(nuevoDiv)
}

function borrNoCif(){
  inputNoCif.value = ''
}

function borrNoCifError(){
  const noCifError = document.getElementById("error-nocifrado")
  if(noCifError.innerHTML != ""){
    noCifError.innerHTML = ""
  } else{
    return
  }
}

function resetCif(){
  offset.value = '1';
  inputNoCif.value = '';
  document.getElementById('resulto-cif').style.display = 'none'
  botonBorDescif.removeAttribute('disabled')
  botonCif.removeAttribute('disabled')
}

function borrCif(){
  inputCif.value = ''
}

function borrCifError(){
  const cifError = document.getElementById("error-cifrado")
  if(cifError.innerHTML != ""){
    cifError.innerHTML = ""
  } else{
    return
  }
}

function resetDescif(){
  offset.value = '1';
  inputCif.value = '';
  document.getElementById('resulto-descif').style.display = 'none';
  botonBorCif.removeAttribute('disabled');
  botonDescif.removeAttribute('disabled');
}

function cifrarMens(e){
  const textoNoCif = inputNoCif.value.toUpperCase();
  const offsetAct = parseInt(offset.value)
  window.cipher.encode(offsetAct, textoNoCif)
}

function descifrarMens(e){
  const textoCif = inputCif.value.toUpperCase();
  const offsetAct = parseInt(offset.value)
  window.cipher.decode(offsetAct, textoCif)
}

function archivarMens(){
  const nuevMensTexto = document.getElementById('mensaje-cifrado').innerHTML
  const nuevOffset = parseInt(offset.value)
  const nuevoMens = {
    mensaje: nuevMensTexto,
    offset: nuevOffset
  }
  window.muro.push(nuevoMens)
  localStorage.setItem('Mensajes', JSON.stringify(nuevoMens))
  actualizarMuro()
}

//Event Listeners
document.body.onload = mostrarMuro;
archMens.addEventListener('click', archivarMens)
botonCif.addEventListener('click', cifrarMens)
botonBorDescif.addEventListener('click', borrNoCif)
botonResCif.addEventListener('click', resetCif)
botonBorCif.addEventListener('click', borrCif)
botonResDescif.addEventListener('click', resetDescif)
botonDescif.addEventListener('click', descifrarMens)
inputCif.addEventListener('input', borrCifError)
inputNoCif.addEventListener('input', borrNoCifError)
