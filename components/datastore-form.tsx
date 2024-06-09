"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Namespace, DatabaseType, Datastore } from "@/lib/definitions"

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "name must be at least 1 characters.",
    }).max(50, {
        message: "name must not be longer than 50 characters."
    }),
    namespaceId: z.coerce.number({ required_error: "Please select an namespace.", }).gt(0),
    description: z.string().max(200, {
        message: "description must not be longer than 200 characters."
    }),
    type: z.nativeEnum(DatabaseType),
    host: z.string().ip({
        version: "v4",
        message: "Invalid IP address"
    }),
    port: z.string({ required_error: "Please fill in the port value.", }).max(6, {
        message: "port must not be longer than 6 characters."
    }),
    schema: z.string().max(50, {
        message: "schema must not be longer than 50 characters."
    }),
    database: z.string({ required_error: "Please fill in the database value.", }).max(50, {
        message: "database must not be longer than 50 characters."
    }),
    user: z.string({ required_error: "Please fill in the user value.", }).max(100, {
        message: "user must not be longer than 50 characters."
    }),
    password: z.string({ required_error: "Please fill in the password value.", }).max(50, {
        message: "password must not be longer than 50 characters."
    }),
    maxConnections: z.number().gte(-1),
    minConnections: z.number().gte(-1),
    connectionTimeout: z.number().gte(-1),
    validateConnections: z.boolean(),
    fetchSize: z.number()
})

// 后续在添加类型
export default function DatastoreForm({ datastore, namespaces, handleSubmit }: { datastore: Datastore, namespaces: Namespace[], handleSubmit: Function }) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: datastore,
        values: datastore
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleSubmit(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input placeholder="postgis" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is type of datastore engine.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="host"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Host</FormLabel>
                            <FormControl>
                                <Input placeholder="127.0.0.1" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is host of datastore instance.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Port</FormLabel>
                            <FormControl>
                                <Input placeholder="5432" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is port of datastore instance.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="schema"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Schema</FormLabel>
                            <FormControl>
                                <Input placeholder="public" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is schema of datastore instance.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="database"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Database Name</FormLabel>
                            <FormControl>
                                <Input placeholder="5432" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is database of datastore instance.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="postgre?" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is username of datastore instance.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input placeholder="****" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is password of datastore instance.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="maxConnections"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MaxConnections</FormLabel>
                            <FormControl>
                                <Input placeholder="-1" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is maxConnections of connections.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="minConnections"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MinConnections</FormLabel>
                            <FormControl>
                                <Input placeholder="-1" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is minConnections of connections.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="connectionTimeout"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ConnectionTimeout</FormLabel>
                            <FormControl>
                                <Input placeholder="-1" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is connectionTimeout of connections.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="validateConnections"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    ValidateConnections
                                </FormLabel>
                                <FormDescription>
                                    This is validateConnections of connections.
                                    {/* <Link href="/examples/forms">mobile settings</Link> page. */}
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fetchSize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>fetchSize</FormLabel>
                            <FormControl>
                                <Input placeholder="5000" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is fetchSize of each reading.
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