export enum MapConfigConstants {
    OSM = "osm",
    TIAN_DI_TU = "tianditu",
    MAPLIBRE = "maplibre",
    MAPBOX = "mapbox",
    MAPBOX_ENHAANCE = "mapbox_enhance",
    MAPBOX_CGCS2000 = "mapbox_cgcs2000",
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
        engine: {
            web_mercator: process.env.NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE || MapConfigConstants.MAPLIBRE,
            cgcs2000: process.env.NEXT_PUBLIC_CGCS2000_MAP_ENGINE || MapConfigConstants.MAPLIBRE
        }
    }
}