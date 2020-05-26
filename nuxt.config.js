export default {
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/css/global.css'
  ],
  build: {
    vendor: ['hammerjs'],
    transpile: ['ImprovedNoise', 'SimplexNoise', 'ImprovedNoise'],
    extend (config, ctx) {
      if (!!config.module) {
        config.module.rules.push({ test: /\.(vert|frag)$/i, use: ["raw-loader"] });
      }
    }
  },
  env: {
    users: [
      { id: 1, name: 'Intro'},
      { id: 2, name: 'Böbst Henry'},
      { id: 3, name: 'Anika Annette Enke'},
      { id: 4, name: 'Suriñe Gracia-Pozuelo Iglesias'},
      { id: 5, name: 'Emilia Haar'},
      { id: 6, name: 'Camille Magnin'},
      { id: 7, name: 'Garo Seferian'},
      { id: 8, name: 'Luisa Behrendt'},
      { id: 9, name: 'Artur Maier'},
      { id: 10, name: 'Maria Alejandra Arevalo Martinez'},
      { id: 11, name: 'Iva Mago Maria'},
      { id: 12, name: 'Zita Felizitas Frohloff'},
      { id: 13, name: 'Angle Genkov'},
      { id: 14, name: 'Jana Köhler'},
      { id: 15, name: 'Kaya Peters'},
      { id: 16, name: 'Hanna Lene Wellpott'},
    ]
  },
  generate: {
    routes: [
      '/1',
      '/2',
      '/3',
      '/4',
      '/5',
      '/6'
    ]
  }
}
