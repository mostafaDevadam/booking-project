
export enum eRULE_ENUM {
  "hotel" = "hotel",
  "guest" = "guest",
}


export type AUTH_INPUT_TYPE = {
    role?: eRULE_ENUM //"hotel" | "guest"
    email: string
    password: string
}
