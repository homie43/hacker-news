import { createStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers.js";

export const store = createStore(reducers);
