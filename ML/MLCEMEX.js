class Empresa {
  constructor (facturasGeneradasporDia, cadaCuantosDiasBajaFacturas){
    this.facturasGeneradasporDia = 0;
    this.cadaCuantosDiasBajaFacturas = 0;
  }

}

fuction recomendacion (empresas, var n, var query){
  var rec;
  if ( query === 0) return 0;
  var m = 1;
  var penSum = 0;
  
  for(var i = 0; i < n; i++){
    penSum += empresas[i].facturasGeneradasPorDia / empresas[i].cadaCuantosDiasBajaFacturas;
  }
    m = penSum/n; 
    rec = Math.ceil(m / query);
    return rec; 
}

var uno = new Empresa(12,4);
var dos = new Empresa(290,1);
var tres = new Empresa(2,10);
var cuatro = new Empresa(9.7);
var cinco = new Empresa(123,1);

Empresa emp[5] = [uno,dos,tres,cuatro,cinco];

n = 4;
var query = 0;

console.log("Dame tu query");
var response = readline();

console.log(recomendacion(emp,n,query));