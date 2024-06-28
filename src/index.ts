import {countries} from "./data/countries.js";
import {regions} from "./data/regions.js";
import {subRegions} from "./data/subRegions.js";
import type {RegionData, SubRegionDataExt, SubRegionsExt} from "./types";

/**
 * Get state by ISO2 code
 *
 * @param code - state ISO 2 digits code
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
 */
function getCountryName(code: string, type: "int" | "original" = "int") {
	if (code in countries) {
		return countries[code][type];
	}
	return null;
}

/**
 * Returns the region given an ISO 3661-1 code
 *
 * @param code ISO 3661-1 code (e.g. "IT-45")
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
			collectedSubRegions.push(subRegions[key]);
		}
	}
	return collectedSubRegions;
}

export { getCountryName, getSubRegion, getSubRegionsby, getCountry, getRegion };
