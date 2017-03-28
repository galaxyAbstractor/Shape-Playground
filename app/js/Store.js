class Store {

    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key];
    }
    setItem(key, value) {
        this.store[key] = value;
    }
}

const store = new Store();

export default store;