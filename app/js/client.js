import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';
import App from './views/layout/App.vue'; // this is the layout file
import Index from './views/Index.vue';
import Upload from './views/Upload.vue';

class Client {
  constructor() {
    this.rootElement = '#app';
    this.installPlugins();
    this.mountRoutes();
    this.launch();
  }

  installPlugins() {
    Vue.use(Router);
    Vue.use(Resource);
  }

  mountRoutes() {
    const routes = [
      {
        path: '/',
        component: Index,
      },
      {
        path: '/upload',
        component: Upload,
      },
      { path: '*', redirect: '/' }, // Handle potential fuckups in component routing
    ];
    this.router = new Router({
      mode: 'history',
      routes,
    });
  }

  launch() {
    this.vm = new Vue({
      router: this.router,
      render: h => h(App),
    }).$mount(this.rootElement);
  }
}

// eslint-disable-next-line no-unused-vars
const instance = new Client();
