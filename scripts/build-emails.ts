import { build } from 'esbuild';
import { readdirSync } from 'fs';
import { join } from 'path';

const email_dir = 'api/_src/emails';

const find_tsx_files = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full_path = join(dir, entry.name);
        return entry.isDirectory()
            ? find_tsx_files(full_path)
            : entry.name.endsWith('.tsx')
              ? [full_path]
              : [];
    });

const files = find_tsx_files(email_dir);

await build({
    entryPoints: files,
    outdir: email_dir,
    format: 'esm',
    jsx: 'automatic',
    platform: 'node',
    bundle: false,
});
