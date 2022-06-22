<template>
  <div v-if="entryDef1" style="display: flex; flex-direction: column">
    <span style="font-size: 18px">EntryDef1</span>


    <title-detail
    
     :value="entryDef1.title"
      style="margin-top: 16px"
    ></title-detail>


    <content-detail
    
     :value="entryDef1.content"
      style="margin-top: 16px"
    ></content-detail>

  </div>
  <div v-else style="display: flex; flex: 1; align-items: center; justify-content: center">
    <mwc-circular-progress indeterminate></mwc-circular-progress>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { EntryDef1 } from '../../../types/dna_1/zome_1';
import '@type-craft/title/title-detail';
import '@type-craft/content/content-detail';
import '@material/mwc-circular-progress';

export default defineComponent({
  props: {
    entryHash: {
      type: String,
      required: true
    }
  },
  data(): { entryDef1: EntryDef1 | undefined } {
    return {
      entryDef1: undefined
    }
  },
  async mounted() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dna_1')!;

    this.entryDef1 = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'zome_1',
      fn_name: 'get_entry_def_1',
      payload: this.entryHash,
      provenance: cellData.cell_id[1]
    });
  },
  setup() {
    const appWebsocket = (inject('appWebsocket') as ComputedRef<AppWebsocket>).value;
    const appInfo = (inject('appInfo') as ComputedRef<InstalledAppInfo>).value;
    return {
      appInfo,
      appWebsocket,
    };
  },
})
</script>