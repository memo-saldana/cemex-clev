const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./myKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clev-cemex-api.firebaseio.com"
});

var db = admin.firestore();

var express = require('express');
var app = express();
// var request = require('request');

// var json = {
// 	'invoices': [
// 	'<?xml version="1.0" encoding="utf-8"?><cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:implocal="http://www.sat.gob.mx/implocal" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Certificado="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" CondicionesDePago="CREDITO MXN" Fecha="2017-09-30T20:48:17" Folio="5195532" FormaPago="99" LugarExpedicion="23010" MetodoPago="PPD" Moneda="MXN" NoCertificado="00001000000400889130" Sello="INfkRXkN30K/6jBYL9sa1HrvIjvS4UIs3QFYwBfZyhSHRXd3wBWN2NRJqZ9a7gVbnDhcxdqfj0uRyj84MKRxi5GeZEAANsBcN0hWxfFDsvvjVXKedhkAcy0mmXnpi/jOxupuGY0+KvF9viEIISEv6pM4t4uRoeVYvdJgBm+A5UtZNBoDMlIJ+qknyyny/2jf1uABtxtw2ckl+a8yeT1uDUph+QoMxKaQipT8pOen57uREx97x8NnA3++ZObKou2yG7Zb7ixSu/y/DLQMZm3ZNUtlTsYUCRV31NMJ7Vfz2sO0r60Tv3hOV4Nm1TxSkPs6uJtkQfDyxCnSS8sLyov0ag==" Serie="INV" SubTotal="30000.00" TipoCambio="1" TipoDeComprobante="I" Total="34800.00" Version="3.3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/implocal http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd"><cfdi:Emisor Nombre="CEMEX HACKATHON DE C.V" RegimenFiscal="601" Rfc="CMX990929XAV"/><cfdi:Receptor Nombre="CLIENTE HACKATHON, S. DE R.L. DE C.V." Rfc="CHK002028AD1" UsoCFDI="I01"/><cfdi:Conceptos><cfdi:Concepto Cantidad="300.000" ClaveProdServ="30103623" ClaveUnidad="H87" Descripcion="PRODUCTO DUMMY." Importe="30000.00" NoIdentificacion="40000015" Unidad="EA" ValorUnitario="100.00"><cfdi:Impuestos><cfdi:Traslados><cfdi:Traslado Base="30000.00" Importe="4800.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/></cfdi:Traslados></cfdi:Impuestos></cfdi:Concepto></cfdi:Conceptos><cfdi:Impuestos TotalImpuestosTrasladados="4800.00"><cfdi:Traslados><cfdi:Traslado Importe="4800.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/></cfdi:Traslados></cfdi:Impuestos><cfdi:Complemento><tfd:TimbreFiscalDigital FechaTimbrado="2017-09-30T20:52:42" Leyenda="" NoCertificadoSAT="20001000000300022323" RfcProvCertif="TLE011122SC2" SelloCFD="INfkRXkN30K/6jBYL9sa1HrvIjvS4UIs3QFYwBfZyhSHRXd3wBWN2NRJqZ9a7gVbnDhcxdqfj0uRyj84MKRxi5GeZEAANsBcN0hWxfFDsvvjVXKedhkAcy0mmXnpi/jOxupuGY0+KvF9viEIISEv6pM4t4uRoeVYvdJgBm+A5UtZNBoDMlIJ+qknyyny/2jf1uABtxtw2ckl+a8yeT1uDUph+QoMxKaQipT8pOen57uREx97x8NnA3++ZObKou2yG7Zb7ixSu/y/DLQMZm3ZNUtlTsYUCRV31NMJ7Vfz2sO0r60Tv3hOV4Nm1TxSkPs6uJtkQfDyxCnSS8sLyov0ag==" SelloSAT="dT4/v4W8ziso4wAUcDj/K5s11uN0oqPsaYe3zpOwjNTYNsKaYUSi2XODAhec1CmrXflTcAM0UbjSoRxVCzO78ByfsE+D8SRfos4G++yKC1Ldm5jruiFi+cFPzlEKsMfl8qcnMSFk4CytA1+C5cXni+G6jfILERhahU2OZCH9pFg=" UUID="653F96C6-D1A5-4E16-8F79-393C46C05A7E" Version="1.1" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd"/></cfdi:Complemento><cfdi:Addenda><requestForPayment DeliveryDate="2017-09-30" contentVersion="1.3.1" documentStatus="ORIGINAL" documentStructureVersion="AMC7.1" type="SimpleInvoiceType"><requestForPaymentIdentification><entityType>INVOICE</entityType><uniqueCreatorIdentification>INV5195534</uniqueCreatorIdentification></requestForPaymentIdentification><orderIdentification><referenceIdentification type="ON">9968098316</referenceIdentification></orderIdentification><AdditionalInformation><referenceIdentification type="ON">String</referenceIdentification></AdditionalInformation><buyer><gln>0007504005499</gln></buyer><seller><gln>0000000900108</gln><alternatePartyIdentification type="SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY">100108</alternatePartyIdentification></seller><currency currencyISOCode="MXN"><currencyFunction>PAYMENT_CURRENCY</currencyFunction><rateOfChange>1.00000</rateOfChange></currency><lineItem number="1" type="SimpleInvoiceLineItem"><tradeItemIdentification><gtin>90000015</gtin></tradeItemIdentification><alternateTradeItemIdentification type="BUYER_ASSIGNED">100108</alternateTradeItemIdentification><tradeItemDescriptionInformation language="ES"><longText>PRODUCTO DUMMY.</longText></tradeItemDescriptionInformation><invoicedQuantity unitOfMeasure="EA">300.000</invoicedQuantity><grossPrice><Amount>100.00</Amount></grossPrice><palletInformation><palletQuantity>1</palletQuantity><description type="EXCHANGE_PALLETS">Tarima olala</description><transport><methodOfPayment>PREPAID_BY_SELLER</methodOfPayment></transport></palletInformation><tradeItemTaxInformation><taxTypeDescription>VAT</taxTypeDescription><tradeItemTaxAmount><taxPercentage>16.00</taxPercentage><taxAmount>4800.00</taxAmount></tradeItemTaxAmount></tradeItemTaxInformation><totalLineAmount><netAmount><Amount>30000.00</Amount></netAmount></totalLineAmount></lineItem><TotalAllowanceCharge allowanceOrChargeType="ALLOWANCE"><Amount>0.00</Amount></TotalAllowanceCharge><baseAmount><Amount>30000.00</Amount></baseAmount><tax type="VAT"><taxAmount>4800.00</taxAmount></tax><payableAmount><Amount>34800.00</Amount></payableAmount></requestForPayment></cfdi:Addenda></cfdi:Comprobante>',
// 	'<?xml version="1.0" encoding="utf-8"?><cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:implocal="http://www.sat.gob.mx/implocal" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Certificado="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" CondicionesDePago="CREDITO MXN" Fecha="2017-09-30T20:48:17" Folio="5195532" FormaPago="99" LugarExpedicion="23010" MetodoPago="PPD" Moneda="MXN" NoCertificado="00001000000400889130" Sello="INfkRXkN30K/6jBYL9sa1HrvIjvS4UIs3QFYwBfZyhSHRXd3wBWN2NRJqZ9a7gVbnDhcxdqfj0uRyj84MKRxi5GeZEAANsBcN0hWxfFDsvvjVXKedhkAcy0mmXnpi/jOxupuGY0+KvF9viEIISEv6pM4t4uRoeVYvdJgBm+A5UtZNBoDMlIJ+qknyyny/2jf1uABtxtw2ckl+a8yeT1uDUph+QoMxKaQipT8pOen57uREx97x8NnA3++ZObKou2yG7Zb7ixSu/y/DLQMZm3ZNUtlTsYUCRV31NMJ7Vfz2sO0r60Tv3hOV4Nm1TxSkPs6uJtkQfDyxCnSS8sLyov0ag==" Serie="INV" SubTotal="30000.00" TipoCambio="1" TipoDeComprobante="I" Total="34800.00" Version="3.3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/implocal http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd"><cfdi:Emisor Nombre="CEMEX HACKATHON DE C.V" RegimenFiscal="601" Rfc="CMX990929XAV"/><cfdi:Receptor Nombre="CLIENTE HACKATHON, S. DE R.L. DE C.V." Rfc="CHK002028AD1" UsoCFDI="I01"/><cfdi:Conceptos><cfdi:Concepto Cantidad="300.000" ClaveProdServ="30103623" ClaveUnidad="H87" Descripcion="PRODUCTO DUMMY." Importe="30000.00" NoIdentificacion="40000015" Unidad="EA" ValorUnitario="100.00"><cfdi:Impuestos><cfdi:Traslados><cfdi:Traslado Base="30000.00" Importe="4800.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/></cfdi:Traslados></cfdi:Impuestos></cfdi:Concepto></cfdi:Conceptos><cfdi:Impuestos TotalImpuestosTrasladados="4800.00"><cfdi:Traslados><cfdi:Traslado Importe="4800.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/></cfdi:Traslados></cfdi:Impuestos><cfdi:Complemento><tfd:TimbreFiscalDigital FechaTimbrado="2017-09-30T20:52:42" Leyenda="" NoCertificadoSAT="20001000000300022323" RfcProvCertif="TLE011122SC2" SelloCFD="INfkRXkN30K/6jBYL9sa1HrvIjvS4UIs3QFYwBfZyhSHRXd3wBWN2NRJqZ9a7gVbnDhcxdqfj0uRyj84MKRxi5GeZEAANsBcN0hWxfFDsvvjVXKedhkAcy0mmXnpi/jOxupuGY0+KvF9viEIISEv6pM4t4uRoeVYvdJgBm+A5UtZNBoDMlIJ+qknyyny/2jf1uABtxtw2ckl+a8yeT1uDUph+QoMxKaQipT8pOen57uREx97x8NnA3++ZObKou2yG7Zb7ixSu/y/DLQMZm3ZNUtlTsYUCRV31NMJ7Vfz2sO0r60Tv3hOV4Nm1TxSkPs6uJtkQfDyxCnSS8sLyov0ag==" SelloSAT="dT4/v4W8ziso4wAUcDj/K5s11uN0oqPsaYe3zpOwjNTYNsKaYUSi2XODAhec1CmrXflTcAM0UbjSoRxVCzO78ByfsE+D8SRfos4G++yKC1Ldm5jruiFi+cFPzlEKsMfl8qcnMSFk4CytA1+C5cXni+G6jfILERhahU2OZCH9pFg=" UUID="653F96C6-D1A5-4E16-8F79-393C46C05A7E" Version="1.1" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd"/></cfdi:Complemento><cfdi:Addenda><requestForPayment DeliveryDate="2017-09-30" contentVersion="1.3.1" documentStatus="ORIGINAL" documentStructureVersion="AMC7.1" type="SimpleInvoiceType"><requestForPaymentIdentification><entityType>INVOICE</entityType><uniqueCreatorIdentification>INV5195534</uniqueCreatorIdentification></requestForPaymentIdentification><orderIdentification><referenceIdentification type="ON">9968098316</referenceIdentification></orderIdentification><AdditionalInformation><referenceIdentification type="ON">String</referenceIdentification></AdditionalInformation><buyer><gln>0007504005499</gln></buyer><seller><gln>0000000900108</gln><alternatePartyIdentification type="SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY">100108</alternatePartyIdentification></seller><currency currencyISOCode="MXN"><currencyFunction>PAYMENT_CURRENCY</currencyFunction><rateOfChange>1.00000</rateOfChange></currency><lineItem number="1" type="SimpleInvoiceLineItem"><tradeItemIdentification><gtin>90000015</gtin></tradeItemIdentification><alternateTradeItemIdentification type="BUYER_ASSIGNED">100108</alternateTradeItemIdentification><tradeItemDescriptionInformation language="ES"><longText>PRODUCTO DUMMY.</longText></tradeItemDescriptionInformation><invoicedQuantity unitOfMeasure="EA">300.000</invoicedQuantity><grossPrice><Amount>100.00</Amount></grossPrice><palletInformation><palletQuantity>1</palletQuantity><description type="EXCHANGE_PALLETS">Tarima olala</description><transport><methodOfPayment>PREPAID_BY_SELLER</methodOfPayment></transport></palletInformation><tradeItemTaxInformation><taxTypeDescription>VAT</taxTypeDescription><tradeItemTaxAmount><taxPercentage>16.00</taxPercentage><taxAmount>4800.00</taxAmount></tradeItemTaxAmount></tradeItemTaxInformation><totalLineAmount><netAmount><Amount>30000.00</Amount></netAmount></totalLineAmount></lineItem><TotalAllowanceCharge allowanceOrChargeType="ALLOWANCE"><Amount>0.00</Amount></TotalAllowanceCharge><baseAmount><Amount>30000.00</Amount></baseAmount><tax type="VAT"><taxAmount>4800.00</taxAmount></tax><payableAmount><Amount>34800.00</Amount></payableAmount></requestForPayment></cfdi:Addenda></cfdi:Comprobante>',
// 	'<?xml version="1.0" encoding="utf-8"?><cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:implocal="http://www.sat.gob.mx/implocal" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Certificado="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" CondicionesDePago="CREDITO MXN" Fecha="2017-09-30T20:48:17" Folio="5195532" FormaPago="99" LugarExpedicion="23010" MetodoPago="PPD" Moneda="MXN" NoCertificado="00001000000400889130" Sello="INfkRXkN30K/6jBYL9sa1HrvIjvS4UIs3QFYwBfZyhSHRXd3wBWN2NRJqZ9a7gVbnDhcxdqfj0uRyj84MKRxi5GeZEAANsBcN0hWxfFDsvvjVXKedhkAcy0mmXnpi/jOxupuGY0+KvF9viEIISEv6pM4t4uRoeVYvdJgBm+A5UtZNBoDMlIJ+qknyyny/2jf1uABtxtw2ckl+a8yeT1uDUph+QoMxKaQipT8pOen57uREx97x8NnA3++ZObKou2yG7Zb7ixSu/y/DLQMZm3ZNUtlTsYUCRV31NMJ7Vfz2sO0r60Tv3hOV4Nm1TxSkPs6uJtkQfDyxCnSS8sLyov0ag==" Serie="INV" SubTotal="30000.00" TipoCambio="1" TipoDeComprobante="I" Total="34800.00" Version="3.3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/implocal http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd"><cfdi:Emisor Nombre="CEMEX HACKATHON DE C.V" RegimenFiscal="601" Rfc="CMX990929XAV"/><cfdi:Receptor Nombre="CLIENTE HACKATHON, S. DE R.L. DE C.V." Rfc="CHK002028AD1" UsoCFDI="I01"/><cfdi:Conceptos><cfdi:Concepto Cantidad="300.000" ClaveProdServ="30103623" ClaveUnidad="H87" Descripcion="PRODUCTO DUMMY." Importe="30000.00" NoIdentificacion="40000015" Unidad="EA" ValorUnitario="100.00"><cfdi:Impuestos><cfdi:Traslados><cfdi:Traslado Base="30000.00" Importe="4800.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/></cfdi:Traslados></cfdi:Impuestos></cfdi:Concepto></cfdi:Conceptos><cfdi:Impuestos TotalImpuestosTrasladados="4800.00"><cfdi:Traslados><cfdi:Traslado Importe="4800.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/></cfdi:Traslados></cfdi:Impuestos><cfdi:Complemento><tfd:TimbreFiscalDigital FechaTimbrado="2017-09-30T20:52:42" Leyenda="" NoCertificadoSAT="20001000000300022323" RfcProvCertif="TLE011122SC2" SelloCFD="INfkRXkN30K/6jBYL9sa1HrvIjvS4UIs3QFYwBfZyhSHRXd3wBWN2NRJqZ9a7gVbnDhcxdqfj0uRyj84MKRxi5GeZEAANsBcN0hWxfFDsvvjVXKedhkAcy0mmXnpi/jOxupuGY0+KvF9viEIISEv6pM4t4uRoeVYvdJgBm+A5UtZNBoDMlIJ+qknyyny/2jf1uABtxtw2ckl+a8yeT1uDUph+QoMxKaQipT8pOen57uREx97x8NnA3++ZObKou2yG7Zb7ixSu/y/DLQMZm3ZNUtlTsYUCRV31NMJ7Vfz2sO0r60Tv3hOV4Nm1TxSkPs6uJtkQfDyxCnSS8sLyov0ag==" SelloSAT="dT4/v4W8ziso4wAUcDj/K5s11uN0oqPsaYe3zpOwjNTYNsKaYUSi2XODAhec1CmrXflTcAM0UbjSoRxVCzO78ByfsE+D8SRfos4G++yKC1Ldm5jruiFi+cFPzlEKsMfl8qcnMSFk4CytA1+C5cXni+G6jfILERhahU2OZCH9pFg=" UUID="653F96C6-D1A5-4E16-8F79-393C46C05A7E" Version="1.1" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd"/></cfdi:Complemento><cfdi:Addenda><requestForPayment DeliveryDate="2017-09-30" contentVersion="1.3.1" documentStatus="ORIGINAL" documentStructureVersion="AMC7.1" type="SimpleInvoiceType"><requestForPaymentIdentification><entityType>INVOICE</entityType><uniqueCreatorIdentification>INV5195534</uniqueCreatorIdentification></requestForPaymentIdentification><orderIdentification><referenceIdentification type="ON">9968098316</referenceIdentification></orderIdentification><AdditionalInformation><referenceIdentification type="ON">String</referenceIdentification></AdditionalInformation><buyer><gln>0007504005499</gln></buyer><seller><gln>0000000900108</gln><alternatePartyIdentification type="SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY">100108</alternatePartyIdentification></seller><currency currencyISOCode="MXN"><currencyFunction>PAYMENT_CURRENCY</currencyFunction><rateOfChange>1.00000</rateOfChange></currency><lineItem number="1" type="SimpleInvoiceLineItem"><tradeItemIdentification><gtin>90000015</gtin></tradeItemIdentification><alternateTradeItemIdentification type="BUYER_ASSIGNED">100108</alternateTradeItemIdentification><tradeItemDescriptionInformation language="ES"><longText>PRODUCTO DUMMY.</longText></tradeItemDescriptionInformation><invoicedQuantity unitOfMeasure="EA">300.000</invoicedQuantity><grossPrice><Amount>100.00</Amount></grossPrice><palletInformation><palletQuantity>1</palletQuantity><description type="EXCHANGE_PALLETS">Tarima olala</description><transport><methodOfPayment>PREPAID_BY_SELLER</methodOfPayment></transport></palletInformation><tradeItemTaxInformation><taxTypeDescription>VAT</taxTypeDescription><tradeItemTaxAmount><taxPercentage>16.00</taxPercentage><taxAmount>4800.00</taxAmount></tradeItemTaxAmount></tradeItemTaxInformation><totalLineAmount><netAmount><Amount>30000.00</Amount></netAmount></totalLineAmount></lineItem><TotalAllowanceCharge allowanceOrChargeType="ALLOWANCE"><Amount>0.00</Amount></TotalAllowanceCharge><baseAmount><Amount>30000.00</Amount></baseAmount><tax type="VAT"><taxAmount>4800.00</taxAmount></tax><payableAmount><Amount>34800.00</Amount></payableAmount></requestForPayment></cfdi:Addenda></cfdi:Comprobante>'
// 	]
// }


