'use server';

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