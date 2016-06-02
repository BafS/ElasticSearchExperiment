var elasticsearch = require('elasticsearch');
var csv = require('csv-parser')
var fs = require('fs')

var client = new elasticsearch.Client({
	host: 'search-elastic-search-heig-3nhbodzwhflo56pew23jotan6a.eu-central-1.es.amazonaws.com',
	log: 'trace'
});

fs.createReadStream("PointExploitation.csv")
	.pipe(csv())
	.on('data', function(data) {
		if (data.DebutValidite !== '') {
			data.DebutValidite = convertDate(data.DebutValidite);
		}

		if (data.FinValidite !== '') {
			data.FinValidite = convertDate(data.FinValidite);
		}

		if (data.DateTraitement !== '') {
			data.DateTraitement = convertDate(data.DateTraitement);
		}

		if (data.Etat !== '') {
			data.Etat = convertDate(data.Etat);
		}


		data.NomCommune = data.NomCommune.split(/\W/).join('_');
		data.MoyenTransport = data.MoyenTransport.split('_').join(' ');
		data.Altitude = parseInt(data.Altitude);
		data.Numero = parseInt(data.Numero);
		data.NumeroET = parseInt(data.NumeroET);
		data.NumeroCommune = parseInt(data.NumeroCommune);
		data.y_Coord_Est = parseFloat(data.y_Coord_Est);
		data.x_Coord_Nord = parseFloat(data.x_Coord_Nord);

		data.location = {
			lat: CHtoWGSlat(data.y_Coord_Est, data.x_Coord_Nord),
			lon: CHtoWGSlong(data.y_Coord_Est, data.x_Coord_Nord)
		}

		client.create({
			index: 'transport',
			type: 'stop',
			id: data.xtf_id,
			body: data
		}, function (error, response) {
			console.error(error, response);
		});
	});

function CHtoWGSlat(y, x) {
	// Converts military to civil and  to unit = 1000km
	// Auxiliary values (% Bern)
	var y_aux = (y - 600000)/1000000;
	var x_aux = (x - 200000)/1000000;

	// Process lat
	var lat = 16.9023892 +
		3.238272 * x_aux -
		0.270978 * Math.pow(y_aux, 2) -
		0.002528 * Math.pow(x_aux, 2) -
		0.0447   * Math.pow(y_aux, 2) * x_aux -
		0.0140   * Math.pow(x_aux, 3);

	// Unit 10000" to 1 " and converts seconds to degrees (dec)
	lat = lat * 100 / 36;

	return lat;
}

function CHtoWGSlong(y, x) {
	// Converts military to civil and  to unit = 1000km
	// Auxiliary values (% Bern)
	var y_aux = (y - 600000)/1000000;
	var x_aux = (x - 200000)/1000000;

	// Process long
	var long = 2.6779094 +
		4.728982 * y_aux +
		0.791484 * y_aux * x_aux +
		0.1306   * y_aux * Math.pow(x_aux, 2) -
		0.0436   * Math.pow(y_aux, 3);

	// Unit 10000" to 1 " and converts seconds to degrees (dec)
	long = long * 100 / 36;

	return long;
}

/*
client.search({
	q: 'Test 1'
}).then(function (body) {
	var hits = body.hits.hits;
	console.log(hits);
}, function (error) {
	console.trace(error.message);
});
*/

/*
client.create({
	index: 'twitter',
	type: 'user',
	id: 'myId',
	body: {
		title: 'Test 1',
		tags: ['y', 'z'],
		published: true,
		published_at: '2013-01-01',
		counter: 1
	}
}, function (error, response) {
	console.error(error, response);
});
*/

/*
25836

{
	xtf_id: 'ch14uvag00041544',
	Numero: '8506127',
	Nom: 'Bottighofen',
	Abreviation: 'BOT',
	RespDonneesAbreviation: 'SBBCFFFFS',
	NumeroET: '1',
	AbreviationET: 'SBBCFFFFS',
	TypePointExploitation: 'Arret',
	MoyenTransport: 'CheminFer',
	Altitude: '419',
	NumeroCommune: '4643',
	NomCommune: 'Bottighofen',
	DebutValidite: '20141201',
	FinValidite: '',
	DateTraitement: '20151204',
	Etat: '20151213',
	rArretSuperieur: '',
	y_Coord_Est: '733336.000',
	x_Coord_Nord: '278180.000'
}
*/

function convertDate(date) {
	return new Date(date.substr(0, 4), date.substr(4, 2), date.substr(4, 2), date.substr(6, 2));
}