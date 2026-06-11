
export enum OperationState {
  INIT,               // initialize
  ID_XID3,            // pid or aid
  ID_SLEEP,           // SLEEP
  ID_REMIND,          // REMIND
  ID_SCENE,           // scene id
  OP_XID,             // operator for action or property: =>
  OP_SLEEP,           // operator for SLEEP: =>
  OP_REMIND,          // operator for REMIND: =>
  SLEEP_VALUE,        // sleep value
  REMIND_VALUE,       // remind value
  PROPERTY_VALUE,     // property value
  ARGUMENT_VALUE,     // argument value
  HASH,               // #
  INTEGER,            // integer
  ASSIGN,             // =
  SEMICOLON,          // ;
  COMMA,              // ,
}
