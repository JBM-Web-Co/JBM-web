import { z } from 'zod';
import { HttpError } from './utils/http-error.js';
import type { ContactSchema } from './utils/contact-schema.js';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT ?? '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? '';
const AIRTABLE_LEADS_TABLE = process.env.AIRTABLE_LEADS_TABLE ?? '';
const AIRTABLE_CLIENTS_TABLE = process.env.AIRTABLE_CLIENTS_TABLE ?? '';
const AIRTABLE_URL = 'https://api.airtable.com/v0/';

const assert_config = (): void => {
    if (
        !AIRTABLE_PAT ||
        !AIRTABLE_BASE_ID ||
        !AIRTABLE_LEADS_TABLE ||
        !AIRTABLE_CLIENTS_TABLE
    ) {
        throw new HttpError(400, 'Airtable configuration is missing');
    }
};

const airtable_url = (table: string): string =>
    `${AIRTABLE_URL}${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;

const airtable_fetch = async (
    url: string,
    init: RequestInit
): Promise<Response> =>
    await fetch(url, {
        ...init,
        headers: {
            Authorization: `Bearer ${AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
        },
    });

const read_json_unknown = async (resp: Response): Promise<unknown> => {
    try {
        return JSON.parse(await resp.text());
    } catch {
        throw new HttpError(500, 'Airtable returned invalid JSON');
    }
};

// Airtable returns { records: [{ id, fields: {...}}] }
const airtable_list_schema = z.object({
    records: z.array(z.object({ id: z.string() })),
});

const airtable_create_schema = z.object({
    records: z.array(z.object({ id: z.string() })).min(1),
});

const find_client_id = async (email: string): Promise<string | null> => {
    const url = new URL(airtable_url(AIRTABLE_CLIENTS_TABLE));
    url.searchParams.set('maxRecords', '1');
    url.searchParams.set('filterByFormula', `{email}='${email}'`);

    const resp = await airtable_fetch(url.toString(), { method: 'GET' });

    if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new HttpError(
            500,
            `Failed to query client: ${resp.status} ${resp.statusText}${text ? ` - ${text}` : ''}`
        );
    }

    const parsed = airtable_list_schema.safeParse(
        await read_json_unknown(resp)
    );
    if (!parsed.success) {
        throw new HttpError(
            500,
            'Unexpected Airtable response while querying client'
        );
    }

    return parsed.data.records[0]?.id ?? null;
};

const create_client = async (data: ContactSchema): Promise<string> => {
    const body = {
        records: [
            {
                fields: {
                    name: data.name,
                    email: data.email.trim(),
                    phone: data.phone,
                    preferred_contact: data.preferredContact,
                },
            },
        ],
    };

    const resp = await airtable_fetch(airtable_url(AIRTABLE_CLIENTS_TABLE), {
        method: 'POST',
        body: JSON.stringify(body),
    });

    if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new HttpError(
            500,
            `Failed to save client: ${resp.status} ${resp.statusText}${text ? ` - ${text}` : ''}`
        );
    }

    const parsed = airtable_create_schema.safeParse(
        await read_json_unknown(resp)
    );
    if (!parsed.success) {
        throw new HttpError(
            500,
            'Unexpected Airtable response while creating client'
        );
    }

    return parsed.data.records[0].id;
};

const create_lead = async (
    data: ContactSchema,
    client_id: string
): Promise<void> => {
    const body = {
        records: [
            {
                fields: {
                    message: data.message ?? '',
                    client_id: [client_id],
                },
            },
        ],
    };

    const resp = await airtable_fetch(airtable_url(AIRTABLE_LEADS_TABLE), {
        method: 'POST',
        body: JSON.stringify(body),
    });

    if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new HttpError(
            500,
            `Failed to save lead: ${resp.status} ${resp.statusText}${text ? ` - ${text}` : ''}`
        );
    }
};

export const sendLeadToAirtable = async (
    data: ContactSchema
): Promise<void> => {
    assert_config();

    const client_id =
        (await find_client_id(data.email)) ?? (await create_client(data));
    await create_lead(data, client_id);
};
