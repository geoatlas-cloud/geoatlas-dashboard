'use client'

import * as React from 'react';
import Map, { Layer, LayerProps, MapStyle, Source, SourceProps } from 'react-map-gl';

import '@cgcs2000/mapbox-gl/dist/mapbox-gl.css';
import { ViewProps } from '@/lib/definitions';
import { AppConfig } from '@/lib/AppConfig';
import * as mapboxgl from '@cgcs2000/mapbox-gl'

/**
 * 未做严格测试, 目前基本确定仅支持4490, 不支持3857, 需要Token(目前使用最新版本为v2)
 * @param param0 
 * @returns 
 */
export default function CGCS2000MapboxRender({ style, source, layers, viewProps }: { style: MapStyle, source: SourceProps, layers: LayerProps[], viewProps: ViewProps }) {
    // console.log(viewProps)
    return (
        <Map
            mapLib={mapboxgl}
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