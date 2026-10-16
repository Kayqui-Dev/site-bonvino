import { CONTACT_AREAS } from './practice-areas.js';

/** @typedef {{ name: string, phone: string, email: string, area: string, message: string }} ContactValues */
/** @typedef {Partial<Record<keyof ContactValues, string>>} ContactErrors */

/** @param {ContactValues} values @returns {ContactErrors} */
export function validateContact(values) {
  const errors = {};
  const phoneDigits = values.phone.replace(/\D/g, '');

  if (values.name.trim().length < 2 || values.name.trim().length > 120) {
    errors.name = 'Informe seu nome completo, com até 120 caracteres.';
  }
  if (!/^[+\d\s().-]+$/.test(values.phone) || phoneDigits.length < 10 || phoneDigits.length > 15 || /^(\d)\1+$/.test(phoneDigits)) {
    errors.phone = 'Informe um telefone válido, incluindo o DDD.';
  }
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }
  if (!CONTACT_AREAS.includes(values.area)) errors.area = 'Selecione a área do direito.';
  if (values.message.trim().length < 10 || values.message.trim().length > 1500) {
    errors.message = 'Descreva brevemente sua dúvida, entre 10 e 1.500 caracteres.';
  }

  return errors;
}

/** @param {ContactValues} values */
export function prepareContactMessage(values) {
  return [
    'Olá! Gostaria de agendar uma consulta jurídica.',
    '',
    `Nome: ${values.name.trim()}`,
    `Telefone: ${values.phone.trim()}`,
    `E-mail: ${values.email.trim()}`,
    `Área: ${values.area}`,
    `Mensagem: ${values.message.trim()}`,
  ].join('\n');
}
