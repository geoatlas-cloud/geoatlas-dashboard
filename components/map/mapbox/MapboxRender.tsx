'use client'

import * as React from 'react';
import Map, { Layer, LayerProps, MapStyle, Source, SourceProps } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { ViewProps } from '@/lib/definitions';
import { AppConfig } from '@/lib/AppConfig';

/**
 * 仅支持 3857, Token则根据所使用的版本, v2及以上都需要token
 * @param param0 
 * @returns 
 */
export default function MapboxRender({ style, source, layers, viewProps }: { style: MapStyle, source: SourceProps, layers: LayerProps[], viewProps: ViewProps }) {
    // console.log(viewProps)
    return (
        <Map
            // reuseMaps
            initialViewState={viewProps}
            style={{ flexGrow: "inherit" }}
            mapStyle={style}
            mapboxAccessToken={AppConfig.map.mapbox.token}
        >
            <Source {...source}>
                {layers.map(layer => <Layer key={layer.id} {...layer} />)}
            </Source>
        </Map>

    );
}