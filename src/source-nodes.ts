import type { GatsbyNode } from "gatsby";
import axios from "axios"

export const sourceNodes: GatsbyNode[`sourceNodes`] = async (gatsbyApi) => {
    const { actions, reporter, createNodeId, createContentDigest } = gatsbyApi
    const { createNode } = actions

    const sourcingTimer = reporter.activityTimer(`Sourcing from MTA API`)
    sourcingTimer.start()

    interface IApiResponse {
        objectid: string;
        name: string;
        the_geom: {
            coordinates: [number, number]
        };
        line: string;
    }

    const { data, status } = await axios<IApiResponse[]>(`https://data.cityofnewyork.us/resource/kk4q-3rt2.json`)

    if (status !== 200) {
        sourcingTimer.panic({
            id: 'API_DOWN',
            context: {
                sourceMessage: `Sourcing from the MTA API failed!`
            }
        })

        return
    }

    sourcingTimer.setStatus(`Creating nodes for ${data.length} stations...`)
    
    data.forEach((station) => createNode({

            // Station details
            name: station.name,
            coordinates: {
                lat: station.the_geom.coordinates[0],
                lng: station.the_geom.coordinates[1],
            },
            lines: station.line.split('-'),

            // Gatsby internal
            id: createNodeId(`MTAStation-${station.objectid}`),
            internal: {
                type: 'MTAStations',
                contentDigest: createContentDigest(station)
            }

        })
    )

    sourcingTimer.end()
}