import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, Mail, MapPin, Clock, Lock } from 'lucide-react';

const practiceAreas = [
  'Direito Civil & Contratos',
  'Direito Trabalhista',
  'Direito Criminal & Defesa',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Informe um telefone válido.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido.';
    if (!formData.area) newErrors.area = 'Selecione a área do direito.';
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = 'Descreva suscintamente a dúvida.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Enviei um formulário de consulta pelo site.\n\n*Nome:* ${formData.name}\n*Telefone:* ${formData.phone}\n*E-mail:* ${formData.email}\n*Área:* ${formData.area}\n*Mensagem:* ${formData.message}`
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <section id="contato" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-mono font-semibold bg-champagne/10 py-1.5 px-4 rounded-full border border-champagne/30">
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
            {isSubmitted ? (
              <div className="glass-obsidian p-10 rounded-3rem border border-champagne text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 bg-champagne/10 rounded-full border border-champagne flex items-center justify-center mx-auto text-champagne">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-ivory">Solicitação Enviada!</h3>
                  <p className="text-ivory-muted text-sm max-w-md mx-auto">
                    Obrigado, <strong className="text-champagne">{formData.name}</strong>. Nossa equipe jurídica analisará o seu caso e retornará em breve.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Acelerar pelo WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', area: '', message: '' });
                    }}
                    className="text-xs text-ivory-muted hover:text-champagne uppercase font-mono py-3"
                  >
                    Nova Mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-obsidian p-8 md:p-12 rounded-3rem border border-champagne/30 space-y-6 shadow-2xl">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif text-ivory font-bold">Solicitar Consulta Jurídica</h3>
                  <p className="text-xs text-ivory-muted">Preencha os campos abaixo. Garantimos sigilo profissional da OAB.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-ivory-muted">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Dr. João da Silva"
                      className={`w-full bg-obsidian border text-ivory text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.name ? 'border-rose-500' : 'border-white/10 focus:border-champagne'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-ivory-muted">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 9173-7691"
                      className={`w-full bg-obsidian border text-ivory text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-champagne'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-ivory-muted">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seuemail@exemplo.com"
                      className={`w-full bg-obsidian border text-ivory text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-white/10 focus:border-champagne'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Area Select */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-ivory-muted">
                      Área do Direito *
                    </label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className={`w-full bg-obsidian border text-ivory text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                        errors.area ? 'border-rose-500' : 'border-white/10 focus:border-champagne'
                      }`}
                    >
                      <option value="">Selecione uma área...</option>
                      {practiceAreas.map((area, idx) => (
                        <option key={idx} value={area} className="bg-obsidian text-ivory">
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.area}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono uppercase tracking-wider text-ivory-muted">
                    Resumo do Caso *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva suscintamente o seu caso..."
                    className={`w-full bg-obsidian border text-ivory text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors ${
                      errors.message ? 'border-rose-500' : 'border-white/10 focus:border-champagne'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 bg-champagne hover:bg-champagne-hover text-obsidian font-bold text-xs uppercase tracking-[0.18em] py-4 px-8 rounded-full btn-magnetic shadow-xl shadow-champagne/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Solicitar Consulta</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Urgent Phone Box */}
            <div className="glass-obsidian p-6 rounded-2.5rem border border-champagne/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-champagne/10 border border-champagne/40 flex items-center justify-center text-champagne">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-ivory font-serif font-bold text-base">Atendimento & Urgências</h4>
                  <p className="text-xs text-champagne font-mono">(11) 9173-7691</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-champagne text-obsidian font-semibold text-xs uppercase tracking-wider py-3 rounded-full btn-magnetic text-center"
              >
                <MessageCircle className="w-4 h-4 fill-obsidian" />
                <span>Conversar pelo WhatsApp</span>
              </a>
            </div>

            {/* Direct Info */}
            <div className="glass-obsidian p-6 rounded-2.5rem border border-white/10 space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-muted uppercase block">Endereço da Sede</span>
                  <span className="text-ivory">Av. Paulista, 1636, Sala 103, Bela Vista, São Paulo - SP, CEP 01310-200</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-muted uppercase block">E-mail Institucional</span>
                  <a href="mailto:bonvinoconsultoria@outlook.com" className="text-ivory hover:text-champagne">
                    bonvinoconsultoria@outlook.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="glass-obsidian p-3 rounded-2.5rem border border-white/10 space-y-2">
              <div className="w-full h-56 rounded-2rem overflow-hidden border border-white/10 bg-obsidian">
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
