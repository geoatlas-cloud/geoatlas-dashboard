'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AppConfig } from './AppConfig';

export async function getDashboardTotalCount() {
    const res = await fetch(`${AppConfig.backend.endpoint}/v1/dashboard/count`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function getDashboardRecentLayers() {
    noStore();
    const res = await fetch(`${AppConfig.backend.endpoint}/v1/dashboard/layers/recent`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function getDashboardActiveLayers() {
    const res = await fetch(`${AppConfig.backend.endpoint}/v1/dashboard/layers/active`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

// NameSpaces
const pageNamespacesBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/namespaces/page`
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

const namespaceBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/namespaces`
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

export async function fetchNamespaceList() {
    const finalUrl = `${namespaceBaseUrl}/list`
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


// Datastore
const pageDatastoreBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/datastores/page`
const datastoreBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/datastores`
export async function pageDatastores(pageRequest: { page: number, size: number, name?: string | null }) {
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
    const url = `${pageDatastoreBaseUrl}?${[params.toString()]}`
    const res = await fetch(url)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function fetchDatastoreList() {
    const finalUrl = `${datastoreBaseUrl}/list`
    const res = await fetch(finalUrl)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function createDatastore(data: any) {
    // console.log(data)
    const res = await fetch(datastoreBaseUrl, {
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
    revalidatePath('/datastores');
    redirect('/datastores');
}

export async function fetchDatastoreById(id: string) {
    const finalUrl = `${datastoreBaseUrl}/${id}`
    const res = await fetch(finalUrl)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

// 这里的id应该是number类型才对, 不过服务端的类型转换给兜底了
export async function updateDatastore(id: string, data: any) {

    const finalData = {
        ...data,
        id
    }
    // console.log(finalData)
    const res = await fetch(datastoreBaseUrl, {
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
    revalidatePath('/datastores');
    redirect('/datastores');
}

export async function removeDatastore(id: string) {
    const finalUrl = `${datastoreBaseUrl}/${id}`
    const res = await fetch(finalUrl, {
        method: "DELETE",
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to create namespace.')
    }
    revalidatePath('/datastores');
}

// Datastore
const pageLayerBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/feature_layers/page`
const layerBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/feature_layers`
export async function pageFeatureLayer(pageRequest: { page: number, size: number, name?: string | null }) {
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
    const url = `${pageLayerBaseUrl}?${[params.toString()]}`
    // console.log(url)
    const res = await fetch(url)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function createFeatureLayer(data: any) {
    // 目前认为没有必要单独为viwe填写name, 所以直接在此处用featureLayer的name赋值给view的name
    data.view.name = data.name;
    // console.log(data)
    const res = await fetch(layerBaseUrl, {
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
    revalidatePath('/layers');
    redirect('/layers');
}

export async function fetchFeatureLayerById(id: string) {
    const finalUrl = `${layerBaseUrl}/${id}`
    const res = await fetch(finalUrl)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

// 这里的id应该是number类型才对, 不过服务端的类型转换给兜底了
export async function updateFeatureLayer(id: string, data: any) {
    // 目前认为没有必要单独为viwe填写name, 所以直接在此处用featureLayer的name赋值给view的name
    data.view.name = data.name;
    const finalData = {
        ...data,
        id
    }
    // console.log(finalData)
    const res = await fetch(layerBaseUrl, {
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
    revalidatePath('/layers');
    redirect('/layers');
}

export async function removeFeatureLayer(id: string) {
    const finalUrl = `${layerBaseUrl}/${id}`
    const res = await fetch(finalUrl, {
        method: "DELETE",
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to create namespace.')
    }
    revalidatePath('/layers');
}

// SpatialRef
const pageSpatialRefBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/spatial_refs/page`
export async function pageSpatialRef(pageRequest: { page: number, size: number, name?: string | null }) {
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
    const url = `${pageSpatialRefBaseUrl}?${[params.toString()]}`
    const res = await fetch(url)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

const spatialRefBaseUrl = `${AppConfig.backend.endpoint}/v1/metadata/spatial_refs`
export async function fetchSpatialRefById(id: number) {
    noStore();
    const finalUrl = `${spatialRefBaseUrl}/${id}`
    const res = await fetch(finalUrl)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

// Feature Layer Preview

export async function fetchLayrePreviewInfo(id: string) {
    noStore()
    const finalUrl = `${layerBaseUrl}/preview/${id}`
    const res = await fetch(finalUrl)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}