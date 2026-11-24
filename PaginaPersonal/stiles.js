
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

// PALETAS DE COLORES
const paletas = [
  {
    fondo1: "#29245b",
    fondo2: "#176b79",
    colores: ["#9360dc", "#55c1c9", "#f0a77f",
              "#f5e7c8", "#f26d91", "#a9e5d7"]
  },
  {
    fondo1: "#351b51",
    fondo2: "#a14e78",
    colores: ["#f5c45e", "#f28c72", "#8bd3dd",
              "#e7d7ff", "#91b87b", "#fff1df"]
  }
];

let animalActual = "perro";
let paletaActual = 0;
let variacion = 0;

// DIBUJAR CÍRCULOS
function circulo(x, y, radio, color) {
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// DIBUJAR ELIPSES
function elipse(x, y, rx, ry, color, rotacion = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rotacion, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// DIBUJAR LÍNEAS
function linea(x1, y1, x2, y2, color, grosor = 5) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = grosor;
  ctx.lineCap = "round";
  ctx.stroke();
}

// DIBUJAR POLÍGONOS
function poligono(puntos, color) {
  ctx.beginPath();
  ctx.moveTo(puntos[0][0], puntos[0][1]);

  for (let i = 1; i < puntos.length; i++) {
    ctx.lineTo(puntos[i][0], puntos[i][1]);
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

// DIBUJAR PERRO
function dibujarPerro(c) {
  elipse(275, 270, 54, 91, c[2], -0.45);
  elipse(425, 270, 54, 91, c[2], 0.45);

  circulo(350, 315, 118, c[3]);
  elipse(350, 365, 75, 55, c[2]);

  circulo(310, 315, 11, "#20203a");
  circulo(390, 315, 11, "#20203a");

  elipse(350, 356, 20, 14, "#34243b");

  linea(350, 369, 350, 385, "#34243b", 5);

  ctx.beginPath();
  ctx.arc(350, 378, 22, 0.15, Math.PI - 0.15);
  ctx.strokeStyle = "#34243b";
  ctx.lineWidth = 4;
  ctx.stroke();
}

// DIBUJAR GATO
function dibujarGato(c) {
  poligono([[252, 270], [267, 155], [340, 230]], c[1]);
  poligono([[360, 230], [435, 155], [450, 270]], c[1]);

  circulo(350, 320, 120, c[3]);

  elipse(310, 320, 12, 19, "#24213b");
  elipse(390, 320, 12, 19, "#24213b");

  poligono([[350, 350], [337, 366], [363, 366]], c[4]);

  linea(337, 360, 285, 348, "#34243b", 3);
  linea(337, 370, 282, 378, "#34243b", 3);
  linea(363, 360, 415, 348, "#34243b", 3);
  linea(363, 370, 418, 378, "#34243b", 3);

  ctx.beginPath();
  ctx.arc(350, 365, 20, 0.1, Math.PI - 0.1);
  ctx.strokeStyle = "#34243b";
  ctx.lineWidth = 4;
  ctx.stroke();
}

// DIBUJAR CONEJO
function dibujarConejo(c) {
  elipse(300, 205, 38, 112, c[2], -0.18);
  elipse(400, 205, 38, 112, c[2], 0.18);

  elipse(300, 205, 17, 83, c[4], -0.18);
  elipse(400, 205, 17, 83, c[4], 0.18);

  circulo(350, 335, 112, c[3]);

  circulo(310, 325, 10, "#24213b");
  circulo(390, 325, 10, "#24213b");

  circulo(325, 370, 22, c[2]);
  circulo(375, 370, 22, c[2]);

  poligono([[350, 350], [337, 363], [363, 363]], "#9b5870");

  linea(350, 363, 350, 382, "#55374b", 3);

  elipse(350, 408, 17, 12, "#fff4e9");
}

// SELECCIONAR Y DIBUJAR ANIMAL
function dibujarAnimal(c) {
  ctx.save();

  if (animalActual === "perro") {
    dibujarPerro(c);
  } else if (animalActual === "gato") {
    dibujarGato(c);
  } else {
    dibujarConejo(c);
  }

  ctx.restore();
}

// OBTENER NOMBRE DEL ANIMAL
function nombreAnimal() {
  return animalActual.charAt(0).toUpperCase() +
         animalActual.slice(1);
}

// GENERAR COMPOSICIÓN
function generarComposicion() {
  const paleta = paletas[paletaActual];
  const c = paleta.colores;

  // Fondo degradado
  const fondo = ctx.createLinearGradient(0, 0, 700, 560);

  fondo.addColorStop(0, paleta.fondo1);
  fondo.addColorStop(1, paleta.fondo2);

  ctx.fillStyle = fondo;
  ctx.fillRect(0, 0, 700, 560);

  // Líneas decorativas
  for (let i = 0; i < 14; i++) {
    const x = i * 55 + 10;
    linea(x, 0, x - 90, 560, c[5] + "35", 2);
  }

  // Figuras geométricas aleatorias
  for (let i = 0; i < 32; i++) {
    const x = Math.random() * 700;
    const y = Math.random() * 560;
    const tam = Math.random() * 24 + 8;

    const color = c[
      Math.floor(Math.random() * c.length)
    ];

    if (i % 3 === 0) {
      circulo(x, y, tam, color);

    } else if (i % 3 === 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI);

      ctx.fillStyle = color;
      ctx.fillRect(-tam, -tam, tam * 2, tam * 2);

      ctx.restore();

    } else {
      poligono([
        [x, y - tam],
        [x + tam, y + tam],
        [x - tam, y + tam]
      ], color);
    }
  }

  // Fondo circular detrás del animal
  circulo(350, 315, 166, c[0] + "55");
  circulo(350, 315, 139, c[1] + "55");

  // Título del afiche
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  ctx.font = "bold 38px Arial";
  ctx.fillText(nombreAnimal().toUpperCase() + " ART", 350, 66);

  ctx.font = "15px Arial";
  ctx.fillText("GENERATIVE ANIMAL COLLECTION", 350, 94);

  // Dibujar animal
  dibujarAnimal(c);

  // Subtítulo
  ctx.font = "bold 17px Arial";
  ctx.fillText(
    "CREATIVE CODE / " + nombreAnimal().toUpperCase(),
    350,
    515
  );

  ctx.textAlign = "start";

  variacion++;

  document.getElementById("estado").textContent =
    "Composición " + variacion +
    " · " + nombreAnimal() +
    " · Paleta " + (paletaActual + 1);
}

// SELECCIONAR ANIMAL
function seleccionarAnimal(animal) {
  animalActual = animal;

  document.querySelectorAll(".animal").forEach((boton) => {
    const activo = boton.dataset.animal === animal;

    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
  });

  generarComposicion();
}

document.querySelectorAll(".animal").forEach((boton) => {
  boton.addEventListener("click", () => {
    seleccionarAnimal(boton.dataset.animal);
  });
});

// CAMBIAR PALETA 1
document.getElementById("paleta1").addEventListener("click", () => {
  paletaActual = 0;
  actualizarPaletas();
  generarComposicion();
});

// CAMBIAR PALETA 2
document.getElementById("paleta2").addEventListener("click", () => {
  paletaActual = 1;
  actualizarPaletas();
  generarComposicion();
});

// ACTUALIZAR BOTONES DE PALETAS
function actualizarPaletas() {
  document.getElementById("paleta1")
    .classList.toggle("activo", paletaActual === 0);

  document.getElementById("paleta2")
    .classList.toggle("activo", paletaActual === 1);

  document.getElementById("paleta1")
    .setAttribute("aria-pressed", String(paletaActual === 0));

  document.getElementById("paleta2")
    .setAttribute("aria-pressed", String(paletaActual === 1));
}

// GENERAR NUEVA COMPOSICIÓN
document.getElementById("generar").addEventListener("click", () => {
  generarComposicion();
});

// GUARDAR IMAGEN PNG
document.getElementById("guardar").addEventListener("click", () => {
  const enlace = document.createElement("a");

  enlace.download = nombreAnimal().toLowerCase() +
                    "-generative-art.png";

  enlace.href = canvas.toDataURL("image/png");

  enlace.click();
});

// GENERAR ARTE AL ABRIR LA PÁGINA
generarComposicion();
