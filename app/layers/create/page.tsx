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
import { notFound } from "next/navigation"

import { createFeatureLayer, fetchNamespaceList, fetchDatastoreList, pageSpatialRef } from "@/lib/action"
import FeatureLayerForm from "@/components/layer-form"
import { initFeatureLayer, Datastore } from "@/lib/definitions"


export default async function CreateDatastore() {

    const [namespacesRes, datastoresRes, spatialRefsRes] = await Promise.all([
        fetchNamespaceList(),
        fetchDatastoreList(),
        pageSpatialRef({page: 1, size: 6}),
    ]);

    if(!namespacesRes.data || !datastoresRes.data){
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
                            <BreadcrumbPage>Create</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>FeatureLayer Details</CardTitle>
                        <CardDescription>
                            create featureLayer.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FeatureLayerForm featureLayer={initFeatureLayer} namespaces={namespacesRes.data} datastores={datastoresRes.data} handleSubmit={createFeatureLayer} />
                    </CardContent>
                </Card>
            </main>
        </>
    );
}