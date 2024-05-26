import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FeatureLayerForm from "@/components/layer-form";
import { notFound } from 'next/navigation';

import { fetchFeatureLayerById, fetchNamespaceList, fetchDatastoreList, updateFeatureLayer, fetchSpatialRefById } from "@/lib/action"

export default async function EditFeatureLayer({ params }: { params: { id: string } }) {

    const [featureLayerRes, namespacesRes, datastoreRes] = await Promise.all([
        fetchFeatureLayerById(params.id),
        fetchNamespaceList(),
        fetchDatastoreList()
    ]);

    if (!featureLayerRes.data || !datastoreRes.data || !namespacesRes.data) {
        notFound()
    }

    let forceSpatialRef = null;
    if(featureLayerRes.data.spatialReferenceId) {
        forceSpatialRef = await fetchSpatialRefById(featureLayerRes.data.spatialReferenceId)
    }

    const updateFeatureLayerById = updateFeatureLayer.bind(null, params.id)

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
                            <BreadcrumbPage>Edit</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>FeatureLayer Details</CardTitle>
                        <CardDescription>
                            edit featureLayer.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FeatureLayerForm 
                        featureLayer={featureLayerRes.data} 
                        datastores={datastoreRes.data} 
                        namespaces={namespacesRes.data} 
                        forceSpatialRef={forceSpatialRef?.data || null}
                        handleSubmit={updateFeatureLayerById}/>
                    </CardContent>
                </Card>
            </main>
        </>

    );
}