<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create EntryDef1</span>

    <create-title 
      
      @change="title = $event.target.value"
      style="margin-top: 16px"
    ></create-title>

    <create-content 
      
      @change="content = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <mwc-button 
      label="Create EntryDef1"
      :disabled="!isEntryDef1Valid()"
      @click="createEntryDef1()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { EntryDef1 } from '../../../types/dna_1/zome_1';
import '@type-craft/title/create-title';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<EntryDef1> {
    return {
      title: undefined,
content: undefined
    }
  },

  methods: {
    isEntryDef1Valid() {
      return this.title && 
      this.content;
    },
    async createEntryDef1() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dna_1')!;

      const entryDef1: EntryDef1 = {
        title: this.title!,
        content: this.content!,
      };

      const { entryHash } = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'zome_1',
        fn_name: 'create_entry_def_1',
        payload: entryDef1,
        provenance: cellData.cell_id[1]
      });

      this.$emit('entry-def-1-created', entryHash);
    },
  },
  emits: ['entry-def-1-created'],
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