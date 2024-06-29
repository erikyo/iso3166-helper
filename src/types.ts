/** The single region dataset */
export type RegionData = { [key: string]: string };

/** The region dataset */
export type Regions = Record<string, RegionData>;

/** The single country dataset */
export type CountryData = { int: string; original: string };

/** The country dataset */
export type Countries = Record<string, CountryData>;

/** The single subregion dataset */
export type SubRegionData = { name: string; region: string; country: string };

/** The subregions extended dataset with country and region names */
export interface SubRegionDataExt extends SubRegionData {
	subregionCode: string;
	countryName: string;
	regionName: string;
}

/** The subregions dataset */
export type SubRegions = Record<string, SubRegionData>;

/** The subregions extended dataset */
export type SubRegionsExt = SubRegionDataExt[];
