import { build } from 'esbuild';
import { readdirSync } from 'fs';
import { join } from 'path';

const email_dir = 'api/_src/emails';

const files = readdirSync(email_dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => join(email_dir, f));

await build({
    entryPoints: files,
    outdir: email_dir,
    format: 'esm',
    jsx: 'automatic',
    platform: 'node',
    bundle: false,
});
