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

import { createDatastore, fetchNamespaceList } from "@/lib/action"
import DatastoreForm from "@/components/datastore-form"
import { DatabaseType, Datastore } from "@/lib/definitions"

const initDatastore : Datastore = {
    namespaceId: -1,
    name: "",
    description: "",
    type: DatabaseType.postgis,
    host: "",
    port: "",
    schema: "",
    database: "",
    user: "",
    password: "",
    maxConnections: -1,
    minConnections: -1,
    connectionTimeout: -1,
    validateConnections: true,
    fetchSize: -1
}

export default async function CreateDatastore() {

    const namespacesRes = await fetchNamespaceList()

    if(!namespacesRes.data){
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
                                <Link href="/datastores">Datastores</Link>
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
                        <CardTitle>Datastore Details</CardTitle>
                        <CardDescription>
                            create datastore
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatastoreForm datastore={initDatastore} namespaces={namespacesRes.data} handleSubmit={createDatastore} />
                    </CardContent>
                </Card>
            </main>
        </>
    );
}