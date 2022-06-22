import { Orchestrator } from "@holochain/tryorama";

import zome_1_entry_def_1 from './dna_1/zome_1/entry-def-1';

let orchestrator: Orchestrator<any>;

orchestrator = new Orchestrator();
zome_1_entry_def_1(orchestrator);
orchestrator.run();



