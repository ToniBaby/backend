const dividir = (dividendo, divisor) => {
  return new Promise((resolve, reject) => {
    if (divisor === 0) {
      reject("No se puede dividir por 0.");
    } else {
      resolve(dividendo / divisor);
    }
  });
};

const suma = async (numero1, numero2) => {
  return new Promise((resolve, reject) => {
    if (numero1 === 0 || numero2 === 0) {
      reject("Operacion innecesaria.");
    }
    if (numero1 + numero2 < 0) {
      reject("Debe devolver valor positivos.");
    }
    const total = numero1 + numero2;
    resolve(total);
  });
};

const resta = async (numero1, numero2) => {
  return new Promise((resolve, reject) => {
    if (numero1 === 0 || numero2 === 0) {
      reject("Operacion invalida.");
    }
    if (numero1 - numero2 < 0) {
      reject("La calculadora solo debe devolver valores positivos");
    }
    const total = numero1 - numero2;
    resolve(total);
  });
};
const multiplicar = async (numero1, numero2) => {
  return new Promise((resolve, reject) => {
    if (numero1 < 0 || numero2 < 0) {
      reject("Operacion invalida");
    }
    if (numero1 * numero2 < 0) {
      reject("La calculadora solo debe devolver valores positivos");
    }

    const total = numero1 * numero2;
    resolve(total);
  });
};

calculo = async (numero1, numero2, operacion) => {
  try {
    const resultado = await operacion(numero1, numero2);
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
};

calculo(2, 0, suma);
calculo(2, 1, resta);
calculo(2, 0, dividir);
calculo(2, 4, multiplicar);
