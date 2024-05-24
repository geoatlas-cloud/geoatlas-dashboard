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
import DatastoreForm from "@/components/datastore-form"
import { notFound } from 'next/navigation';

import { fetchDatastoreById, updateDatastore, fetchNamespaceList } from "@/lib/action"

export default async function EditDatastore({ params }: { params: { id: string } }) {

    const [datastoreRes, namespacesRes] = await Promise.all([
        fetchDatastoreById(params.id),
        fetchNamespaceList(),
    ]);

    if (!datastoreRes.data || !namespacesRes.data) {
        notFound()
    }

    const updateDatastoreWithId = updateDatastore.bind(null, params.id)

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
                                <Link href="/datastores">Datastores</Link>
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
                        <CardTitle>Datastore Details</CardTitle>
                        <CardDescription>
                            edit datastore.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatastoreForm datastore={datastoreRes.data} namespaces={namespacesRes.data} handleSubmit={updateDatastoreWithId}/>
                    </CardContent>
                </Card>
            </main>
        </>

    );
}