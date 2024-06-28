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
import { getRegion, getCountry, getCountryName, getSubRegion, getSubRegionsby } from 'iso3166-helper';
```

### Functions

#### `getCountry(code: string)`

This function retrieves all states for a given country code.

**Parameters:**

- `code` (string): The ISO2 code of the country.

**Returns:**

- An object with state codes as keys and state names as values.

**Example:**

```javascript
const regions = getCountry("IT");
console.log(Object.values(regions));
// Output: [ 'Piemonte', "Valle d'Aosta, Val d'Aoste", 'Lombardia', 'Trentino-Alto Adige, Trentino-Südtirol', 'Veneto', 'Friuli Venezia Giulia', 'Liguria', 'Emilia-Romagna', 'Toscana', 'Umbria', 'Marche', 'Lazio', 'Abruzzo', 'Molise', 'Campania', 'Puglia', 'Basilicata', 'Calabria', 'Sicilia', 'Sardegna' ]
```

#### `getRegion(code: string)`

This function retrieves the name of a region given its code.

**Parameters:**

- `code` (string): The code of the region (e.g., "IT-45").

**Returns:**

- The name of the region.

**Example:**

```javascript
const region = getRegion("IT-45");
console.log(region); // Output: "Emilia-Romagna"
```

#### `getSubRegion(code: string)`

This function retrieves the details of a sub-region given its code.

**Parameters:**

- `code` (string): The code of the sub-region (e.g., "IT-BO").

**Returns:**

- An object containing the name, region, and state of the sub-region.

**Example:**

```javascript
const subRegion = getSubRegion("IT-BO");
console.log(subRegion); // Output: { countryName: 'Italy', name: "Bologna", region: "IT-45", regionName: 'Emilia-Romagna', country: "IT" }
```

#### `getSubRegionsby(code: string, type: "region" | "state")`

This function retrieves all sub-regions belonging to a specific region or state.

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
  { name: "Bologna", region: "IT-45", state: "IT" },
  { name: "Forlì-Cesena", region: "IT-45", state: "IT" },
  ...
]
*/
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

---

This README provides an extensive guide on how to use the `iso3166-helper` module, including installation, usage examples, function details, and test instructions.
