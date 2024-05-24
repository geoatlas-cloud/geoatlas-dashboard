"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Namespace, Datastore, FeatureLayer, GeometryType } from "@/lib/definitions"
import { Check, ChevronsUpDown } from "lucide-react"
import { useDebouncedCallback } from 'use-debounce';
import { cn } from "@/lib/utils"
import { pageSpatialRef } from "@/lib/action"

const FormSchema = z.object({

    namespaceId: z.string({ required_error: "Please select an namespace.", }).transform((val, ctx) => {
        const parsed = parseFloat(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid number format",
            });
            return z.NEVER;
        }
        return parsed;
    }),
    datastoreId: z.string({ required_error: "Please select an datastore.", }).transform((val, ctx) => {
        const parsed = parseFloat(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid number format",
            });
            return z.NEVER;
        }
        return parsed;
    }),
    spatialReferenceId: z.number().gt(0).nullable(),
    name: z.string().min(1, {
        message: "name must be at least 1 characters.",
    }).max(50, {
        message: "name must not be longer than 50 characters."
    }),
    view: z.object({
        sql: z.string({ required_error: "Please fill in the sql value.", }),
        pkColumns: z.string({ required_error: "Please fill in the pkColumns value.", }),
        geometryColumn: z.string({ required_error: "Please fill in the geometryColumn value.", }),
        geometryType: z.nativeEnum(GeometryType),
        srid: z.string({ required_error: "Please fill in the srid value.", }).transform((val, ctx) => {
            const parsed = parseFloat(val);
            if (isNaN(parsed)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Invalid number format",
                });
                return z.NEVER;
            }
            return parsed;
        })
    }),

    description: z.string().max(200, {
        message: "description must not be longer than 200 characters."
    })
})
const initSpatialRefs: any = []
// 后续在添加类型
export default function FeatureLayerForm({ featureLayer, namespaces, datastores, handleSubmit }: { featureLayer: FeatureLayer, namespaces: Namespace[], datastores: Datastore[], handleSubmit: Function }) {

    const [spatialRefs, setSpatialRefs] = useState(initSpatialRefs)
    const [spatialRefParam, setSpatialRefParam] = useState("")

    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const { data } = await pageSpatialRef({ page: 1, size: 6, name: spatialRefParam });
            console.log(data)
            if (!ignore) {
                console.log("--set--")
                console.log(data.content)
                setSpatialRefs(data.content);
            }
        }
        startFetching();
        return () => {
            ignore = true;
        };
    }, [spatialRefParam])

    const handleSearch = useDebouncedCallback((param) => {
        console.log(param)
        setSpatialRefParam(param)
    }, 300);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: featureLayer,
        values: featureLayer
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleSubmit(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="namespaceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Namespace</FormLabel>
                            {/* field.value === -1 ? "" : field.value.toString() 这里是因为给定的namespaceId是number类型, -1是初始化默认值, 真实值都大于0 */}
                            <Select onValueChange={field.onChange} defaultValue={field.value === -1 ? "" : field.value.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a namespace to bind" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {namespaces.map(namespace => <SelectItem key={namespace.id} value={namespace.id.toString()}>{namespace.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                to bind namespace.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="datastoreId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Datastore</FormLabel>
                            {/* field.value === -1 ? "" : field.value.toString() 这里是因为给定的namespaceId是number类型, -1是初始化默认值, 真实值都大于0 */}
                            <Select onValueChange={field.onChange} defaultValue={field.value === -1 ? "" : field.value.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a datastore to bind" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {datastores.map(datastore => <SelectItem key={datastore.id} value={datastore.id.toString()}>{datastore.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                to bind datastore.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="spatialReferenceId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Force SpatialReference</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[240px] justify-between",
                                                field.value === null && "text-muted-foreground",
                                            )}
                                        >
                                            {(field.value)
                                                ? spatialRefs.find(
                                                    (_spatialRef: any) => _spatialRef.id === field.value
                                                )?.name || "Select SpatialReference"
                                                : "Select SpatialReference"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[240px] p-0">
                                    <Command>
                                        <CommandInput onValueChange={handleSearch} placeholder="Search spatialRef..." />
                                        {spatialRefs.length === 0 && <CommandEmpty>No spatialReference found.</CommandEmpty>}
                                        <CommandGroup forceMount>
                                            {/* https://github.com/shadcn-ui/ui/issues/2980 */}
                                            {/* undefined is not iterable (cannot read property Symbol(Symbol.iterator)) */}
                                            <CommandList>
                                                {spatialRefs.map((spatialRef: any) => (
                                                    <CommandItem
                                                        value={spatialRef.id}
                                                        key={spatialRef.id}
                                                        onSelect={() => {
                                                            form.setValue("spatialReferenceId", spatialRef.id)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                spatialRef.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {spatialRef.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This configuration is used to override Native SRID, which is used to force override when the coordinate system definition of the source data is incorrect.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="view.sql"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SQL</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="select xxx from xxx"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is sql.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="view.pkColumns"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PkColumns</FormLabel>
                            <FormControl>
                                <Input placeholder="id," {...field} />
                            </FormControl>
                            <FormDescription>
                                This is pk columns for target table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="view.geometryColumn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GeomeryColumn</FormLabel>
                            <FormControl>
                                <Input placeholder="geom" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is geometryColumn of source table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="view.geometryType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Geometry Type</FormLabel>
                            <FormControl>
                                <Input placeholder="4" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is geometryType of source table.[1: Point, 2: LineString, 3: Polygon, 4: Geometry]
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="view.srid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Native SRID</FormLabel>
                            <FormControl>
                                <Input placeholder="3857" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is native srid of source table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="description"
                                    className="resize-none"
                                    {...field}
                                />

                            </FormControl>
                            <FormDescription>
                                This is description of datastore.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}