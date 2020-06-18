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
  loading: '~/components/loading.vue',
  build: {
    vendor: ['hammerjs'],
    analyze: true,
    transpile: ['ImprovedNoise', 'SimplexNoise', 'image-promise'],
    extend (config, ctx) {
      if (!!config.module) {
        config.module.rules.push(
          { 
            test: /\.(vert|frag)$/i, 
            use: ["raw-loader"] },
            {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                },
              },
            ],
            }
          );
      }
    }
  },
  env: {
    users: [
      // { id: 1, name: 'Böbst Henry'},
      // { id: 2, name: 'Anika Annette Enke'},
      // { id: 3, name: 'Suriñe Gracia-Pozuelo Iglesias'},
      // { id: 4, name: 'Emilia Haar'},
      // { id: 5, name: 'Camille Magnin'},
      // { id: 6, name: 'Garo Seferian'},
      // { id: 7, name: 'Luisa Behrendt'},
      // { id: 8, name: 'Artur Maier'},
      // { id: 9, name: 'Maria Alejandra Arevalo Martinez'},
      // { id: 10, name: 'Iva Mago Maria'},
      // { id: 11, name: 'Zita Felizitas Frohloff'},
      // { id: 12, name: 'Angle Genkov'},
      // { id: 13, name: 'Jana Köhler'},
      // { id: 14, name: 'Kaya Peters'},
      // { id: 15, name: 'Hanna Lene Wellpott'},
      { id: 1, name: '1'},
      { id: 2, name: '2'},
      { id: 3, name: '3'},
      { id: 4, name: '4'},
      { id: 5, name: '5'},
      { id: 6, name: '6'},
      { id: 7, name: '7'},
      { id: 8, name: '8'},
      { id: 9, name: '9'},
      { id: 10, name: '10'},
      { id: 11, name: '11'},
      { id: 12, name: '12'},
      { id: 13, name: '13'},
      { id: 14, name: '14'},
      { id: 15, name: '15'},
    ]
  },
  generate: {
    routes: [
      '/1',
      '/2',
      '/3',
      '/4',
      '/5',
      '/6',
      '/7',
      '/8',
      '/9',
      '/10',
      '/11',
    ]
  }
}
