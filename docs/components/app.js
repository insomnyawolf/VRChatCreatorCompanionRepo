import entry from './entry.js'

const response = await fetch("./index.json");
const data = await response.json();

export default {
  components: {
    entry
  },
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      data,
      searchValue: "",
      filtered: { data: null },
    }
  },
  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    getMailUrl() {
      return `mailto:${this.data.email}`;
    },
    addRepo() {
      window.location.assign(`vcc://vpm/addRepo?url=${encodeURIComponent(this.data.url)}`)
    },
    copyUrl() {
      navigator.clipboard.writeText(this.data.url);
    },
    getNewSearch() {
      let candidates = this.data.packages;

      let search = this.searchValue;

      let result = []

      if (!search || search.length < 1) {
        for (let pkg in candidates) {
          result.push(candidates[pkg]);
        }
      }
      else {
        for (let pkg in candidates) {
          if (pkg.indexOf(search) < 0) {
            continue;
          }
          result.push(candidates[pkg]);
        }
      }

      // for (let i = 0; i < 5; i++) {
      //   result = result.concat(result);
      // }

      this.filtered.data = result;
    }
  },
  mounted() {
    this.getNewSearch();
  },
  beforeUpdate() {
    this.getNewSearch();
  },
  template: /*html*/`
  <div class="content">
    <div id="listingInfo">
      <img src='./images/banner.png' class="bannerImage"/>
      <h1>
        {{ data.name }}
      </h1>
      <h3>
        {{ data.description }}
      </h3>
      <h3>
        Published by <a :href="data.url" target="_blank">{{ data.name }}</a>
      </h3>
      <h3>
        Contact: <a :href="getMailUrl()" target="_blank">{{ data.email }}</a>
      </h3>
    </div>
    <div id="addToVcc">
      <input type="text" aria-readonly="true" id="feedUrl" readonly :value="data.url"/>
      <button @click="addRepo()" >Add to VCC</button>
      <button @click="copyUrl()">Copy URL</button>
    </div>
    <input type="text" id="searchInput" placeholder="Search packages..." v-model="searchValue" autoFocus/>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <!--<th></th>-->
        </tr>
      </thead>
      <tbody v-if="filtered.data">
        <entry v-for="package in filtered.data" :packageVersions="package.versions"></entry>
      </tbody>
    </table>
  </div>`,
}
//