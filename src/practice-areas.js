export const PRACTICE_AREAS = [
  {
    id: 'criminal',
    title: 'Direito Criminal',
    matter: 'Penal',
    contactLabel: 'Direito Criminal & Defesa',
    tag: 'Plantão 24h',
    description: 'Atuação tempestiva na defesa dos direitos fundamentais, desde a fase policial até o julgamento.',
    fronts: [
      'Habeas corpus e medidas de urgência',
      'Acompanhamento em flagrante e delegacia',
      'Inquéritos policiais e ações penais',
    ],
  },
  {
    id: 'tributario',
    title: 'Direito Tributário',
    matter: 'Tributário',
    contactLabel: 'Direito Tributário',
    description: 'Assessoria preventiva e contenciosa para decisões fiscais, com foco na segurança jurídica da empresa.',
    fronts: [
      'Planejamento fiscal e prevenção de riscos',
      'Análise de créditos e recuperação tributária',
      'Defesa administrativa e judicial tributária',
    ],
  },
  {
    id: 'civil',
    title: 'Direito Civil',
    matter: 'Cível',
    contactLabel: 'Direito Civil & Contratos',
    description: 'Proteção patrimonial e condução de litígios contratuais, indenizatórios e de propriedade.',
    fronts: [
      'Elaboração e revisão de contratos',
      'Reparação por danos morais e materiais',
      'Ações possessórias e usucapião',
    ],
  },
  {
    id: 'trabalhista',
    title: 'Direito Trabalhista',
    matter: 'Trabalho',
    contactLabel: 'Direito Trabalhista',
    description: 'Defesa técnica para empregados e assessoria preventiva para empresas nas rotinas laborais.',
    fronts: [
      'Reclamações trabalhistas e rescisão indireta',
      'Defesa patronal e auditoria preventiva',
      'Acordos e homologação judicial',
    ],
  },
  {
    id: 'familia',
    title: 'Direito de Família',
    matter: 'Família',
    contactLabel: 'Direito de Família & Sucessões',
    description: 'Condução discreta e humanizada de questões familiares e sucessórias, judiciais ou consensuais.',
    fronts: ['Divórcio e partilha de bens', 'Guarda, convivência e alimentos', 'Inventários e sucessões'],
  },
  {
    id: 'empresarial',
    title: 'Direito Empresarial',
    matter: 'Empresa',
    contactLabel: 'Direito Empresarial & Compliance',
    description: 'Suporte jurídico continuado para sociedades, da constituição à gestão de riscos do negócio.',
    fronts: [
      'Constituição e reestruturação societária',
      'Gestão de riscos contratuais e compliance',
      'Conflitos entre sócios',
    ],
  },
  {
    id: 'consumidor',
    title: 'Direito do Consumidor',
    matter: 'Consumidor',
    contactLabel: 'Direito do Consumidor',
    description: 'Enfrentamento de práticas abusivas de fornecedores, instituições financeiras e planos de saúde.',
    fronts: [
      'Práticas e cláusulas abusivas',
      'Bancos, seguradoras e planos de saúde',
      'Ressarcimento e repetição de indébito',
    ],
  },
  {
    id: 'terceiro-setor',
    title: 'Terceiro Setor',
    matter: 'Terceiro Setor',
    contactLabel: 'Terceiro Setor',
    description: 'Assessoria jurídica a associações, institutos e fundações na estruturação de projetos, na formalização de parcerias e no acompanhamento de sua execução.',
    fronts: [
      'Constituição, estatutos e governança de organizações.',
      'Elaboração e análise de projetos, planos de trabalho e instrumentos de parceria.',
      'Orientação jurídica na execução e prestação de contas de projetos.',
    ],
  },
];

export const CONTACT_AREAS = [...PRACTICE_AREAS.map((area) => area.contactLabel), 'Outra Área / Consulta Geral'];
