use hdk::prelude::*;





#[hdk_entry(id = "entry_def_1")]
#[serde(rename_all = "camelCase")]
#[derive(Clone)]
pub struct EntryDef1 {
  pub title: String,
  pub content: String,
}