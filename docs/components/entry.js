export default {
  props: ['packageVersions'],
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      latest: undefined,
    }
  },
  mounted() {
    let all = this.packageVersions;

    if(!all){
      return;
    }

    var keys = Object.keys(all);

    // keys will be in any order
    keys.sort();
    keys.reverse();

    var last = keys[0];
    this.latest = all[last];
  },
  template: /*html*/`
  <tr v-if="latest">
    <td class="packageText">
      <h3>{{ latest.displayName }}</h3>
      <h4>{{ latest.description }}</h4>
      <h5>{{ latest.name }}</h5>
    </td>
    <td>
      Any
    </td>
    <!--
    <td>
      <button appearance="accent" class="" id="vccAddRepoButton" >Add to VCC</button>
      <button appearance="accent" class="" id="vccAddRepoButton" >Info</button>
      <button appearance="accent" class="" id="vccAddRepoButton" >Downlaod Zip</button>
      </td>
      -->
  </tr>`,
}


