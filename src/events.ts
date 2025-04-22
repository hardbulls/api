import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import { JSDOM } from "jsdom";
import { createHash } from 'crypto';

import https from 'https';
import path from 'path';
import { IncomingMessage } from 'http';

async function downloadImage(url: string, filepath: string): Promise<void> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to download image, status code: ${res.status}`);
    }

    await fs.mkdir(path.dirname(filepath), { recursive: true });

    const buffer = await res.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(buffer));
}

export async function fetchEvents(url: string, imageDir: string): Promise<any> {
    const html = await (await fetch(url, { method: 'GET' })).text();
    const dom = new JSDOM(html);

    // Try to get the <base> tag if it exists, otherwise use the provided URL
    const baseTag = dom.window.document.querySelector('base');
    let baseUrl: string;

    if (baseTag && baseTag.href) {
        // If there's a <base> tag with an href attribute, use that as the base URL
        baseUrl = new URL(baseTag.href, url).href;  // Resolve it relative to the provided URL
    } else {
        // If no <base> tag is found, use the URL provided to the function
        const { protocol, host, pathname } = new URL(url);
        baseUrl = `${protocol}//${host}${pathname}`;
    }

    const table = dom.window.document.querySelector('table');

    if (!table) {
        return [];
    }

    const headers: string[] = [];
    const headerCells = table.querySelectorAll('tr:first-child th, tr:first-child td');

    for (const headerCell of headerCells) {
        headers.push(headerCell.textContent?.trim() || '');
    }

    const rows: any[] = [];
    const bodyRows = table.querySelectorAll('tr:nth-child(n+2)');

    for (const row of bodyRows) {
        const rowData: { [key: string]: string | string[] } = {};

        const cells = row.querySelectorAll('td');

        for (const [index, cell] of Array.from(cells).entries()) {
            const key = headers[index];

            const img = cell.querySelector('img');

            if (img) {
                let imageUrl = img.getAttribute('src');

                // If the image URL is relative, resolve it to an absolute URL using the baseUrl
                if (imageUrl && !imageUrl.startsWith('http')) {
                    // Resolve relative URL to an absolute URL
                    imageUrl = new URL(imageUrl, baseUrl).href;
                }

                rowData[key] = imageUrl || '';
            } else {
                const value = cell.textContent?.trim() || '';
                rowData[key] = value;
            }
        }

        rows.push(rowData);
    }

    let transformedRows = [];

    for (const row of rows) {
        const title = {
            de: row['title.de'],
            en: row['title.en']
        };

        const description = {
            de: row['description.de'],
            en: row['description.en']
        };

        let image = null;

        if (row.image) {
            const filename = createHash('md5').update(JSON.stringify(row.image)).digest('hex');

            await downloadImage(row.image, path.resolve(path.join(imageDir, filename)));

            image = filename
        }

        transformedRows.push({
            title,
            description,
            date: row.date,
            venue: row.venue,
            image: image
        });
    }

    console.log(transformedRows);

    return transformedRows;
}
