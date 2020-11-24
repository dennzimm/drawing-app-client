import { createStore } from "easy-peasy";

import storeModel from "./models/store/store.model";

/**
 * Easy Peasy is an abstraction of Redux.
 * It provides a reimagined API focussing on developer experience,
 * allowing you to quickly and easily manage your state,
 * whilst leveraging the strong architectural guarantees
 * and providing integration with the extensive eco-system
 * that Redux has to offer.
 *
 * (see https://easy-peasy.now.sh/docs/introduction/)
 */
const store = createStore(storeModel);

export default store;
