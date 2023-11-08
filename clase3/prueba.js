let valor = 2 ** 4;

const frutas = ["Pera", "Manzana", "Durazno"];

//console.log("Existe Anana", frutas.includes("Anana"));

/* const obEntries = Object.entries(usuario); */ //trae un array con los keys y datos del objeto
/* const obKeys = Object.keys(usuario); */ // trae un array con los keys del objeto
/* const obValues = Object.values(usuarios); */ //trae un array con los datos del objeto

const valores = [10, 30, 40];
const suma = valores.reduce(function (a, b) {
  return a + b;
});
console.log(suma);
