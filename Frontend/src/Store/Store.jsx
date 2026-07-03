import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/AuthSlice";
import JobApi from "../Apis/jobsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    [JobApi.reducerPath]: JobApi.reducer,
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(JobApi.middleware);
  },
});

setupListeners(Store.dispatch);

export default Store;
