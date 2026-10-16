import test from 'node:test';
import assert from 'node:assert/strict';
import { FIRM, getWhatsAppUrl } from '../../src/site.js';
import { PRACTICE_AREAS, CONTACT_AREAS } from '../../src/practice-areas.js';
import { validateContact, prepareContactMessage } from '../../src/contact.js';

const valid = {
  name: 'Pessoa de teste QA',
  phone: '(11) 90000-0000',
  email: 'qa@example.test',
  area: 'Terceiro Setor',
  message: 'Solicito informações sobre uma consulta jurídica.',
};

test('oito áreas com identificadores e títulos únicos', () => {
  assert.equal(PRACTICE_AREAS.length, 8);
  assert.equal(new Set(PRACTICE_AREAS.map((area) => area.id)).size, 8);
  assert.equal(new Set(PRACTICE_AREAS.map((area) => area.title)).size, 8);
  for (const area of PRACTICE_AREAS) assert.equal(area.fronts.length, 3);
});

test('Terceiro Setor preserva a descrição oficial sem duplicação', () => {
  const matches = PRACTICE_AREAS.filter((area) => area.title === 'Terceiro Setor');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].description, 'Assessoria jurídica a associações, institutos e fundações na estruturação de projetos, na formalização de parcerias e no acompanhamento de sua execução.');
});

test('Terceiro Setor preserva exatamente as três frentes oficiais', () => {
  assert.deepEqual(PRACTICE_AREAS.find((area) => area.id === 'terceiro-setor').fronts, [
    'Constituição, estatutos e governança de organizações.',
    'Elaboração e análise de projetos, planos de trabalho e instrumentos de parceria.',
    'Orientação jurídica na execução e prestação de contas de projetos.',
  ]);
});

test('o contato inclui todas as áreas institucionais, uma única vez', () => {
  assert.equal(CONTACT_AREAS.length, 9);
  assert.equal(new Set(CONTACT_AREAS).size, 9);
  for (const area of PRACTICE_AREAS) assert.ok(CONTACT_AREAS.includes(area.contactLabel));
});

test('WhatsApp usa somente o telefone já existente do escritório', () => {
  const url = new URL(getWhatsAppUrl());
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, `/${FIRM.phoneNumber}`);
  assert.equal(url.searchParams.get('text'), 'Olá! Gostaria de agendar uma consulta jurídica.');
});

test('mensagem é codificada sem permitir alteração de destino ou parâmetros', () => {
  const message = 'Ação & parceria?\n<script>não executar</script> 日本語 #=+';
  const url = new URL(getWhatsAppUrl(message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.searchParams.get('text'), message);
});

test('campos vazios geram os cinco erros obrigatórios', () => {
  assert.deepEqual(Object.keys(validateContact({ name: '', phone: '', email: '', area: '', message: '' })), ['name', 'phone', 'email', 'area', 'message']);
});

test('dados válidos são aceitos sem simular comunicação com servidor', () => {
  assert.deepEqual(validateContact(valid), {});
});

test('telefones inválidos, repetidos ou extensos são rejeitados', () => {
  for (const phone of ['123', '00000000000', '1199999abc00', '55119999999999999999']) {
    assert.ok(validateContact({ ...valid, phone }).phone);
  }
});

test('e-mails inválidos e área não reconhecida são rejeitados', () => {
  for (const email of ['sem-arroba', 'a@', 'a b@example.test', 'a@example.test\nBCC:outro@example.test']) {
    assert.ok(validateContact({ ...valid, email }).email);
  }
  assert.ok(validateContact({ ...valid, area: 'Área inexistente para teste' }).area);
});

test('limites de nome, e-mail e mensagem são validados na lógica', () => {
  assert.ok(validateContact({ ...valid, name: 'a'.repeat(121) }).name);
  assert.ok(validateContact({ ...valid, email: `${'a'.repeat(250)}@example.test` }).email);
  assert.ok(validateContact({ ...valid, message: 'curta' }).message);
  assert.ok(validateContact({ ...valid, message: 'a'.repeat(1501) }).message);
  assert.deepEqual(validateContact({ ...valid, message: 'a'.repeat(1500) }), {});
});

test('preparação preserva acentuação, espaços internos e dados originais', () => {
  const values = { ...valid, name: '  Pessoa de teste QA  ', message: '  Orientação sobre associações e prestação de contas. 日本語  ' };
  const before = structuredClone(values);
  const message = prepareContactMessage(values);
  assert.match(message, /Nome: Pessoa de teste QA\n/);
  assert.match(message, /Área: Terceiro Setor\n/);
  assert.ok(message.endsWith('Mensagem: Orientação sobre associações e prestação de contas. 日本語'));
  assert.deepEqual(values, before);
});
