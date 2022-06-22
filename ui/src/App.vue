<template>
  <div>
    <div v-if="loading">
      <mwc-circular-progress indeterminate></mwc-circular-progress>
    </div>
    <div v-else>
    <CreateEntryDef1 @entry-def-1-created="entryHash = $event"/>
    <EntryDef1Detail v-if="entryHash" :entry-hash="entryHash" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppWebsocket, InstalledAppInfo } from '@holochain/client';
import '@material/mwc-circular-progress';
import CreateEntryDef1 from './components/dna_1/zome_1/CreateEntryDef1.vue';
import EntryDef1Detail from './components/dna_1/zome_1/EntryDef1Detail.vue';

export default defineComponent({
  components: {
    CreateEntryDef1, EntryDef1Detail
  },
  data(): {
    appWebsocket: AppWebsocket | undefined;
    loading: boolean;
    appInfo: InstalledAppInfo | undefined;
    entryHash: string | undefined;
  } {
    return {
      appWebsocket: undefined,
      loading: true,
      appInfo: undefined,
      entryHash: undefined,
    };
  },
  async mounted() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.appWebsocket = await AppWebsocket.connect(`ws://localhost:${import.meta.env.VITE_HC_PORT}`);
    this.appInfo = await this.appWebsocket.appInfo({ installed_app_id: 'my-app' });

    this.loading = false;
  },
  provide() {
    return {
      appWebsocket: computed(() => this.appWebsocket),
      appInfo: computed(() => this.appInfo),
    };
  },
});
</script>
