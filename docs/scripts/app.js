import { createApp } from 'Vue'
import app from '../components/app.js'

createApp( {
    components: {
        app
    },
    data() {
        return {}
    },
    template: "<app/>",
}
).mount('#app')


// <template>
//     <main></main>
// </template>
