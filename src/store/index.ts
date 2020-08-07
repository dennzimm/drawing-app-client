import { createStore } from "easy-peasy";

import storeModel from "./models/store/store.model";

const store = createStore(storeModel);

export default store;
