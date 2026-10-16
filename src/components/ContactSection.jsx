import { useEffect, useRef, useState } from 'react';
import { Send, AlertCircle, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { FIRM, getWhatsAppUrl } from '../site';
import { CONTACT_AREAS } from '../practice-areas';
import { prepareContactMessage, validateContact } from '../contact';
import OfficeMap from './OfficeMap';

const FIELDS = [
  { name: 'name', label: 'Nome completo', type: 'text', autoComplete: 'name', maxLength: 120, placeholder: 'Seu nome completo' },
  { name: 'phone', label: 'Telefone / WhatsApp', type: 'tel', autoComplete: 'tel', maxLength: 25, placeholder: '(11) 90000-0000' },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', maxLength: 254, placeholder: 'seuemail@exemplo.com' },
];
const INPUT_CLASS = 'min-h-12 w-full min-w-0 rounded-xl border bg-navy px-4 py-3 text-base text-ivory transition-colors placeholder:text-ivory-muted focus-visible:outline-offset-2';

function FieldError({ name, message }) {
  if (!message) return null;
  return <p id={`contact-${name}-error`} role="alert" className="flex items-start gap-2 text-sm leading-relaxed text-platinum"><AlertCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>{message}</span></p>;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', area: '', message: '' });
  const [errors, setErrors] = useState(/** @type {import('../contact').ContactErrors} */ ({}));
  const [isPrepared, setIsPrepared] = useState(false);
  const reviewHeading = useRef(/** @type {HTMLHeadingElement | null} */ (null));

  useEffect(() => {
    if (isPrepared) reviewHeading.current?.focus();
  }, [isPrepared]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateContact(formData);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      window.requestAnimationFrame(() => document.getElementById(`contact-${firstInvalid}`)?.focus());
      return;
    }
    setIsPrepared(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const preparedMessage = prepareContactMessage(formData);

  return (
    <section id="contato" aria-labelledby="contact-title" className="section-shell relative z-10">
      <div className="contact-container mx-auto flex max-w-7xl flex-col gap-10 sm:gap-12">
        <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center gap-4 text-center">
          <span className="section-label">Agendamento &amp; Consulta</span>
          <h2 id="contact-title" className="section-title font-serif font-bold text-ivory text-balance">Fale com um Advogado</h2>
          <p className="text-base leading-relaxed text-ivory-muted text-pretty">Atendimento presencial na Av. Paulista, 1636 ou reuniões por videochamada com sigilo absoluto.</p>
        </div>
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            {isPrepared ? (
              <div className="contact-review glass-navy flex min-w-0 flex-col items-center gap-6 rounded-3xl p-6 text-center sm:rounded-3rem sm:p-8">
                <MessageCircle className="h-8 w-8 text-platinum" aria-hidden="true" />
                <div className="flex flex-col gap-3">
                  <h3 ref={reviewHeading} tabIndex={-1} className="font-serif text-2xl font-bold text-ivory text-balance">Mensagem pronta para envio</h3>
                  <p className="max-w-md text-sm leading-relaxed text-ivory-muted">Confira os dados abaixo e continue no WhatsApp para enviar sua solicitação. Nenhuma mensagem foi enviada ainda.</p>
                </div>
                <div className="w-full min-w-0 rounded-2xl bg-navy p-4 text-left text-ivory sm:p-5"><p className="whitespace-pre-line break-words text-sm leading-relaxed">{preparedMessage}</p></div>
                <div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <a href={getWhatsAppUrl(preparedMessage)} target="_blank" rel="noopener noreferrer" className="contact-action flex min-h-12 items-center justify-center gap-2 rounded-full bg-platinum px-5 py-3 text-sm font-semibold text-navy hover:bg-platinum-hover">
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" /><span>Continuar no WhatsApp</span>
                  </a>
                  <button type="button" onClick={() => {
                    setIsPrepared(false);
                    window.requestAnimationFrame(() => document.getElementById('contact-name')?.focus());
                  }} className="min-h-12 rounded-full px-5 py-3 text-sm font-medium text-platinum underline underline-offset-4 hover:text-ivory">Editar dados</button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} aria-labelledby="contact-form-title" className="contact-form glass-navy flex min-w-0 flex-col gap-6 rounded-3xl p-5 sm:rounded-3rem sm:p-8 xl:p-10">
                <div className="flex flex-col gap-2">
                  <h3 id="contact-form-title" className="font-serif text-2xl font-bold text-ivory text-balance">Solicitar consulta jurídica</h3>
                  <p className="text-sm leading-relaxed text-ivory-muted">Preencha os campos obrigatórios para preparar sua mensagem. O envio é concluído por você no WhatsApp.</p>
                </div>
                <div className="contact-fields grid min-w-0 gap-5">
                  {FIELDS.map(({ label, ...field }) => (
                    <div key={field.name} className="flex min-w-0 flex-col gap-2">
                      <label htmlFor={`contact-${field.name}`} className="text-sm leading-relaxed text-ivory-muted">{label} *</label>
                      <input {...field} id={`contact-${field.name}`} required value={formData[field.name]} onChange={handleChange} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined} className={`${INPUT_CLASS} ${errors[field.name] ? 'border-platinum' : 'border-platinum/30 focus:border-platinum'}`} />
                      <FieldError name={field.name} message={errors[field.name]} />
                    </div>
                  ))}
                  <div className="flex min-w-0 flex-col gap-2">
                    <label htmlFor="contact-area" className="text-sm leading-relaxed text-ivory-muted">Área do direito *</label>
                    <select id="contact-area" name="area" required value={formData.area} onChange={handleChange} aria-invalid={Boolean(errors.area)} aria-describedby={errors.area ? 'contact-area-error' : undefined} className={`${INPUT_CLASS} ${errors.area ? 'border-platinum' : 'border-platinum/30 focus:border-platinum'}`}>
                      <option value="">Selecione uma área...</option>
                      {CONTACT_AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
                    </select>
                    <FieldError name="area" message={errors.area} />
                  </div>
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm leading-relaxed text-ivory-muted">Resumo do caso *</label>
                  <textarea id="contact-message" name="message" rows={4} maxLength={1500} required value={formData.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} placeholder="Descreva brevemente o motivo da consulta, sem dados sensíveis." className={`${INPUT_CLASS} resize-y ${errors.message ? 'border-platinum' : 'border-platinum/30 focus:border-platinum'}`} />
                  <FieldError name="message" message={errors.message} />
                </div>
                <button type="submit" className="contact-action btn-magnetic flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-platinum px-5 py-4 text-sm font-semibold text-navy hover:bg-platinum-hover"><Send className="h-4 w-4 shrink-0" aria-hidden="true" /><span>Preparar mensagem</span></button>
                <p className="text-sm leading-relaxed text-ivory-muted">Seus dados não são armazenados neste site. Ao continuar, serão incluídos na mensagem do WhatsApp. Evite informações sensíveis ou documentos neste primeiro contato.</p>
              </form>
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            <div className="contact-panel glass-navy flex min-w-0 flex-col gap-4 rounded-3xl p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-platinum/40 bg-platinum/10 text-platinum"><Phone className="h-5 w-5" aria-hidden="true" /></div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold text-ivory">Atendimento &amp; Urgências</h3>
                  <a href={`tel:+${FIRM.phoneNumber}`} className="inline-flex min-h-11 items-center rounded-lg text-sm text-platinum hover:underline">{FIRM.phone}</a>
                </div>
              </div>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="contact-action btn-magnetic inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-platinum px-3 py-3 text-center text-sm font-semibold text-navy hover:bg-platinum-hover"><MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" /><span>Conversar pelo WhatsApp</span></a>
            </div>
            <div className="contact-panel glass-navy flex min-w-0 flex-col gap-5 rounded-3xl p-5 text-sm sm:p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-platinum" aria-hidden="true" />
                <div className="flex min-w-0 flex-col gap-2"><h3 className="text-sm font-medium uppercase tracking-wide text-ivory-muted">Endereço da Sede</h3><p className="leading-relaxed text-ivory">{FIRM.address}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-platinum" aria-hidden="true" />
                <div className="flex min-w-0 flex-col"><h3 className="text-sm font-medium uppercase tracking-wide text-ivory-muted">E-mail Institucional</h3><a href={`mailto:${FIRM.email}`} className="inline-flex min-h-11 items-center break-all rounded-lg leading-relaxed text-ivory hover:text-platinum">{FIRM.email}</a></div>
              </div>
            </div>
            <OfficeMap />
          </div>
        </div>
      </div>
    </section>
  );
}
