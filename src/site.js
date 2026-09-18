export const FIRM = Object.freeze({
  name: 'Bonvino & Pereira Sociedade de Advogados',
  phone: '(11) 91737-6916',
  phoneNumber: '5511917376916',
  email: 'contato@bonvinoepereira.adv.br',
  instagram: '@bonvinoepereira',
  instagramUrl: 'https://www.instagram.com/bonvinoepereira/',
  address: 'Av. Paulista, 1636, Sala 103, Bela Vista, São Paulo - SP, CEP 01310-200',
});

export function getWhatsAppUrl(message = 'Olá! Gostaria de agendar uma consulta jurídica.') {
  return `https://wa.me/${FIRM.phoneNumber}?text=${encodeURIComponent(message)}`;
}
