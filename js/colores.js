"use strict";
//Contador de aciertos o errores


//variables que llaman a selectores
const circles = document.querySelectorAll(".circle"); //variable que llame a la clase de los circulos
const codigoRgb = document.getElementById("valorRgb"); //variable para mostrar los 3 valores de RGB
const resultado = document.getElementById("resultado"); //variable que llama a los aciertos o errores
//const reiniciar = document.getElementById("reset");// variable que reincia el juego una vez que pierdas o ganes
const contadorAciertos = document.getElementById("acierto"); //variables que mostrara los aciertos
const contadorErrores = document.getElementById("error"); //variable que mostrara los errores

let aciertos = 0;
let errores = 0
console.log(errores);

/*const ul = document.querySelector("ul");
const acierto = document.querySelector(".aciertos");
const error = document.querySelector(".errores");*/

//Random logica
/*1. Random de numero 0-255(256) */
const randomNumberRGB = () => {//Cada parámetro (rojo, verde y azul) define la intensidad del color entre 0 y 255.
  return Math.floor(Math.random() * 256);
}
//console.log(randomNumberRGB());


/*2. Random de number 255 de red, green, blue  */
const randomColorRGB = () => {
  const RED = randomNumberRGB();
  const GREEN = randomNumberRGB();
  const BLUE = randomNumberRGB();

  return `RGB(${RED}, ${GREEN}, ${BLUE})`;//RGB(*, *, *)
}
console.log(randomColorRGB());

/*3.Random del valor cada color RGB-mostrara colores diferentes  */

const valorRandomColor = () => {
  let randomColores = randomColorRGB();
  if (randomColores === codigoRgb.textContent) {//textcontent
    randomColores = randomColorRGB();
  }
  return randomColores;
}
//console.log(valorRandomColor());

/*4. Pintar color a circulos */
const printCircle = () => {
  const colorsCircles = Math.floor(Math.random() * 3);
  for (let i = 0; i < circles.length; i++) {
    if (i === colorsCircles) {
      circles[i].style.backgroundColor = codigoRgb.textContent
    } else {
      circles[i].style.backgroundColor = valorRandomColor();
    }
  }
  //console.log(colorsCircles())
}
/*5. seleccionar color ganador y se realiza el contador de aciertos y errores*/
const pickColor = (e) => {
  const colorGanador = e.target; //devuelve el elemento DOM que desencadenó un evento específico, por lo que podemos recuperar cualquier propiedad/atributo que tenga un valor
  if (resultado.textContent === 'Ganaste') {
    alerta("cambia color");
  } else if (
    colorGanador.style.backgroundColor === codigoRgb.textContent.toLowerCase()
  ) {
    resultado.textContent = 'Ganaste';
    aciertos++;
    contadorAciertos.textContent = aciertos;
    //se agrega funcion de inicio de juego que da colores y valores nuevos
    startGame();
  } else {
    resultado.textContent = 'Incorrecto, prueba de nuevo';
    errores++;
    contadorErrores.textContent = errores;
    console.log(errores);
  if (errores === 3) {
      resultado.textContent = 'Lo siento, perdiste';//sepinta html
      //alert('perdiste');
      Swal.fire({
      icon: 'error',
      title: 'Oops...perdiste!',
      text: 'Intentalo de nuevo!',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
      '<div class="alert"  onClick="document.location.reload(true)">New Game</div>',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    })
    }
  }
}
const clickCircle = () => {//EVENTO CLICK SOBRE CIRCLE
  for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener('click', pickColor);
  }
}

const startGame = () => {
  if (aciertos === 3) {
    resultado.textContent = 'Ganaste!';//se pinta en html
    
    //alert("ganaste")
    Swal.fire({
      icon: 'success',
      title: 'Buen Trabajo!',
      text: 'Te reto una vez más!',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
      '<div class="alert" onClick="document.location.reload(true)">New Game</div>',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    })

  }
  codigoRgb.textContent = randomColorRGB().toUpperCase();
  clickCircle();
  printCircle();
  resultado.textContent = 'Elige un Color';
}
startGame();
