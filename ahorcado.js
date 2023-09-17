const poniendoPalabra = document.getElementById("poniendo_la_palabra")
const letrasCartel = document.getElementById("letras-ausentes");
const oportunidadesCartel = document.getElementById("oportunidades");
const textoInstrucciones = document.getElementById("texto-de-las-instrucciones");
const cuerpoHombre = document.getElementById("hombre");

const laCara = document.getElementById("cara");
const laCabeza = document.getElementById("cabeza");
const elTorso = document.getElementById("torso");
const brazoDerecho = document.getElementById("brazo-derecho");
const brazoIzquierdo = document.getElementById("brazo-izquierdo");
const piernaDerecha = document.getElementById("pierna-derecha");
const piernaIzquierda = document.getElementById("pierna-izquierda");

let miembros = [
    elTorso,
    piernaIzquierda,
    piernaDerecha,
    brazoIzquierdo,
    brazoDerecho,
    laCabeza,
    laCara
]
let miembrosCount = 0;
let palabras = [
    "papa", "lechuga", "locura", "genio", "canguro", "hipnosis", "hinojo",
    "bandolero", "madrasta", "melificar", "abalorio", "trampantojo", "esclerosis", "sisa",
    "iconoclasta", "vermiforme", "fiambre", "recto", "dos", "trepidar", "implotar",
    "apechugar", "consustancial", "candelabro", "rumiar", "leer", "virgo", "impostura",
    "imbuir", "silogismo", "candela", "frisar", "ego", "efervescencia", "eludir",
    "trepanar", "impedimento", "zanahoria", "pluma", "crema", "languidecer", "yacente",
    "acento", "espacio", "candil", "oportuno", "rana", "remo", "rascar",
    "inusitado"
];
let oportunidades = 7;
let empezar = false;
let palabraAhora = "";
let letraX = 1;
let subrayadoX = 1;
let letrasyapuestas = [];
let cantidadletraspuestas = 0;
let letraAhora = '';
let posicionLetra = [];
let letrasAusentes = "";
let intervalId;

const seHaceClick = () => {
    document.getElementById('button').style.display = 'none';
    document.getElementById("instrucciones").style.display = 'block';
    empezar = true;
    palabraAhora = randomWord();

    let htmlMarkup = `<div class="subrayado" style="grid-area: ${1}/ ${subrayadoX}"></div>`;
        for(let i = 0; i < palabraAhora.length - 1; i++) {
            subrayadoX++;
            htmlMarkup += `<div class="subrayado" style="grid-area: ${1}/ ${subrayadoX}"></div>`;
        }
    poniendoPalabra.innerHTML = htmlMarkup;
    Init();
}

const posicionLetraEnPalabra = (palabra, letra) => {
    let array = [];
    let posicionReal = 0;
    for (let i in palabra) {
        if (palabra[i] == letra) {
            posicionReal = i;
            posicionReal++;
            array.push(posicionReal);
        }
    }
    return array;
}

const letraPresionada = (e) => {
    letraAhora = e.key;
    Init();
}

const randomWord = () => {
    let num = Math.floor(Math.random() * 50);
    return palabras[num];
}

const calculaErrores = (oportunidades) => {
    return (7 - oportunidades);
}

const YouWin = () => {
    clearInterval(intervalId);
    alert("Has ganado! La palabra es: " + palabraAhora + ". Cometiste " + calculaErrores(oportunidades) + " errores.");
    location.reload();
}

const GameOver = () => {
    clearInterval(intervalId);
    alert("Has perdido! La palabra es: " + palabraAhora + ". Suerte para la próxima.");
    location.reload();
}

const Init = () => {    
    if (empezar) {
        if(palabraAhora.indexOf(letraAhora) === -1 && letrasAusentes.indexOf(letraAhora) === -1) {
                letrasAusentes += letraAhora + ", ";
                letrasCartel.innerHTML = `${letrasAusentes}`;
                oportunidades--;
                oportunidadesCartel.innerHTML = `${oportunidades}`;
                letraAhora = '';
                miembros[miembrosCount].style.display = 'inline';
                miembrosCount++;
        } else if (palabraAhora.indexOf(letraAhora) !== -1 && letraAhora != '' && letrasyapuestas.indexOf(letraAhora) === -1) {

            posicionLetra = posicionLetraEnPalabra(palabraAhora, letraAhora);            
            cantidadletraspuestas += posicionLetra.length;
            letrasyapuestas.push(letraAhora);

            let letrasQueEstoyPoniendo = `<p class="letras" id="letras" style="grid-area: ${1} / ${posicionLetra[0]}">${letraAhora}</p>`;
            if (posicionLetra.length > 1) {
                for (let i = 1; i < posicionLetra.length; i++) {
                    letrasQueEstoyPoniendo += `<p class="letras" id="letras" style="grid-area: ${1} / ${posicionLetra[i]}">${letraAhora}</p>`;
                }
            }
            poniendoPalabra.innerHTML += letrasQueEstoyPoniendo;
        }

        if(cantidadletraspuestas == subrayadoX){
            textoInstrucciones.innerHTML = `Bien hecho! Eres todo un <em>crack</em>.`;
            intervalId = setInterval(() => {
                YouWin();
            }, 1300); 
        } else if (oportunidades == 3) {
            textoInstrucciones.innerHTML = `Ummm... te asusta morir?`
        } else if (oportunidades == 2) {
            textoInstrucciones.innerHTML = `Ups! Mala suerte. Inténtalo de nuevo, casi ahorcado.`
        } else if (oportunidades == 1) {
            textoInstrucciones.innerHTML = `Cuidado: solo te queda <strong>1</strong> oportunidad! Buajajajajaja.`;
        } else if (oportunidades == 0) {
            empezar = false;
            textoInstrucciones.innerHTML = `Ahorcado!`
            intervalId = setInterval(() => {
                GameOver();
            }, 1200); 
        }
    }
};

addEventListener("keydown", letraPresionada);
