const terminal = document.getElementById('terminal');
const audioRegalo = document.getElementById('audio-regalo');
const audioMomo = document.getElementById('audio-momo');

// Fase de inicio
const textoInicio = [
    "Microsoft Windows [Versión 10.0.19045.3803]",
    "(c) Microsoft Corporation. Todos los derechos reservados.",
    "",
    "C:\\Users\\Gonzalo> iniciando_protocolo_cumpleaños.exe",
    "Estableciendo conexión segura... [OK]",
    "Evadiendo cortafuegos... [OK]",
    "Cargando sorpresas...",
    "{BARRA}"
];

let lineaActual = 0;

function escribirBoot() {
    if (lineaActual < textoInicio.length) {
        const linea = textoInicio[lineaActual];

        if (linea === "{BARRA}") {
            lineaActual++;
            animarBarra();
            return; 
        }

        terminal.innerHTML += linea + "<br>";
        lineaActual++;
        window.scrollTo(0, document.body.scrollHeight);
        
        let tiempoEspera = Math.floor(Math.random() * 400) + 100;
        if (textoInicio[lineaActual - 1] === "") tiempoEspera = 100;
        
        setTimeout(escribirBoot, tiempoEspera);
    }
}

function animarBarra() {
    // Generamos un ID único para la barra en caso de que se repita el bucle
    const barraId = "barra-progreso-" + Math.random().toString(36).substr(2, 9);
    terminal.innerHTML += `<span id="${barraId}">[                    ] 0%</span><br>`;
    const spanBarra = document.getElementById(barraId);
    
    let progreso = 0;
    const intervalo = setInterval(() => {
        progreso += 5; 
        if (progreso > 100) progreso = 100;
        
        const bloques = "█".repeat(Math.floor(progreso / 5));
        const espacios = " ".repeat(20 - Math.floor(progreso / 5));
        
        spanBarra.innerText = `[${bloques}${espacios}] ${progreso}%`;
        
        if (progreso >= 100) {
            clearInterval(intervalo);
            setTimeout(mostrarBotonesPrincipales, 600);
        }
    }, 70); // Velocidad de la barra
}

function detenerAudios() {
    audioRegalo.pause();
    audioRegalo.currentTime = 0;
    audioMomo.pause();
    audioMomo.currentTime = 0;
}

// Despliega las opciones interactivas
function mostrarBotonesPrincipales() {
    terminal.innerHTML += `<br><span style="color: #fff;">C:\\Users\\Gonzalo> SE REQUIERE INPUT DEL USUARIO:</span><br>`;
    terminal.innerHTML += `
        <button class="cmd-btn" id="btn-1" onclick="ejecutarOpcion(1)">> Deseas tomar algo energetico?</button><br>
        <button class="cmd-btn" id="btn-2" onclick="ejecutarOpcion(2)">> anashe?</button><br>
    `;
    window.scrollTo(0, document.body.scrollHeight);
}

// Ejecuta la opción seleccionada
window.ejecutarOpcion = function(opcion) {
    // Desactivamos los botones
    document.getElementById('btn-1').disabled = true;
    document.getElementById('btn-2').disabled = true;

    if (opcion === 1) {
        terminal.innerHTML += `<br>C:\\Users\\Gonzalo> ejecutando bebida_energetica.exe<br>`;
        terminal.innerHTML += `Autorización recibida. Desencriptando archivos... [OK]<br><br>`;
        terminal.innerHTML += `<span class="mensaje-grande">¡FELIZ CUMPLEAÑOS GONZALO!</span><br>`;
        terminal.innerHTML += `<span class="mensaje-grande">BAMO A TOMAR ALGO ENERGETICO</span><br>`;
        terminal.innerHTML += `<img src="sorpresa.jpg" class="imagen-regalo" alt="Regalo"><br>`;
        audioRegalo.play().catch(e => console.log(e));
        
    } else if (opcion === 2) {
        terminal.innerHTML += `<br>C:\\Users\\Gonzalo> ejecutando anashe.bat<br>`;
        terminal.innerHTML += `<span class="mensaje-grande">mira como lo dejaste al momo</span><br>`;
        terminal.innerHTML += `<img src="momo.jpg" class="imagen-regalo" alt="Momo"><br>`;
        audioMomo.play().catch(e => console.log(e));
        terminal.innerHTML += `<span class="mensaje-grande">Te deseo un muy feliz cumple primo querido</span><br>`;
    }

    window.scrollTo(0, document.body.scrollHeight);
    
    // Esperamos 3 segundos antes de mostrar el botón de repetir
    setTimeout(mostrarBotonRepetir, 3000);
};

// Muestra el botón para reiniciar
function mostrarBotonRepetir() {
    terminal.innerHTML += `<span class="mensaje-grande">reinicia el bucle con este boton</span><br>`;
    terminal.innerHTML += `<button class="cmd-btn" onclick="limpiarYRepetir()">> cls && reiniciar_bucle</button><br><br>`;
    window.scrollTo(0, document.body.scrollHeight);
}

// Borra todo y vuelve a empezar
window.limpiarYRepetir = function() {
    detenerAudios(); 
    
    // Limpiamos la pantalla, pero dejamos el comando ejecutado para dar realismo
    terminal.innerHTML = `C:\\Users\\Gonzalo> cls<br>C:\\Users\\Gonzalo> reiniciar_bucle<br><br>`;
    
    // Reiniciamos el contador de líneas a 0
    lineaActual = 0;
    
    // Volvemos a ejecutar la función de inicio
    setTimeout(escribirBoot, 800);
};

// Arranca el programa al abrir la página
setTimeout(escribirBoot, 800);