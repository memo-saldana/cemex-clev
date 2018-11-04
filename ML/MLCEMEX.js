class Empresa {
  constructor (a, b){
    this.facturasGeneradasporDia = a;
    this.cadaCuantosDiasBajaFacturas = b;
  }

}

function recomendacion (empresas, n, query){
  let rec;
  if ( query === 0) return 0;
  let m = 1;
  let penSum = 0;
  console.log(penSum)
  //console.log(empresas[0]);
  for(let i = 0; i < n; i++){
    console.log(empresas[i].a)
    penSum += parseInt(empresas[i].a/empresas[i].b);
    console.log(i+1 + " " + parseInt(empresas[i].a/empresas[i].b));
    console.log(penSum);
  }
    m = penSum/n; 
    console.log(m);
    rec = Math.ceil(m / query);
    return rec; 
}

emp = [{a:12, b:4},{a:290, b:1},{a:2, b:10},{a:9, b:7},{a:123, b:1}];


var query = 120;
console.log("Dame tu query");
//var query = prompt("asdfsdf");

console.log(recomendacion(emp, 5, query));