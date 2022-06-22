
import { Orchestrator, Player, Cell } from "@holochain/tryorama";
import { config, installation, sleep } from '../../utils';

export default (orchestrator: Orchestrator<any>) =>  {
  
  orchestrator.registerScenario("entry-def-1 CRUD tests", async (s, t) => {
    // Declare two players using the previously specified config, nicknaming them "alice" and "bob"
    // note that the first argument to players is just an array conductor configs that that will
    // be used to spin up the conductor processes which are returned in a matching array.
    const [alice_player, bob_player]: Player[] = await s.players([config, config]);

    // install your happs into the conductors and destructuring the returned happ data using the same
    // array structure as you created in your installation array.
    const [[alice_happ]] = await alice_player.installAgentsHapps(installation);
    const [[bob_happ]] = await bob_player.installAgentsHapps(installation);

    await s.shareAllNodes([alice_player, bob_player]);

    const alice = alice_happ.cells.find(cell => cell.cellRole.includes('/dna_1.dna')) as Cell;
    const bob = bob_happ.cells.find(cell => cell.cellRole.includes('/dna_1.dna')) as Cell;

    const entryContents = {
  "title": "This have always",
  "content": "A computer virus. 'Cause maybe if we screw up this planet enough, they won't want it anymore! It's mysterious what attracts you to a person."
};

    // Alice creates a entry-def-1
    const create_output = await alice.call(
        "zome_1",
        "create_entry_def_1",
        entryContents
    );
    t.ok(create_output.headerHash);
    t.ok(create_output.entryHash);

    await sleep(200);
    
    // Bob gets the created entry-def-1
    const entry = await bob.call("zome_1", "get_entry_def_1", create_output.entryHash);
    t.deepEqual(entry, entryContents);
    
    
    // Alice updates the entry-def-1
    const update_output = await alice.call(
      "zome_1",
      "update_entry_def_1",
      {
        originalHeaderHash: create_output.headerHash,
        updatedEntryDef1: {
          "title": "decompose preoccupied should",
  "content": "It's nice to play a character that has a soulful, dependent, close relationship. Man destroys God.  I was part of something special."
}
      }
    );
    t.ok(update_output.headerHash);
    t.ok(update_output.entryHash);
    await sleep(200);

      
    
    // Alice delete the entry-def-1
    await alice.call(
      "zome_1",
      "delete_entry_def_1",
      create_output.headerHash
    );
    await sleep(200);

    
    // Bob tries to get the deleted entry-def-1, but he doesn't get it because it has been deleted
    const deletedEntry = await bob.call("zome_1", "get_entry_def_1", create_output.entryHash);
    t.notOk(deletedEntry);
      
  });

}
