'use client'

import * as React from 'react';
import Map, { Layer, LayerProps, MapStyle, Source, SourceProps } from 'react-map-gl';

import '@/lib/map/mapbox-gl-enhance/mapbox-gl-enhance.css';
import { ViewProps } from '@/lib/definitions';
import { AppConfig } from '@/lib/AppConfig';

/**
 * 同时支持3857,4490，由超图提供，基于Mapbox v1分支，不需要token
 * @param param0 
 * @returns 
 */
export default function MapboxEnhanceRender({ style, source, layers, viewProps, schema }: { style: MapStyle, source: SourceProps, layers: LayerProps[], viewProps: ViewProps, schema: string }) {
    // schema = "EPSG:2135" // Error: crs null is not define, 这个错误提示一点都不友好
    return (
        <Map
            // 目前使用1.12-3版本, https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-3/mapbox-gl-enhance.js
            // 测试1.12-4失败, 提示window 对象未定义, 纯html+js测试无问题, 我确实对前端一无所知, 不会调试
            mapLib={import('@/lib/map/mapbox-gl-enhance/mapbox-gl-enhance')}
            initialViewState={viewProps}
            style={{ flexGrow: "inherit" }}
            mapStyle={style}
            mapboxAccessToken={AppConfig.map.mapbox.token}
            // 其他属性直接传递即可, 特么的调了一下午
            // 但是这个却是过不了typescript的类型检查, 我是不知道如何处理, 目前只能关闭类型检查
            crs={schema}
        >
            <Source {...source}>
                {layers.map(layer => <Layer key={layer.id} {...layer} />)}
            </Source>
        </Map>

    );
}