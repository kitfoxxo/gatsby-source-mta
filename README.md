# gatsby-source-mta (WIP)
Gatsby source plugin for pulling data from NYC Open Data's dataset of MTA subway stations. This project is still a work in progress, but is useable in it's current state.
## Installation
In a Gatsby project directory, run the following command.
```
npm i gatsby-source-mta
```
Add the plugin to your Gatsby project's config.
```js
const config: GatsbyConfig = {
  // ... Gatsby config
  plugins: [
    // ... Other plugins
    "gatsby-source-mta"
  ],
}
```
## Usage
Returns a list of all MTA stations
```js
graphql`
    query GetAllMtaStations {
        allMtaStations {
            nodes {
                id
                name
                coordinates {
                    lat
                    lng
                }
                lines
            }
        }
    }
`
```
Returns a specific station by ID:
```js
graphql`
    query GetMtaStationById ($id: String!) {
        mtaStations (id: {eq: $id}) {
            id
            name
            coordinates {
                lat
                lng
            }
            lines
        }
    }
`
```
Returns all stations that have `A` line service:
```js
graphql`
    query GetMtaStationsThatHaveALineService {
        allMtaStations(filter: {lines: {eq: "A"}}) {
            nodes {
                id
                name
                coordinates {
                    lat
                    lng
                }
                lines
            }
        }
    }
`
```

## Types
`Station`
```ts
type Station = {
    id: string;
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    lines: string[];
}
```
## Todo
- Add unit testing
- Create separate `Line` nodes and types for each line
- Add bus and other transit service information
- Add plugin option for overriding dataset URL