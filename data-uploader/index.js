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
		client.create({
			index: 'transport',
			type: 'stop',
			id: data.xtf_id,
			body: data
		}, function (error, response) {
			console.error(error, response);
		});
	});

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
