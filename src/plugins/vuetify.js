import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.pink.darken4, // #E53935
                secondary: colors.amber.darken4, // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
            },
            dark: {
                primary: colors.pink.darken4, // #E53935
                secondary: colors.amber.darken4, // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
            },
        },
    },
})
