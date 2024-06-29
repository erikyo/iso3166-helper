import {countries} from "./data/countries.js";
import {regions} from "./data/regions.js";
import {subRegions} from "./data/subRegions.js";
import type {RegionData, SubRegionDataExt, SubRegionsExt} from "./types";

/**
 * Validates the given code to determine if it belongs to a country, region, or subregion.
 *
 * @param {string} code - The code to be validated.
 * @return {string|false} The type of the code if it belongs to a country, region, or subregion; otherwise, false.
 */
function validateCode(code: string): string|false {
	if (code in countries){
		return 'country';
	}
	for (const key in regions) {
		if (code in regions[key]) {
			return 'region';
		}
	}
	if (code in subRegions) {
		return 'subregion';
	}
	return false;
}

/**
 * Generates a tree structure containing countries, regions, and subregions.
 *
 * @return {object} The generated tree structure.
 */
function getTree(): Record<string, Record<string, any>> {
	const tree = {};
	// add countries
	for (const key in countries) {
		tree[key] = {...countries[key], code: key};
	}
	// add regions
	for (const key in regions) {
		if (!tree[key]['regions']) {
			tree[key]['regions'] = {};
		}
		for (const subkey in regions[key]) {
			if (!tree[key]['regions'][subkey]) {
				tree[key]['regions'][subkey] = {};
			}
			tree[key]['regions'][subkey] = {name: regions[key][subkey], code: subkey};
		}
	}
	// add subregions
	for (const key in subRegions) {
		const current = subRegions[key];
		if (!tree[current.country]['regions']) {
			tree[current.country]['regions']= {};
		}
		if (!tree[current.country]['regions'][current.region]) {
			tree[current.country]['regions'][current.region] = {};
		}
		if (!tree[current.country]['regions'][current.region]["subregions"]) {
			tree[current.country]['regions'][current.region]["subregions"] = {};
		}
		tree[current.country]['regions'][current.region]["subregions"][key] = current.name;
	}
	return tree;
}

/**
 * Get state by ISO2 code
 *
 * @param code - state ISO 2 digits code
 * @return The state or null if not found
 */
function getCountry(code: string): RegionData | null {
	if (code in regions) {
		return regions[code];
	}
	return null;
}

/**
 * Get the name of the country
 * @param code Country Iso2 code
 * @param type "int" or "original" whenever the name should be in international or original form (e.g. "Italy" or "Italia")
 * @return The name of the country or null if not found
 */
function getCountryName(code: string, type: "int" | "original" = "int"): string | null {
	if (code in countries) {
		return countries[code][type];
	}
	return null;
}

/**
 * Returns the region given an ISO 3661-1 code
 *
 * @param code ISO 3661-1 code (e.g. "IT-45")
 * @return The region or null if not found
 */
function getRegion(code: string): string | null {
	const iso2 = code.split("-")[0];
	if (iso2 in regions) {
		if (code in regions[iso2]) {
			return regions[iso2][code];
		}
	}
	return null;
}

/**
 * Get subregion by ISO 3661-2 code
 *
 * @param code ISO 3661-2 code (e.g. "IT-BO")
 * @return the subregion dataset or null if not found
 */
function getSubRegion(code: string): SubRegionDataExt | null {
	if (code in subRegions) {
		return {
			...subRegions[code],
			subregionCode: code,
			countryName: getCountryName(subRegions[code].country),
			regionName: getRegion(subRegions[code].region),
		};
	}
	return null;
}

/**
 * Get subregions dataset by country ISO or subregion code (e.g. "IT" or "IT-45")
 * @param code Country ISO code or region ISO 3661-1
 * @param type "region" or "country" to filter by type
 * @return an array of subregions
 */
function getSubRegionsby(
	code: string,
	type: "region" | "country",
): SubRegionsExt {
	const collectedSubRegions = [];
	for (const key in subRegions) {
		// if the code is the same as current region type
		if (subRegions[key][type] === code) {
			// add the subregion
			collectedSubRegions.push({ subregionCode: key, ...subRegions[key]});
		}
	}
	return collectedSubRegions;
}

export { validateCode, getTree, getCountry, getRegion, getSubRegion, getCountryName, getSubRegionsby };
