import * as React from 'react';
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { notFound } from 'next/navigation';
import { fetchLayrePreviewInfo } from '@/lib/action';
import MapContainer from '@/components/map/MapContainer';


export default async function FeatureLayerPreview({ params }: { params: { id: string } }) {

    const featureLayerPreviewInfoRes = await fetchLayrePreviewInfo(params.id)

    const featureLayerPreviewInfo = featureLayerPreviewInfoRes.data

    if(!featureLayerPreviewInfo) {
        notFound()
    }
    
    return (
        <>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/layers">FeatureLayers</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Preview</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className='flex-grow p-4 sm:px-6 sm:py-0'>
                {/* <MapPreview baseMap={baseMap} layer={layer} /> */}
                <MapContainer layer={featureLayerPreviewInfo} />
            </main>
        </>

    );
}