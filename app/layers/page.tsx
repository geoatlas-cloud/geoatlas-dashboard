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
import { CreateFeatureLayer } from "@/components/namespace-button"

import { pageFeatureLayer, removeFeatureLayer } from "@/lib/action"
import { getGeomType } from "@/lib/utils"

export default async function FeatureLayers({
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
    const pageData = await pageFeatureLayer(pageRequest)
    const index = pageData.data.number * pageData.data.size;
    const end = index + pageData.data.size > pageData.data.totalElements ? pageData.data.totalElements : index + pageData.data.size
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>FeatureLayers</CardTitle>
                    <CardDescription>
                        Manage your feature layer.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between gap-4">
                        <Search placeholder="Search layer..." />
                        <CreateFeatureLayer />
                    </div>

                    <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>GeometryType</TableHead>
                                <TableHead>Native SRID</TableHead>
                                <TableHead>Force CRS</TableHead>
                                {/* <TableHead className="hidden md:table-cell">Description</TableHead> */}
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pageData.data.content.map((featureLayer: any) => {
                                const removeFeatureLayerById = removeFeatureLayer.bind(null, featureLayer.id)
                                return (<TableRow key={featureLayer.id}>
                                    <TableCell>
                                        {/* <Badge variant="outline">{namespace.id}</Badge> */}
                                        {featureLayer.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{featureLayer.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {featureLayer.view.sql}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{getGeomType(featureLayer.view.geometryType)}</TableCell>
                                    <TableCell className="hidden md:table-cell">{featureLayer.view.srid}</TableCell>
                                    <TableCell className="hidden md:table-cell">{featureLayer.spatialReferenceId ? featureLayer.spatialReferenceInfo.srid: ""}</TableCell>
                                    {/* <TableCell className="hidden md:table-cell">
                                        {featureLayer.description}
                                    </TableCell> */}
                                    <TableCell className="hidden md:table-cell">
                                        {featureLayer.created}
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
                                                        href={`/layers/${featureLayer.id}/edit`}
                                                        className="flex items-center rounded-lg text-muted-foreground transition-all hover:text-primary"
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-muted">
                                                    <form action={removeFeatureLayerById}
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
