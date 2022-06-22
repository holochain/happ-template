use hdk::prelude::*;

mod entry_def_1;

use entry_def_1::EntryDef1;

entry_defs![
  EntryDef1::entry_def()
];

#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
  Ok(ValidateCallbackResult::Valid)
}
