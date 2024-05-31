'use client'

import * as React from 'react';
import Map, { Layer, LayerProps, MapStyle, Source, SourceProps } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';
import { ViewProps } from '@/lib/definitions';

export default function MaplibreRender({ style, source, layers, viewProps }: { style: MapStyle, source: SourceProps, layers: LayerProps[], viewProps: ViewProps }) {

    // console.log(viewProps)
    return (
        <Map
            initialViewState={viewProps}
            style={{ flexGrow: "inherit" }}
            mapStyle={style}
        >
            <Source {...source}>
                {layers.map(layer => <Layer key={layer.id} {...layer} />)}
            </Source>
        </Map>

    );
}