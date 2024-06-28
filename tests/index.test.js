import assert from "node:assert";
import test from "node:test";

import {getCountry, getCountryName, getRegion,  getSubRegion, getSubRegionsby} from "../lib/index.js";


test('get the name of the country' , () => {
	assert.strictEqual( getCountryName('IT'), 'Italy' );
	assert.strictEqual( getCountryName('IT', 'original'), 'Italia' );
})

test('get the data of the country', () => {
  assert.strictEqual( Object.values(getCountry("IT")).length, 20 );
  assert.deepEqual( Object.values(getCountry("IT")), [ 'Piemonte', "Valle d'Aosta, Val d'Aoste", 'Lombardia', 'Trentino-Alto Adige, Trentino-Südtirol', 'Veneto', 'Friuli Venezia Giulia', 'Liguria', 'Emilia-Romagna', 'Toscana', 'Umbria', 'Marche', 'Lazio', 'Abruzzo', 'Molise', 'Campania', 'Puglia', 'Basilicata', 'Calabria', 'Sicilia', 'Sardegna' ] );
})

test('getRegion', () => {
  assert.strictEqual(getRegion("IT-45"), "Emilia-Romagna");
});

test('getSubRegion', () => {
  assert.strictEqual(getSubRegion("IT-BO").name, "Bologna");
	assert.deepEqual(getSubRegion("IT-RA"), {
		countryName: 'Italy',
		name: "Ravenna",
		region: "IT-45",
		regionName: 'Emilia-Romagna',
		country: "IT"
	});
});

test('getSubRegionsby', () => {
  assert.strictEqual(Object.keys(getSubRegionsby("IT", "country")).length, 106);
  assert.deepEqual(Object.values(getSubRegionsby("IT-45", "region")).map((value) => value.name), [
      'Bologna',
      'Forlì-Cesena',
      'Ferrara',
      'Modena',
      'Piacenza',
      'Parma',
      'Ravenna',
      'Reggio Emilia',
      'Rimini'
    ]);
});
