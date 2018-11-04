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
  for(let i = 0; i < n; i++){
    penSum += parseInt(empresas[i].a/empresas[i].b);
  }
    m = penSum/n; 
    rec = Math.ceil(m / query);
    return rec; 
}

emp = [{a:12, b:4},{a:290, b:1},{a:2, b:10},{a:9, b:7},{a:123, b:1}];


var query = 120;
console.log(recomendacion(emp, 5, query));