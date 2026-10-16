import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

const indexUrl = new URL('../dist/index.html', import.meta.url);
const template = await readFile(indexUrl, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error('O ponto de montagem do React não foi encontrado no HTML.');

const markup = render();
if (!markup.includes('Terceiro Setor') || !markup.includes('<h1')) throw new Error('A pré-renderização não contém o conteúdo institucional.');
await writeFile(indexUrl, template.replace(placeholder, () => `<div id="root">${markup}</div>`));
await rm(new URL('../.prerender/', import.meta.url), { recursive: true, force: true });
console.log('HTML institucional pré-renderizado; o navegador hidrata apenas a interatividade.');
