//initialize datepicker
$(document).ready(function() {
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
  });
});
//Prevent Enter key from submitting complete form
document.getElementById("chatform").onkeypress = function(e) {
  var key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
}
//Grab elements from DOM
var log = document.getElementById('log');

var fieldNombre = document.getElementById('nombre');
var fieldApellido = document.getElementById('apellido');
var fieldMovil_num = document.getElementById('movil_num');
var fieldId_user = document.getElementById('id_user');
var fieldActual = document.getElementById('actual');
var fieldPasado = document.getElementById('pasado');
var fieldTrabajo_cia = document.getElementById('trabajo_cia');
var fieldTrabajo_periodo_fin = document.getElementById('trabajo_periodo_fin');
var fieldTrabajo_puesto = document.getElementById('trabajo_puesto');
var fieldTrabajo_func = document.getElementById('trabajo_func');
var fieldChingon = document.getElementById('chingon');


var sendNombre = document.getElementById('sendNombre');
var sendApellido = document.getElementById('sendApellido');
var sendMovil_num = document.getElementById('sendMovil_num');
var sendId_user = document.getElementById('sendId_user');
var sendTrabajo_cia = document.getElementById('sendTrabajo_cia');
var sendTrabajo_periodo_fin = document.getElementById('sendTrabajo_periodo_fin');
var sendTrabajo_puesto = document.getElementById('sendTrabajo_puesto');
var sendTrabajo_func = document.getElementById('sendTrabajo_func');
var sendChingon = document.getElementById('sendChingon');
//Scroll to bottom of log when posting new messages
function gotoBottom() {
  log.scrollTop = log.scrollHeight;
}
//Display a message sent by user
function displayUserMessage(message) {
  var messageNode = document.createTextNode(message);
  var userMessageDiv = document.createElement("div");
  userMessageDiv.classList.add('user-msg', 'animated', 'fadeIn');
  userMessageDiv.appendChild(messageNode);
  log.appendChild(userMessageDiv);
  gotoBottom(log);
}
//Display a message sent by bot
function displayBotMessage(message) {
  var messageNode = document.createTextNode(message);
  var botMessageDiv = document.createElement("div");
  botMessageDiv.classList.add('bot-msg', 'animated', 'fadeIn', 'delayed');
  botMessageDiv.appendChild(messageNode);
  log.appendChild(botMessageDiv);
  gotoBottom(log);
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
//welcome message
displayBotMessage("¡Hola! Yo te puedo ayudar a crear un perfil. Antes que nada ¿Cuál es tu primer nombre?");
var trabajando = null;
//message flow
function sendUserMessage(q) {
  if (q == 'nombre') {
    if (fieldNombre.value != "") {
      displayUserMessage(fieldNombre.value);
      displayBotMessage("¿Y cuál es tu apellido?");
      fieldNombre.classList.add('hide-element');
      sendNombre.classList.add('hide-element');
      fieldApellido.classList.add('show-element');
      sendApellido.classList.add('show-element');
    }
  } else if (q == 'apellido') {
    if (fieldApellido.value != "") {
      displayUserMessage(fieldApellido.value);
      displayBotMessage("En caso de inmediatamente tener una vacante para ti, ¿a qué número nos podríamos comunicar? Por favor no incluyas guiones ni espacios; tampoco incluyas clave de marcación internacional.");
      fieldApellido.classList.remove('show-element');
      sendApellido.classList.remove('show-element');
      fieldMovil_num.classList.add('show-element');
      sendMovil_num.classList.add('show-element');
    }
  } else if (q == 'movil_num') {
    var cleanPhone = fieldMovil_num.value.replace(/[^0-9]/ig, "");
    console.log(cleanPhone);
    if (cleanPhone.length > 8 && cleanPhone.length < 11) {
      displayUserMessage(fieldMovil_num.value);
      displayBotMessage("Tenemos que mandarte información importante ¿cuál es tu correo electrónico?");
      fieldMovil_num.classList.remove('show-element');
      sendMovil_num.classList.remove('show-element');
      fieldId_user.classList.add('show-element');
      sendId_user.classList.add('show-element');
    } else {
      displayUserMessage(fieldMovil_num.value)
      displayBotMessage('Por favor utiliza un número telefónico válido');
    }
    fieldMovil_num.value = cleanPhone;
  } else if (q == 'id_user') {
    if (validateEmail(fieldId_user.value)) {
      displayUserMessage(fieldId_user.value);
      displayBotMessage("¿Actualmente trabajas?");
      fieldId_user.classList.remove('show-element');
      sendId_user.classList.remove('show-element');
      fieldActual.classList.add('show-element', 'fadeIn', 'delayed');
    } else {
      displayUserMessage(fieldId_user.value)
      displayBotMessage('Por favor utiliza un correo electrónico válido');
    }
  } else if (q == 'actualSi') {
    displayUserMessage("sí");
    displayBotMessage('¿En qué compañía?');
    trabajando = true;
    fieldActual.classList.remove('show-element');
    fieldTrabajo_cia.classList.add('show-element');
    sendTrabajo_cia.classList.add('show-element');
  } else if (q == 'actualNo') {
    displayUserMessage("no");
    trabajando = false;
    displayBotMessage("¿Has trabajado antes?")
    fieldActual.classList.remove('show-element');
    fieldPasado.classList.add('show-element');
  } else if (q == 'pasadoSi') {
    displayUserMessage("sí");
    displayBotMessage("¿Cuál fue la última compañía para la que trabajaste?")
    fieldPasado.classList.remove('show-element');
    fieldTrabajo_cia.classList.add('show-element');
    sendTrabajo_cia.classList.add('show-element');
  } else if (q == 'pasadoNo') {
    displayUserMessage("no");
    displayBotMessage("¡Gracias por tu interés! en breve nos comunicaremos contigo para completar tu perfil y encontrar la mejor opción de trabajo para ti.")
    fieldPasado.classList.remove('show-element');
  } else if (q == 'trabajo_cia') {
    displayUserMessage(fieldTrabajo_cia.value);
    if (trabajando == true) {
      displayBotMessage("¿Cómo se llama tu puesto?");
      fieldTrabajo_cia.classList.remove('show-element');
      sendTrabajo_cia.classList.remove('show-element');
      fieldTrabajo_puesto.classList.add('show-element');
      sendTrabajo_puesto.classList.add('show-element');
    } else if (trabajando == false) {
      displayBotMessage("¿En qué fecha saliste de ese trabajo?");
      fieldTrabajo_cia.classList.remove('show-element');
      sendTrabajo_cia.classList.remove('show-element');
      fieldTrabajo_periodo_fin.classList.add('show-element');
      sendTrabajo_periodo_fin.classList.add('show-element');
    }
  } else if (q == 'trabajo_periodo_fin') {
    displayUserMessage(fieldTrabajo_periodo_fin.value);
    displayBotMessage("¿Y cuál era el nombre de tu puesto allí?")
    fieldTrabajo_periodo_fin.classList.remove('show-element');
    sendTrabajo_periodo_fin.classList.remove('show-element');
    fieldTrabajo_puesto.classList.add('show-element');
    sendTrabajo_puesto.classList.add('show-element');
  } else if (q == 'trabajo_puesto') {
    displayUserMessage(fieldTrabajo_puesto.value);
    if (trabajando == true) {
      displayBotMessage("¿Cuáles son tus funciones allí?");
    } else if (trabajando == false) {
      displayBotMessage("¿Cuáles eran tus funciones allí?");
    }
    fieldTrabajo_puesto.classList.remove('show-element');
    sendTrabajo_puesto.classList.remove('show-element');
    fieldTrabajo_func.classList.add('show-element');
    sendTrabajo_func.classList.add('show-element');
  } else if (q == 'trabajo_func') {
    displayUserMessage(fieldTrabajo_func.value);
    displayBotMessage("Y por último: en tu vida laboral, ¿En qué te consideras más chingón?")
    fieldTrabajo_func.classList.remove('show-element');
    sendTrabajo_func.classList.remove('show-element');
    fieldChingon.classList.add('show-element');
    sendChingon.classList.add('show-element');
  } else if (q == 'chingon') {
    displayUserMessage(chingon.value);
    displayBotMessage("¡Muchas gracias por tu interés! Pronto nos comunicaremos contigo para completar tu perfil y encontrar el mejor trabajo para ti.")
    fieldChingon.classList.remove('show-element');
    sendChingon.classList.remove('show-element');
    updateJson();
  }
}
//json structure to send
var userJson = {
  "id_user": null,
  "datos_personales": {
    "nombre": null,
    "apellido": null,
    "movil": {
      "movil_num": null
    },
  },
  "datos_laborales": {
    "experiencia": [{
      "trabajo_cia": null,
      "trabajo_periodo": {
        "trabajo_periodo_fin": null
      },
      "trabajo_puesto": null,
      "trabajo_func": null
    }]
  },
  "educacion_y_habilidades": {
    "chingon": null
  }
}
//update final json with user data
function updateJson() {
  userJson.id_user = fieldId_user.value;
  userJson.datos_personales.nombre = fieldNombre.value;
  userJson.datos_personales.apellido = fieldApellido.value;
  userJson.datos_personales.movil.movil_num = fieldMovil_num.value;
  userJson.datos_laborales.experiencia[0].trabajo_cia = fieldTrabajo_cia.value;
  if (trabajando == false) {
    userJson.datos_laborales.experiencia[0].trabajo_periodo.trabajo_periodo_fin = fieldTrabajo_periodo_fin.value;
  }
  userJson.datos_laborales.experiencia[0].trabajo_puesto = fieldTrabajo_puesto.value;
  userJson.datos_laborales.experiencia[0].trabajo_func = fieldTrabajo_func.value;
  userJson.educacion_y_habilidades.chingon = fieldChingon.value;
  document.getElementById("userData").value = "";
}
