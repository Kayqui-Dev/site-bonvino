import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PRACTICE_AREAS } from '../../src/practice-areas.js';
import { FIRM } from '../../src/site.js';

const VIEWPORTS = [
  [320, 568], [375, 667], [390, 844], [430, 932], [768, 1024],
  [1024, 768], [1280, 800], [1440, 900], [1920, 1080], [2560, 1440],
  [390, 206], [568, 320], [844, 390], [1024, 600], [1440, 480],
];

async function openSite(page, path = '/') {
  await page.goto(path);
  await page.locator('#areas[data-interactive="true"]').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function assertLayout(page) {
  const defects = await page.evaluate(() => {
    const issues = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('overflow do documento');
    if (['hidden', 'clip'].includes(getComputedStyle(document.body).overflowX)) issues.push('máscara global de overflow');
    const cabinet = document.querySelector('.dossier-cabinet');
    const openFolder = cabinet.querySelector('[data-open="true"]');
    if (getComputedStyle(cabinet).flexDirection === 'row' && openFolder?.getBoundingClientRect().width < Math.min(280, cabinet.clientWidth / 3)) issues.push('pasta expandida sem largura legível');
    for (const overlay of document.querySelectorAll('.partner-overlay')) {
      if (overlay.getBoundingClientRect().top < overlay.parentElement.getBoundingClientRect().top - 1) issues.push('nome do sócio recortado pela foto');
    }
    for (const element of document.querySelectorAll('main p, main h1, main h2, main h3, main h4, main label, main li, main dt, main dd, main a, main button, footer a, .section-label')) {
      if (!element.checkVisibility({ checkVisibilityCSS: true }) || element.closest('[hidden]')) continue;
      const rect = element.getBoundingClientRect();
      if (rect.right > innerWidth + 1 || rect.left < -1 || element.scrollWidth > element.clientWidth + 2) issues.push(element.textContent.trim().slice(0, 100));
    }
    return issues;
  });
  expect(defects).toEqual([]);
}

for (const [width, height] of VIEWPORTS) {
  test(`layout sem recortes em ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await openSite(page);
    await assertLayout(page);
    for (const area of PRACTICE_AREAS) {
      await page.locator(`#dossier-trigger-${area.id}`).click();
      if (area.id === 'criminal' && width < 1024) await page.locator(`#dossier-trigger-${area.id}`).click();
      await expect(page.locator(`#dossier-panel-${area.id}`)).toBeVisible();
      await assertLayout(page);
    }
    for (const section of ['#sobre', '#contato', '#footer']) {
      await page.locator(section).scrollIntoViewIfNeeded();
      await assertLayout(page);
    }
    await page.screenshot({ path: `/tmp/agent-browser/bonvino-production-${width}x${height}.png`, fullPage: true });
  });
}

test('menu curto tem rolagem, fecha ao navegar, com Escape e fora dele', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 206 });
  await openSite(page);
  const trigger = page.getByRole('button', { name: 'Abrir menu', exact: true });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(await page.locator('#mobile-navigation').evaluate((element) => element.scrollHeight > element.clientHeight && element.getBoundingClientRect().bottom <= innerHeight)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator('#mobile-navigation a[href="#contato"]').click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.click();
  await page.locator('#contact-title').click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('ação flutuante não encobre conteúdo em celular ou desktop', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await openSite(page);
  await page.locator('#areas').scrollIntoViewIfNeeded();
  await expect(page.locator('.whatsapp-float')).toBeHidden();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.evaluate(() => window.scrollTo({ top: document.getElementById('areas').offsetTop + 1, behavior: 'instant' }));
  await expect(page.locator('.whatsapp-float')).toBeVisible();
  expect(await page.locator('.whatsapp-float').evaluate((element) => element.getBoundingClientRect().left >= document.querySelector('.dossier-layout').getBoundingClientRect().right + 8)).toBe(true);
});

test('acordeão funciona com teclado e preserva uma pasta no desktop', async ({ page }) => {
  await openSite(page);
  const first = page.locator('#dossier-trigger-criminal');
  await first.focus();
  await page.keyboard.press('End');
  await expect(page.locator('#dossier-trigger-terceiro-setor')).toBeFocused();
  await expect(page.locator('#dossier-panel-terceiro-setor')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#dossier-panel-terceiro-setor')).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator('#areas button[aria-expanded="true"]')).toHaveCount(1);
});

test('links de todas as especialidades abrem a pasta correspondente', async ({ page }) => {
  await openSite(page);
  for (const area of PRACTICE_AREAS) {
    await page.locator(`footer a[href="#area-${area.id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#area-${area.id}$`));
    await expect(page.locator(`#dossier-panel-${area.id}`)).toBeVisible();
  }
  await page.goBack();
  await expect(page.locator('#dossier-panel-consumidor')).toBeVisible();
});