class Empresa {
	constructor (a, b){
	  this.facturasGeneradasporDia = a;
	  this.cadaCuantosDiasBajaFacturas = b;
	}
}
  
function recomendacion (empresas, n, query){
	let rec;
	if (query === 0) return 0;
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
  
var query;





app.get("/", (req,res)=> {
	console.log("/ route")
	res.send("API WORKING!");	

});

app.get("/:clientKey/new/invoices", (req,res)=> {
	console.log("/:clientKey/new/invoices route")
	let json = {
		invoices:[]
	}
	db.collection("Invoices").get().then((snap)=>{
		snap.forEach(doc =>{
			const allData = doc.data();
			const xml = allData.xml;
			json.invoices.push(xml);

		});
		res.send(json);
		return true;
	})
	.catch( error => {
		res.send('{"error": No invoices found}');
		console.log(error);
		return false;
	});
});

app.get("/:clientKey/logs/:time/:log",(req,res)=>{
	console.log("LOG ROUTE ENTERED");
	console.log(req.params);
	const aclientKey = req.params.clientKey;
	const amessage = req.params.log;
	const atimestamp = req.params.time;
	console.log(aclientKey);
	console.log(amessage);
	console.log(atimestamp);
	db.collecton("Logs").add({
		clientKey: aclientKey,
		message: amessage,
		timestamp: atimestamp 
	})
	.then(docRef =>{
		let json = {
			'statusCode' : 200
		}
		res.send(json);
		console.log("Log written with ID: ", docRef.id);
		return true;
	})
	.catch(error =>{
		res.send("Error adding document");
		console.error("Error adding document: ", error);
		return false;
	})

	// res.send();
})

app.get('/:clientKey/ml/suggestion/:query', (req, res)=>	 {
	var q = req.params.query;
	query = recomendacion(emp, 5, req.params.query);
	var data = {text: query, title: 'Answer'};
	res.send(data);
});



exports.app = functions.https.onRequest(app);