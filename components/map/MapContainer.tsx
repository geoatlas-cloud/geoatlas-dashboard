'use client'

import * as React from 'react';
import { LayerProps, LngLatBoundsLike, MapStyle, SourceProps } from 'react-map-gl/';
import { SourceProps as MaplibreSourceProps, LayerProps as MaplibreLayerProps, MapStyle as MaplibreMapStyle } from 'react-map-gl/maplibre'

import { LayerPreviewInfo, ViewProps } from '@/lib/definitions';
import { useSearchParams } from 'next/navigation';
import { getBounds, lightColors, randomColor } from '@/lib/utils';
import { AppConfig, MapConfigConstants } from '@/lib/AppConfig';
import MapboxRender from './MapboxRender';
import MaplibreRender from './MaplibreRender';

export default function MapContainer({ layer }: { layer: LayerPreviewInfo }) {
    const searchParams = useSearchParams();
    const schema = searchParams.get("schema") || "error"
    // console.log(AppConfig)
    let base_map_resource = `${AppConfig.map.base_map.tianditu.web_mercator}${AppConfig.map.base_map.tile_key}`
    if (MapConfigConstants.TILE_SCHEMA_4490 === schema) {
        base_map_resource = `${AppConfig.map.base_map.tianditu.cgcs2000}${AppConfig.map.base_map.tile_key}`
    } else {
        if (AppConfig.map.base_map.type === MapConfigConstants.OSM) {
            base_map_resource = AppConfig.map.base_map.osm.web_mercator
        }
        // and so on...
    }

    const { id, name, namespace, bbox, center, zoom } = layer

    const sourceId = `feature-layer-${id}-preview`
    const layerColor = '#' + randomColor(lightColors);
    const bounds: LngLatBoundsLike = getBounds(bbox, schema)
    // 给一个默认的中心点, 如果没有设置bbox, 则定位到默认的中心点
    const _center: number[] = center ? [center.x, center.y] : [120.1552, 30.2741] // default to hangzhou
    const _viewState : ViewProps = {}
    if(bbox) {
        _viewState.bounds = bounds
    }else{
        _viewState.longitude= _center[0]
        _viewState.latitude= _center[1]
        _viewState.zoom= zoom
    }

    const style = {
        version: 8,
        name,
        sources: {
            base_map: {
                type: 'raster',
                tileSize: 256,
                tiles: [base_map_resource],
            }
        },
        layers: [
            {
                id: 'base_map',
                source: 'base_map',
                type: 'raster'
            }
        ],
        zoom: zoom,
    }

    const source = {
        id: sourceId,
        type: "vector",
        tiles: [`${AppConfig.backend.endpoint}/tiles/${namespace}/${name}/${schema}/{z}/{y}/{x}.pbf`],
        // 设置数据的显示边界, 超出边界不做数据请求
        bounds
    }

    const layers = [
        {
            id: 'point',
            type: 'circle',
            source: sourceId,
            'source-layer': name,
            filter: ['==', '$type', 'Point'],
            'paint': {
                'circle-color': layerColor,
                'circle-radius': 2.5,
                'circle-opacity': 0.75
            }
        },
        {
            id: 'lineString',
            type: 'line',
            source: sourceId,
            'source-layer': name,
            filter: ['==', '$type', 'LineString'],
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': layerColor,
                'line-width': 1,
                'line-opacity': 0.75
            }
        },
        {
            id: 'polygons',
            type: 'fill',
            source: sourceId,
            'source-layer': name,
            filter: ['==', '$type', 'Polygon'],
            'layout': {},
            'paint': {
                'fill-opacity': 0.1,
                'fill-color': layerColor
            }
        },
        {
            id: 'polygons-outline',
            type: 'line',
            source: sourceId,
            'source-layer': name,
            filter: ['==', '$type', 'Polygon'],
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': layerColor,
                'line-width': 1,
                'line-opacity': 0.75
              }
        }
    ]
    if (AppConfig.map.engine === MapConfigConstants.MAPBOX || MapConfigConstants.TILE_SCHEMA_4490 === schema) {
        const _style = style as MapStyle
        const _source = source as SourceProps
        const _layers = layers as LayerProps[]
        return (
            <MapboxRender
                style={_style}
                source={_source}
                layers={_layers}
                viewProps={_viewState}
            />

        );
    } else {
        const _style = style as MaplibreMapStyle
        const _source = source as MaplibreSourceProps
        const _layers = layers as MaplibreLayerProps[]
        return (
            <MaplibreRender
                style={_style}
                source={_source}
                layers={_layers}
                viewProps={_viewState}
            />
        )
    }

}