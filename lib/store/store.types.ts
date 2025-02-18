import { Store } from "@reduxjs/toolkit";
import { Persistor } from "redux-persist";

export interface StoreWithPersistor {
  store: Store;
  persistor: Persistor;
}
