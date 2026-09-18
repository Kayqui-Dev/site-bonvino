import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { FIRM, getWhatsAppUrl } from '../site';

const practiceAreas = [
  'Direito Criminal & Defesa',
  'Direito Tributário',
  'Direito Civil & Contratos',
  'Direito Trabalhista',
  'Direito de Família & Sucessões',
  'Direito Empresarial & Compliance',
  'Direito do Consumidor',
  'Outra Área / Consulta Geral',
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isPrepared, setIsPrepared] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!/^[+\d\s().-]+$/.test(formData.phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
      newErrors.phone = 'Informe um telefone válido, incluindo o DDD.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Informe um e-mail válido.';
    if (!practiceAreas.includes(formData.area)) newErrors.area = 'Selecione a área do direito.';
    if (formData.message.trim().length < 10) newErrors.message = 'Descreva brevemente sua dúvida, com pelo menos 10 caracteres.';

    setErrors(newErrors);
    const firstInvalidField = Object.keys(newErrors)[0];
    if (firstInvalidField) document.getElementById(`contact-${firstInvalidField}`)?.focus();
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsPrepared(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const preparedMessage = [
    'Olá! Gostaria de agendar uma consulta jurídica.',
    '',
    `Nome: ${formData.name.trim()}`,
    `Telefone: ${formData.phone.trim()}`,
    `E-mail: ${formData.email.trim()}`,
    `Área: ${formData.area}`,
    `Mensagem: ${formData.message.trim()}`,
  ].join('\n');
  const whatsappUrl = getWhatsAppUrl(preparedMessage);

  return (
    <section id="contato" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-sm uppercase tracking-[0.25em] text-platinum font-mono font-semibold bg-platinum/10 py-1.5 px-4 rounded-full border border-platinum/30">
            Agendamento & Consulta
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Fale com um Advogado
          </h2>
          <p className="text-ivory-muted text-base">
            Atendimento presencial na Av. Paulista, 1636 ou reuniões por videochamada com sigilo absoluto.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            {isPrepared ? (
              <div className="glass-navy p-10 rounded-3rem border border-platinum text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 bg-platinum/10 rounded-full border border-platinum flex items-center justify-center mx-auto text-platinum">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 ref={(element) => { element?.focus(); }} tabIndex={-1} className="text-2xl font-serif font-bold text-ivory">Mensagem pronta para envio</h3>
                  <p className="text-ivory-muted text-sm leading-relaxed max-w-md mx-auto">
                    Confira os dados abaixo e continue no WhatsApp para enviar sua solicitação.
                    Nenhuma mensagem foi enviada ainda.
                  </p>
                </div>
                <div className="rounded-2xl bg-navy p-5 text-left text-ivory">
                  <p className="whitespace-pre-line break-words text-sm leading-relaxed">{preparedMessage}</p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-platinum py-3.5 px-6 font-semibold text-sm text-navy hover:bg-platinum-hover"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      Continuar no WhatsApp
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPrepared(false)}
                    className="text-sm text-ivory-muted hover:text-platinum uppercase font-mono py-3"
                  >
                    Editar dados
                  </button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="glass-navy p-6 sm:p-8 md:p-12 rounded-3rem border border-platinum/30 space-y-6 shadow-2xl">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-serif text-ivory font-bold text-balance">Solicitar consulta jurídica</h3>
                  <p className="text-sm text-ivory-muted leading-relaxed">Preencha os campos obrigatórios para preparar sua mensagem. O envio é concluído por você no WhatsApp.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="block text-sm font-sans text-ivory-muted">
                      Nome completo *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      maxLength={120}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className={`w-full bg-navy border text-ivory text-base sm:text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.name ? 'border-platinum' : 'border-platinum/20 focus:border-platinum'
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="text-sm text-platinum flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="block text-sm font-sans text-ivory-muted">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      maxLength={25}
                      required
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 90000-0000"
                      className={`w-full bg-navy border text-ivory text-base sm:text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.phone ? 'border-platinum' : 'border-platinum/20 focus:border-platinum'
                      }`}
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" role="alert" className="text-sm text-platinum flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-sm font-sans text-ivory-muted">
                      E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seuemail@exemplo.com"
                      className={`w-full bg-navy border text-ivory text-base sm:text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.email ? 'border-platinum' : 'border-platinum/20 focus:border-platinum'
                      }`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="text-sm text-platinum flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Area Select */}
                  <div className="space-y-1">
                    <label htmlFor="contact-area" className="block text-sm font-sans text-ivory-muted">
                      Área do direito *
                    </label>
                    <select
                      id="contact-area"
                      name="area"
                      required
                      aria-invalid={Boolean(errors.area)}
                      aria-describedby={errors.area ? 'contact-area-error' : undefined}
                      value={formData.area}
                      onChange={handleChange}
                      className={`w-full bg-navy border text-ivory text-base sm:text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.area ? 'border-platinum' : 'border-platinum/20 focus:border-platinum'
                      }`}
                    >
                      <option value="">Selecione uma área...</option>
                      {practiceAreas.map((area, idx) => (
                        <option key={idx} value={area} className="bg-navy text-ivory">
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <p id="contact-area-error" role="alert" className="text-sm text-platinum flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.area}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="block text-sm font-sans text-ivory-muted">
                    Resumo do caso *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    maxLength={1500}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva brevemente o motivo da consulta, sem dados sensíveis."
                    className={`w-full bg-navy border text-ivory text-base sm:text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                      errors.message ? 'border-platinum' : 'border-platinum/20 focus:border-platinum'
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="text-sm text-platinum flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-platinum py-4 px-6 font-sans text-sm font-semibold text-navy hover:bg-platinum-hover btn-magnetic"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Preparar mensagem
                  </span>
                </button>
                <p className="text-sm text-ivory-muted leading-relaxed">
                  Seus dados não são armazenados neste site. Ao continuar, serão incluídos na mensagem do WhatsApp.
                  Evite informações sensíveis ou documentos neste primeiro contato.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Urgent Phone Box */}
            <div className="glass-navy p-6 rounded-2.5rem border border-platinum/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-platinum/10 border border-platinum/40 flex items-center justify-center text-platinum">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-ivory font-serif font-bold text-base">Atendimento & Urgências</h4>
                  <a href={`tel:+${FIRM.phoneNumber}`} className="text-sm text-platinum font-sans">{FIRM.phone}</a>
                </div>
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-platinum text-navy font-semibold text-sm uppercase tracking-wider py-3 rounded-full btn-magnetic text-center"
              >
                <MessageCircle className="w-4 h-4 fill-navy" />
                <span>Conversar pelo WhatsApp</span>
              </a>
            </div>

            {/* Direct Info */}
            <div className="glass-navy p-6 rounded-2.5rem border border-platinum/20 space-y-4 text-sm font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-platinum shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-muted uppercase block">Endereço da Sede</span>
                  <span className="text-ivory leading-relaxed">{FIRM.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-platinum shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-muted uppercase block">E-mail Institucional</span>
                  <a href={`mailto:${FIRM.email}`} className="text-ivory hover:text-platinum break-all">
                    {FIRM.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="glass-navy p-3 rounded-2.5rem border border-platinum/20 space-y-2">
              <div className="w-full h-56 rounded-2rem overflow-hidden border border-platinum/20 bg-navy">
                <iframe
                  title="Localização Av Paulista 1636"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1037578278235!2d-46.65675662375936!3d-23.562928667728225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8d506ab6b%3A0x6b44a49c95d90911!2sAv.%20Paulista%2C%201636%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
