export default {

  vue: {
    config: {
      productionTip: true,
      devtools: false,
      silent: true
    }
  },
  head: {
    title: 'The Struggle is Part of the Story',
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
            use: ["raw-loader"] 
          },
          {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)$/,
            loader: 'url-loader',
            }
          );
      }
    }
  },
  env: {
    users: [
      { id: 0, name: 'Emilia Haar'},
      { id: 1, name: 'Luisa Behrendt'},
      { id: 2, name: 'Jana Köhler'},
      { id: 3, name: 'Alejandra Arévalo'},
      { id: 4, name: 'Angel Genkov'},
      { id: 5, name: 'Henry Boebst'},
      { id: 6, name: 'Iva Coskun'},
      { id: 7, name: 'Zita Felizitas Frohloff'},

      { id: 8, name: 'Camille Magnin'},
      { id: 9, name: 'Suriñe Garcia-Pozuelo Iglesias'},
      { id: 10, name: 'Artur Meier'},
      { id: 11, name: 'Kaya Peters'},
      { id: 12, name: 'Anika Enke'},
      { id: 13, name: 'Garo Seferian'},
      // { id: 1, name: '1'},
      // { id: 2, name: '2'},
      // { id: 3, name: '3'},
      // { id: 4, name: '4'},
      // { id: 5, name: '5'},
      // { id: 6, name: '6'},
      // { id: 7, name: '7'},
      // { id: 8, name: '8'},
      // { id: 9, name: '9'},
      // { id: 10, name: '10'},
      // { id: 11, name: '11'},
      // { id: 12, name: '12'},
      // { id: 13, name: '13'},
      // { id: 14, name: '14'},
      // { id: 15, name: '15'},
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
