export type RegionData = { [key: string]: string };
export type Regions = Record<string, RegionData>;
export type CountryData = { int: string; original: string };
export type Countries = Record<string, CountryData>;
export type SubRegionData = { name: string; region: string; country: string };
export interface SubRegionDataExt extends SubRegionData {
	countryName: string;
	regionName: string;
}
export type SubRegions = Record<string, SubRegionData>;
export type SubRegionsExt = SubRegionDataExt[];
