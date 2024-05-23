'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getDashboardTotalCount() {
    const res = await fetch('http://192.168.199.247:2024/v1/dashboard/count')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function getDashboardRecentLayers() {
    const res = await fetch('http://192.168.199.247:2024/v1/dashboard/layers/recent')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function getDashboardActiveLayers() {
    const res = await fetch('http://192.168.199.247:2024/v1/dashboard/layers/active')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

// NameSpaces
const pageNamespacesBaseUrl = "http://192.168.199.247:2024/v1/metadata/namespaces/page"
export async function pageNamespaces(pageRequest: { page: number, size: number, name?: string | null }) {
    noStore();
    const { page, size, name } = pageRequest
    const params = new URLSearchParams();
    if (name) {
        params.set('name', name)
    }
    // 因为我使用JPA, JPA分页码从0开始
    const finalPage = page === 0 ? 0 : page - 1;
    params.set('page', finalPage.toString())
    params.set('size', size.toString())
    const url = `${pageNamespacesBaseUrl}?${[params.toString()]}`
    const res = await fetch(url)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

const namespaceBaseUrl = "http://192.168.199.247:2024/v1/metadata/namespaces"
export async function createNamespace(data: any) {

    const res = await fetch(namespaceBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to create namespace.')
    }
    revalidatePath('/namespaces');
    redirect('/namespaces');
}

export async function fetchNamespaceById(id: string) {
    const finalUrl = `${namespaceBaseUrl}/${id}`
    const res = await fetch(finalUrl)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function removeNamespace(id: string) {
    const finalUrl = `${namespaceBaseUrl}/${id}`
    const res = await fetch(finalUrl, {
        method: "DELETE",
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to create namespace.')
    }
    revalidatePath('/namespaces');
}

export async function updateNamespace(id: string, data: any) {

    const finalData = {
        ...data,
        id
    }
    const res = await fetch(namespaceBaseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(finalData), // body data type must match "Content-Type" header
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to create namespace.')
    }
    revalidatePath('/namespaces');
    redirect('/namespaces');
}