test('formulário valida, prepara sem enviar e permite edição', async ({ page }) => {
  await openSite(page);
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  await expect(page.locator('[role="alert"]')).toHaveCount(5);
  await expect(page.getByLabel('Nome completo *')).toBeFocused();
  await page.getByLabel('Nome completo *').fill('Pessoa de teste QA');
  await page.getByLabel('Telefone / WhatsApp *').fill('(11) 90000-0000');
  await page.getByLabel('E-mail *', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Área do direito *').selectOption('Terceiro Setor');
  await page.getByLabel('Resumo do caso *').fill('Solicito orientação sobre projetos e prestação de contas.');
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  await expect(page.getByRole('heading', { name: 'Mensagem pronta para envio' })).toBeFocused();
  await expect(page.getByText(/Nenhuma mensagem foi enviada ainda/)).toBeVisible();
  const url = new URL(await page.getByRole('link', { name: 'Continuar no WhatsApp' }).getAttribute('href'));
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe(`/${FIRM.phoneNumber}`);
  expect(url.searchParams.get('text')).toContain('Área: Terceiro Setor');
  await page.getByRole('button', { name: 'Editar dados' }).click();
  await expect(page.getByLabel('Nome completo *')).toHaveValue('Pessoa de teste QA');
  await expect(page.getByLabel('Nome completo *')).toBeFocused();
});

test('não publica relatos ilustrativos e mantém conteúdo oficial do Terceiro Setor', async ({ page }) => {
  await openSite(page, '/#area-terceiro-setor');
  await expect(page.locator('#depoimentos')).toHaveCount(0);
  await expect(page.getByText(/Exemplo ilustrativo|modelos ilustrativos|Depoimentos de clientes/)).toHaveCount(0);
  await expect(page.locator('#area-terceiro-setor')).toHaveCount(1);
  const area = PRACTICE_AREAS.find((entry) => entry.id === 'terceiro-setor');
  await expect(page.getByText(area.description, { exact: true })).toBeVisible();
  for (const front of area.fronts) await expect(page.getByText(front, { exact: true })).toBeVisible();
});

test('mapa não inicia conexões de terceiros antes da solicitação', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  await openSite(page);
  await page.locator('#contato').scrollIntoViewIfNeeded();
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(requests.filter((url) => /google\.com|googleapis\.com|gstatic\.com|unsplash\.com/.test(url))).toEqual([]);
  await page.getByRole('button', { name: 'Carregar mapa do Google' }).click();
  await expect(page.locator('iframe[title="Mapa do escritório na Avenida Paulista, 1636"]')).toHaveCount(1);
});

test('âncoras, links externos, metadados e console permanecem íntegros', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await openSite(page);
  expect(await page.locator('a[href^="#"]').evaluateAll((links) => links.filter((link) => !document.getElementById(link.getAttribute('href').slice(1))).map((link) => link.getAttribute('href')))).toEqual([]);
  expect(await page.locator('a[target="_blank"]').evaluateAll((links) => links.every((link) => link.rel.includes('noopener') && link.rel.includes('noreferrer')))).toBe(true);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle('Bonvino & Pereira Sociedade de Advogados | São Paulo');
  const html = await (await request.get('/')).text();
  expect(html).toContain('Assessoria jurídica a associações');
  expect(html).toContain('<h1');
  expect(errors).toEqual([]);
});

for (const width of [390, 1440]) {
  test(`acessibilidade automatizada WCAG em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openSite(page);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const width of [320, 390, 1024, 1440]) {
  test(`texto a 200% reorganiza conteúdo em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await openSite(page);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await assertLayout(page);
    expect(await page.locator('header nav').evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    await expect(page.getByRole('button', { name: 'Abrir menu', exact: true })).toBeVisible();
    expect(await page.locator('.dossier-cabinet').evaluate((element) => getComputedStyle(element).flexDirection)).toBe('column');
    await page.locator('#sobre').scrollIntoViewIfNeeded();
    await assertLayout(page);
    await page.locator('#contato').scrollIntoViewIfNeeded();
    await assertLayout(page);
  });
}
