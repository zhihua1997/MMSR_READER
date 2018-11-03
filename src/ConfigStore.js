import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducer from "./reducers";

const persistConfig = {
  key: "root",
  stateReconciler: autoMergeLevel2,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const configStore = async () => {
  const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configStore;
