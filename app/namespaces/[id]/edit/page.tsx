"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

import { fetchNamespaceById, updateNamespace } from "@/lib/action"

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "name must be at least 1 characters.",
    }).max(50, {
        message: "name must not be longer than 50 characters."
    }),
    uri: z.string(),
    description: z.string().max(200, {
        message: "description must not be longer than 200 characters."
    })
})

const initNamespace = () => {
    return {
        name: "",
        uri: "",
        description: ""
    }
}

export default function EditNamespace({ params }: { params: { id: string } }) {
    const [namespace, setNamespace] = useState(initNamespace)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: namespace,
        values: namespace
    })

    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const {data} = await fetchNamespaceById(id);
            if (!ignore) {
                setNamespace(data);
            }
        }
        startFetching();
        return () => {
            ignore = true;
        };
    }, [params.id])
    const id = params.id;

    const updateNamespaceWithId = updateNamespace.bind(null, id);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        updateNamespaceWithId(data)
        // debugger
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
                                <Link href="/namespaces">Namespaces</Link>
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
                        <CardTitle>Namespace Details</CardTitle>
                        <CardDescription>
                            edit namespace
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name" {...field} defaultValue={namespace.name} />
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
                                    name="uri"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Uri</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://geo-atlas.org" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is uri prefix of namespace (maybe).
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
                                                This is description of namespace.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <Toaster />
            </main>
        </>

    );
}