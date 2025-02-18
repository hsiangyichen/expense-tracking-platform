import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import plaidReducer from "../slices/plaidSlice";
import { createWrapper } from "next-redux-wrapper";
import createWebStorage from "redux-persist/lib/storage";
import { Store } from "@reduxjs/toolkit";
import { StoreWithPersistor } from "./store.types";

const isServer = typeof window === "undefined";

export const rootReducer = combineReducers({
  plaid: plaidReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

const makeStore = (): Store | StoreWithPersistor => {
  if (isServer) {
    return makeConfiguredStore();
  }

  // We need to check if window is available
  const storage = createWebStorage;

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["plaid"], // Only persist plaid state
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

const storeWrapper = makeStore();

export const store = isServer
  ? (storeWrapper as Store)
  : (storeWrapper as StoreWithPersistor).store;

export const persistor = isServer
  ? null
  : (storeWrapper as StoreWithPersistor).persistor;

// Create wrapper
export const wrapper = createWrapper(() => store);

export type { RootState };
export type AppDispatch = typeof store.dispatch;
