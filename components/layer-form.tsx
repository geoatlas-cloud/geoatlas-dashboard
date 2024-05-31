"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Namespace, Datastore, FeatureLayer, GeometryType } from "@/lib/definitions"
import { Check, ChevronsUpDown } from "lucide-react"
import { useDebouncedCallback } from 'use-debounce';
import { cn } from "@/lib/utils"
import { pageSpatialRef } from "@/lib/action"

const FormSchema = z.object({

    namespaceId: z.coerce.number({ required_error: "Please select an namespace.", }).gt(0),
    datastoreId: z.coerce.number({ required_error: "Please select an datastore.", }).gt(0),
    spatialReferenceId: z.coerce.number().gt(0).nullable(),
    name: z.string().min(1, {
        message: "name must be at least 1 characters.",
    }).max(50, {
        message: "name must not be longer than 50 characters."
    }),
    view: z.object({
        id: z.nullable(z.coerce.number()),
        sql: z.string({ required_error: "Please fill in the sql value.", }),
        pkColumns: z.string({ required_error: "Please fill in the pkColumns value.", }),
        geometryColumn: z.string({ required_error: "Please fill in the geometryColumn value.", }),
        geometryType: z.nativeEnum(GeometryType),
        srid: z.coerce.number({ required_error: "Please fill in the srid value.", }).gte(0)
    }),
    enabledRules: z.boolean(),
    enableBBox: z.boolean(),
    rules: z.array(
        z.object({
            id: z.nullable(z.coerce.number()),
            minLevel: z.coerce.number({ required_error: "Please input the min level.", }).gte(0).lte(30),
            maxLevel: z.coerce.number({ required_error: "Please input the max level.", }).gte(0).lte(30),
            filter: z.coerce.string({ required_error: "Please input the rule filter expression.", }),
        })
    ).optional(),
    bbox: z.object({
        id: z.nullable(z.coerce.number()),
        minx: z.coerce.number({ required_error: "Please input the min x.", }),
        miny: z.coerce.number({ required_error: "Please input the min y.", }),
        maxx: z.coerce.number({ required_error: "Please input the max x.", }),
        maxy: z.coerce.number({ required_error: "Please input the max y.", }),
        natived: z.coerce.boolean({ required_error: "Please input the natived.", }),
    }).nullable(),
    description: z.string().max(200, {
        message: "description must not be longer than 200 characters."
    })
})
const initSpatialRefs: any = []
// 后续在添加类型
export default function FeatureLayerForm({
    featureLayer, namespaces, datastores, forceSpatialRef, handleSubmit
}: { featureLayer: FeatureLayer, namespaces: Namespace[], datastores: Datastore[], forceSpatialRef?: any, handleSubmit: Function }) {

    const [spatialRefs, setSpatialRefs] = useState(initSpatialRefs)
    const [isEnableRules, setIsEnableRules] = useState((featureLayer.rules !== null && featureLayer.rules.length > 0))
    const [isEnableBBox, setIsEnableBBox] = useState(featureLayer.bbox !== null)
    const [spatialRefParam, setSpatialRefParam] = useState(forceSpatialRef?.name || "")

    featureLayer.enabledRules = (featureLayer.rules !== null && featureLayer.rules.length > 0)
    featureLayer.enableBBox = featureLayer.bbox !== null
    
    // console.log(featureLayer)
    // console.log((featureLayer.rules !== null && featureLayer.rules.length > 0))

    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const { data } = await pageSpatialRef({ page: 1, size: 6, name: spatialRefParam });
            // console.log(data)
            if (!ignore) {
                // console.log("--set--")
                // console.log(data.content)
                setSpatialRefs(data.content);
            }
        }
        startFetching();
        return () => {
            ignore = true;
        };
    }, [spatialRefParam])

    const handleSearch = useDebouncedCallback((param) => {
        // console.log(param)
        setSpatialRefParam(param)
    }, 300);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: featureLayer,
        values: featureLayer
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!isEnableRules) {
            data.rules = [];
        }
        // console.log(data)
        // if(isEnableBBox && data.bbox && data.bbox.natived === null) {
        //     data.bbox.natived = false
        // }
        // console.log(data)
        handleSubmit(data)
    }

    const { fields, append, remove } = useFieldArray({
        name: "rules",
        control: form.control,
    })

    function onEnableRulesChange(value: boolean) {
        setIsEnableRules(value)
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
                    name="view.id"
                    render={({ field }) => (
                        <FormItem className="hidden">
                            <FormLabel>
                                view id
                            </FormLabel>
                            <FormDescription>
                                id.
                            </FormDescription>
                            <FormControl>
                                <Input {...field} value={field.value ? field.value : ""} type="number" />
                            </FormControl>
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
                    name="enabledRules"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={isEnableRules}
                                    onCheckedChange={onEnableRulesChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Enable Pyramid Rules
                                </FormLabel>
                                <FormDescription>
                                    This is validateConnections of connections.
                                    {/* <Link href="/examples/forms">mobile settings</Link> page. */}
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                {isEnableRules && (<div className="">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-row items-end space-x-2">
                            <FormField
                                control={form.control}
                                name={`rules.${index}.id`}
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                            Rule ID
                                        </FormLabel>
                                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                                            id.
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} value={field.value ? field.value : ""} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`rules.${index}.minLevel`}
                                render={({ field }) => (
                                    <FormItem className="flex-none w-20">
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                            MinLevel
                                        </FormLabel>
                                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                                            min level.
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} type="number" min={0} max={30} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`rules.${index}.maxLevel`}
                                render={({ field }) => (
                                    <FormItem className="flex-none w-20">
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                            MaxLevel
                                        </FormLabel>
                                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                                            max level.
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} type="number" min={0} max={30} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`rules.${index}.filter`}
                                render={({ field }) => (
                                    <FormItem className="flex-auto w-55">
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                            Rule Filter Expression
                                        </FormLabel>
                                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                                            CGL Expression.
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="flex-none w-15"
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ id: null, minLevel: 0, maxLevel: 0, filter: "EXCLUDE" })}
                    >
                        Add Rule
                    </Button>
                </div>)}

                <FormField
                    control={form.control}
                    name="enableBBox"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={isEnableBBox}
                                    onCheckedChange={(value: boolean) => setIsEnableBBox(value)}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Enable Feature BBox
                                </FormLabel>
                                <FormDescription>
                                    enable the feature layer bbox.
                                    {/* <Link href="/examples/forms">mobile settings</Link> page. */}
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                {isEnableBBox && (
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-row items-end space-x-2">
                            <FormField
                                control={form.control}
                                name="bbox.id"
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormLabel className="sr-only">
                                            BBox ID
                                        </FormLabel>
                                        <FormDescription className="sr-only">
                                            id.
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} value={field.value ? field.value : ""} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bbox.minx"
                                render={({ field }) => (
                                    <FormItem className="basis-1/4">
                                        <FormLabel>
                                            Min X
                                        </FormLabel>
                                        <FormDescription>
                                            {/* min x. */}
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bbox.miny"
                                render={({ field }) => (
                                    <FormItem className="basis-1/4">
                                        <FormLabel>
                                            Min Y
                                        </FormLabel>
                                        <FormDescription>
                                            {/* min y. */}
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bbox.maxx"
                                render={({ field }) => (
                                    <FormItem className="basis-1/4">
                                        <FormLabel>
                                            Max X
                                        </FormLabel>
                                        <FormDescription>
                                            {/* max x. */}
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bbox.maxy"
                                render={({ field }) => (
                                    <FormItem className="basis-1/4">
                                        <FormLabel>
                                            Max Y
                                        </FormLabel>
                                        <FormDescription>
                                            {/* max y. */}
                                        </FormDescription>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="bbox.natived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value === null ? false : field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Use Native SpatialReference.
                                        </FormLabel>
                                        <FormDescription>
                                            Use the native coordinate reference system to set the BBox.{field.value}
                                        </FormDescription>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                )}

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
        </Form >
    )
}