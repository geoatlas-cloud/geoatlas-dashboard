export enum MapConfigConstants {
    OSM = "osm",
    TIAN_DI_TU = "tianditu",
    MAPLIBRE = "maplibre",
    MAPBOX = "mapbox",
    TILE_SCHEMA_4490 = "EPSG:4490",
    TILE_SCHEMA_3857 = "EPSG:3857"
}

export const AppConfig = {
    backend: {
        endpoint: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:2024/"
    },
    map: {
        base_map: {
            type: process.env.NEXT_PUBLIC_BASE_MAP_TYPE,
            tile_key: process.env.NEXT_PUBLIC_BASE_MAP_TILE_KEY,
            tianditu: {
                web_mercator: `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=`,
                cgcs2000: `http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=`
            },
            osm: {
                web_mercator: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
        },
        mapbox: {
            token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        },
        engine: process.env.NEXT_PUBLIC_MAP_ENGINE || MapConfigConstants.MAPLIBRE
    }
}