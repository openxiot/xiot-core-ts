
export enum ParserState2 {
  INIT,       // initialize
  ID1,        // property id 1 or event id
  ID2,        // property id 2
  EX_ID,      // external Id

  P_V,        // property value
  EX_V,       // external value
  EVENT_V,    // event value

  P_C,        // comparison operator for property
  EX_C,       // comparison operator for external
  EVENT_C,    // comparison operator for event

  L,          // logical operator
}
