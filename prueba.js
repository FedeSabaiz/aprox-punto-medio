// Prueba
const readline = require('readline');
var stdInput = process.stdin;
stdInput.setEncoding('utf-8');

//Definimos las variables que utilizaremos
let limiteSuperior = 0;
let limiteInferior = 0;
let error = 0;
let objetivo = 0;
let result = 0;
let iteraciones = 0;

//Interface para valores proporcionados por el usuario.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
process.stdout.write("\nBienvenid@ \n\n");
process.stdout.write("Por favor imgresa los valores que se te piden a continuación. \n\n");

// Capturando las entradas de usuario
const limSup = () => {
    return new Promise((resolve, reject) => {
        rl.question('Límite superior\n', (input) => {
            limiteSuperior = parseInt(input);
            resolve();
        });
    })
}

const limInf = () => {
    return new Promise((resolve, reject) => {
        rl.question('\nLímite inferior\n', (input) => {
            limiteInferior = parseInt(input)
            resolve();
        });
    })
}

const obj = () => {
    return new Promise((resolve, reject) => {
        rl.question('\nObjetivo\n', (input) => {
            objetivo = parseFloat(input).toFixed(2);
            resolve();
        });
    })
}

const errRango = () => {
    return new Promise((resolve, reject) => {
        rl.question('\nError\n', (input) => {
            error = parseFloat(input).toFixed(2);
            resolve();
        });
    })
}

// Función para calcular aproximación del punto medio.

const aproxPunMed = () => {
    for(let i = 0 ; i <= objetivo; i++) {
        result = (limiteSuperior + limiteInferior) / 2;
        if (result === objetivo) {
            console.log("\nNúmero de iteraciones realizadas para llegar al resultado:",iteraciones);
            console.log("\nEl resultado es:",result);
            break;
        }
        if (result <= (objetivo + error) && result >= objetivo || result >= (objetivo - error) && result <= objetivo) {
            result = parseFloat(result.toFixed(2));
            console.log("\nNúmero de iteraciones realizadas para llegar al resultado:",iteraciones);
            console.log("\nEl resultado es:",result);
            break;
        }
        if (result > objetivo) {
            limiteSuperior = result;
        } else if(result < objetivo) {
            limiteInferior = result;
        }
        iteraciones++;
    }
}

//Se ejecutan de manera asíncrona porque las respuestas las esperamos del usuario. 
const main = async() => {
    await limSup();
    await limInf();
    await obj();
    await errRango();
    await aproxPunMed();
    rl.close();
}

main();
