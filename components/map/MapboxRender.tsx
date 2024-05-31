'use client'

import * as React from 'react';
import Map, { Layer, LayerProps, MapStyle, Source, SourceProps } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { ViewProps } from '@/lib/definitions';
import { AppConfig } from '@/lib/AppConfig';

export default function MapboxRender({ style, source, layers, viewProps }: { style: MapStyle, source: SourceProps, layers: LayerProps[], viewProps: ViewProps }) {
    // console.log(viewProps)
    return (
        <Map
            reuseMaps
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