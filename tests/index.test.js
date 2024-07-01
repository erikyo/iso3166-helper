import assert from "node:assert";
import test from "node:test";

import {
	getCountry,
	getCountryName,
	getRegion,
	getSubRegion,
	getSubRegionsby,
	getTree,
	isChildOf,
	validateCode,
} from "../lib/index.js";

import { countries } from "../lib/data/countries.js";
import { regions } from "../lib/data/regions.js";
import { subRegions } from "../lib/data/subRegions.js";

test("Count the dataset entries", () => {
	console.log(`Countries: ${Object.values(countries).length}`);
	console.log(
		`Regions: ${Object.values(regions).flatMap((value) => Object.values(value)).length}`,
	);
	console.log(`Subregions: ${Object.values(subRegions).length}`);
});

test("Validate code by type", () => {
	assert.strictEqual(validateCode("IT"), "country");
	assert.strictEqual(validateCode("IT-45"), "region");
	assert.strictEqual(validateCode("IT-BO"), "subregion");
	assert.strictEqual(validateCode("IT-ZZ"), false);
});

test("Build the tree structure of the regions and subregions", () => {
	const tree = getTree();
	assert.strictEqual(tree.IT.regions["IT-45"].subregions["IT-BO"], "Bologna");
	assert.deepEqual(tree.IT.regions["IT-45"].name, "Emilia-Romagna");
	assert.deepEqual(tree.IT.regions["IT-45"].subregions, {
		"IT-BO": "Bologna",
		"IT-FC": "Forlì-Cesena",
		"IT-FE": "Ferrara",
		"IT-MO": "Modena",
		"IT-PC": "Piacenza",
		"IT-PR": "Parma",
		"IT-RA": "Ravenna",
		"IT-RE": "Reggio Emilia",
		"IT-RN": "Rimini",
	});
});

test("Get the name of the country", () => {
	assert.strictEqual(getCountryName("IT"), "Italy");
	assert.strictEqual(getCountryName("IT", "original"), "Italia");
});

test("Get the data of the country", () => {
	assert.strictEqual(Object.values(getCountry("IT")).length, 20);
	assert.deepEqual(Object.values(getCountry("IT")), [
		"Piemonte",
		"Valle d'Aosta, Val d'Aoste",
		"Lombardia",
		"Trentino-Alto Adige, Trentino-Südtirol",
		"Veneto",
		"Friuli Venezia Giulia",
		"Liguria",
		"Emilia-Romagna",
		"Toscana",
		"Umbria",
		"Marche",
		"Lazio",
		"Abruzzo",
		"Molise",
		"Campania",
		"Puglia",
		"Basilicata",
		"Calabria",
		"Sicilia",
		"Sardegna",
	]);
	assert.deepEqual(Object.keys(getCountry("IT")), [
		"IT-21",
		"IT-23",
		"IT-25",
		"IT-32",
		"IT-34",
		"IT-36",
		"IT-42",
		"IT-45",
		"IT-52",
		"IT-55",
		"IT-57",
		"IT-62",
		"IT-65",
		"IT-67",
		"IT-72",
		"IT-75",
		"IT-77",
		"IT-78",
		"IT-82",
		"IT-88",
	]);
});

test("Is child of", () => {
	assert.strictEqual(isChildOf("IT-RA", "IT-45"), true);
	assert.strictEqual(isChildOf("IT-BO", "IT-45"), true);
	assert.strictEqual(isChildOf("IT-BO", "IT"), true);
	assert.strictEqual(isChildOf("IT-45", "IT"), true);
});

test("Is not child of", () => {
	assert.strictEqual(isChildOf("IT-BO", "IT-25"), false);
	assert.strictEqual(isChildOf("IT-45", "FR"), false);
	assert.strictEqual(isChildOf("IT-BO", "FR"), false);
	assert.strictEqual(isChildOf("IT", "IT-45"), false);
	assert.strictEqual(isChildOf("IT", "IT-BO"), false);
});

test("Get the region", () => {
	assert.strictEqual(getRegion("IT-45"), "Emilia-Romagna");
});

test("Get the subregion", () => {
	assert.strictEqual(getSubRegion("IT-BO").name, "Bologna");
	assert.deepEqual(getSubRegion("IT-RA"), {
		name: "Ravenna",
		region: "IT-45",
		country: "IT",
		subregionCode: "IT-RA",
		countryName: "Italy",
		regionName: "Emilia-Romagna",
	});
});

test("Get the data of the subregions", () => {
	assert.strictEqual(Object.keys(getSubRegionsby("IT", "country")).length, 106);
	assert.deepEqual(
		Object.values(getSubRegionsby("IT-45", "region")).map(
			(value) => value.name,
		),
		[
			"Bologna",
			"Forlì-Cesena",
			"Ferrara",
			"Modena",
			"Piacenza",
			"Parma",
			"Ravenna",
			"Reggio Emilia",
			"Rimini",
		],
	);
});
