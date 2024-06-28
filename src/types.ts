/* The single region dataset */
export type RegionData = { [key: string]: string };

/* The regions dataset */
export type Regions = Record<string, RegionData>;

/* The single country dataset */
export type CountryData = { int: string; original: string };

/* The countries dataset */
export type Countries = Record<string, CountryData>;

/* The single subregion dataset */
export type SubRegionData = { name: string; region: string; country: string };

/* The subregions extended dataset with country and region names */
export interface SubRegionDataExt extends SubRegionData {
	countryName: string;
	regionName: string;
}

/* The subregions dataset */
export type SubRegions = Record<string, SubRegionData>;

/* The subregions extended dataset */
export type SubRegionsExt = SubRegionDataExt[];
