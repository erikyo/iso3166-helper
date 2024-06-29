# iso3166-helper

This NPM module provides utilities to work with regions, states, and sub-regions. It allows fetching regions and sub-regions by their codes and offers functionality to retrieve all sub-regions belonging to a specific region or state.

## Installation

To install the module, run:

```bash
npm install iso3166-helper
```

## Usage

Below are examples of how to use the functions provided by this module.

### Importing the Module

```javascript
import {getRegion, getCountry, getCountryName, getSubRegion, getSubRegionsby} from 'iso3166-helper';
```

## Functions

- [getTree()](#getTree)
- [getCountry()](#getCountry)
- [getRegion()](#getRegion)
- [getSubRegion()](#getSubRegion)
- [getSubRegionsby()](#getSubRegionsby)
- [getCountryName()](#getCountryName)

### getTree

This function retrieves a tree of regions and sub-regions.

`getTree()`

**Returns:**

- An object containing the tree of regions and sub-regions.
- Each region is represented as an object with the following properties:
- - `code` (string): The code of the region.
- - `int` (string): The name of the country.
- - `original` (string): The original name of the country.
- - `region` (object): The code of the parent region.
- - - `subregions` (array): An array of sub-regions belonging to the region.

**Example:**

```javascript
const tree = getTree();
/* {
	...
	IT: {
		code: "IT",
		int: "Italy",
		original: "Italy",
		region: {
			  name: 'Emilia-Romagna',
			  code: 'IT-45',
			  subregions: {
				'IT-BO': 'Bologna',
				'IT-FC': 'Forlì-Cesena',
				'IT-FE': 'Ferrara',
				'IT-MO': 'Modena',
				'IT-PC': 'Piacenza',
				'IT-PR': 'Parma',
				'IT-RA': 'Ravenna',
				'IT-RE': 'Reggio Emilia',
				'IT-RN': 'Rimini'
			  }
			},
		...
		}
	...
	}
 */
```

### getCountry

This function retrieves the details for the regions of a country given its iso2 code.

`getCountry(code: string)`

**Parameters:**

- `code` (string): The ISO2 code of the country.

**Returns:**

- An array of objects containing the code and the name of the regions in the country as key-value pairs.

**Example:**

```javascript
const regions = getCountry("IT");
console.log(Object.values(regions));
// Output: [ 'Piemonte', "Valle d'Aosta, Val d'Aoste", 'Lombardia', 'Trentino-Alto Adige, Trentino-Südtirol', 'Veneto', 'Friuli Venezia Giulia', 'Liguria', 'Emilia-Romagna', 'Toscana', 'Umbria', 'Marche', 'Lazio', 'Abruzzo', 'Molise', 'Campania', 'Puglia', 'Basilicata', 'Calabria', 'Sicilia', 'Sardegna' ]
```

### getRegion

This function retrieves the name of a region given its code.

`getRegion(code: string)`

**Parameters:**

- `code` (string): The code of the region (e.g., "IT-45").

**Returns:**

- The name of the region.

**Example:**

```javascript
const region = getRegion("IT-45");
console.log(region); // Output: "Emilia-Romagna"
```

### getSubRegion

This function retrieves the details of a sub-region given its code.

`getSubRegion(code: string)`

**Parameters:**

- `code` (string): The code of the sub-region (e.g., "IT-BO").

**Returns:**

- An object containing the dataset of the sub-region (e.g., { countryName: 'Italy', name: "Bologna", region: "IT-45", regionName: 'Emilia-Romagna', country: "IT" }).

**Example:**

```javascript
const subRegion = getSubRegion("IT-BO");
console.log(subRegion); // Output: { countryName: 'Italy', name: "Bologna", region: "IT-45", regionName: 'Emilia-Romagna', country: "IT" }
```

### getSubRegionsby

This function retrieves all sub-regions belonging to a specific region or state.

`getSubRegionsby(code: string, type: "region" | "state")`

**Parameters:**

- `code` (string): The code of the region or state.
- `type` ("region" | "state"): The type of code provided.

**Returns:**

- An array of sub-region details.

**Example:**

```javascript
const subRegions = getSubRegionsby("IT-45", "region");
console.log(subRegions);
/* Output:
[
  { code: 'IT-BO', name: "Bologna", region: "IT-45", state: "IT" },
  { code: 'IT-FC', name: "Forlì-Cesena", region: "IT-45", state: "IT" },
  ...
]
*/

const ItalianRegions = getSubRegionsby("IT", "state").map((value) => value.name);
console.log(ItalianRegions);
/* Output:
[
  'Agrigento',        'Alessandria',     'Ancona',
  'Ascoli Piceno',    "L'Aquila",        'Arezzo',
  ...
]
*/


const subRegionsCodes = getSubRegionsby("IT", "country").map((value) => value.subregionCode.slice(3))
console.log(subRegionsCodes);
/* Output:
[
  'AG', 'AL', 'AN', 'AP', 'AQ', 'AR', 'AT', 'AV', 'BA', 'BG',
  'BI', 'BL', 'BN', 'BO', 'BR', 'BS', 'BT', 'BZ', 'CA', 'CB',
  ...
]
 */

```

### getCountryName

This function retrieves the name of a country given its code.

`getCountryName(code: string)`

**Parameters:**

- `code` (string): The code of the country (e.g., "IT").
- `type` ("int" | "original"): optional. Whenever the name is returned in international format (e.g., "Italy") or in the original format (e.g., "Italia").

**Returns:**

- The name of the country.

**Example:**

```javascript
const countryName = getCountryName("IT", "original");
console.log(countryName); // Output: "Italia"
```

## Running Tests

To run the tests for this module, use the following command:

```bash
npm test
```

## License

This module is licensed under the MIT License.

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss any changes.
