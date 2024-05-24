import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DynamicPagination from "@/components/dynamic-pagination"
import Search from "@/components/search"
import { CreateDatastore } from "@/components/namespace-button"

import { pageDatastores, removeDatastore } from "@/lib/action"

export default async function Datastores({
    searchParams,
}: {
    searchParams?: {
        name?: string;
        page?: string;
        size?: string;
    };
}) {
    let pageRequest = {
        name: searchParams?.name || null,
        page: Number(searchParams?.page) || 1,
        size: Number(searchParams?.size) || 6
    }
    const pageData = await pageDatastores(pageRequest)
    const index = pageData.data.number * pageData.data.size;
    const end = index + pageData.data.size > pageData.data.totalElements ? pageData.data.totalElements : index + pageData.data.size
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Datastores</CardTitle>
                    <CardDescription>
                        Manage your datastores.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between gap-4">
                        <Search placeholder="Search datastore..." />
                        <CreateDatastore />
                    </div>

                    <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Hosted</TableHead>
                                <TableHead>Database</TableHead>
                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pageData.data.content.map((datastore: any) => {
                                const removeDatastoreById = removeDatastore.bind(null, datastore.id)
                                return (<TableRow key={datastore.id}>
                                    <TableCell>
                                        {/* <Badge variant="outline">{namespace.id}</Badge> */}
                                        {datastore.id}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {datastore.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{datastore.type}</TableCell>
                                    <TableCell className="hidden md:table-cell">{`${datastore.host}:${datastore.port}`}</TableCell>
                                    <TableCell className="hidden md:table-cell">{datastore.database}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {datastore.description}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {datastore.created}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" >
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="hover:bg-muted">
                                                    <Link
                                                        href={`/datastores/${datastore.id}/edit`}
                                                        className="flex items-center rounded-lg text-muted-foreground transition-all hover:text-primary"
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-muted">
                                                    <form action={removeDatastoreById}
                                                        className="flex items-center"
                                                    >
                                                        <button className="flex items-center rounded-lg text-muted-foreground transition-all hover:text-primary">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </form>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{index}-{end}</strong> of <strong>{pageData.data.totalElements}</strong> namespaces
                    </div>

                </CardFooter>
                <DynamicPagination totalPages={pageData.data.totalPages} />
            </Card>
        </main>
    )
}
