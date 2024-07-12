class Helpers {
  // Uncomment and configure these if needed
  // static localhost = 'localhost:3001';
  // static server = '13.60.28.134:3001';
  // static basePath = `http://${this.localhost}`;
  // static apiUrl = `${this.basePath}/api/`;
  // static imageUrl = `${this.basePath}`;

  static get authUser() {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return {};
    }
  }

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${localStorage.getItem("token")}`,
    },
  };

  static getItem(key, isJson = false) {
    const item = localStorage.getItem(key);
    if (isJson && item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.error(`Failed to parse ${key} from localStorage`, e);
        return null;
      }
    }
    return item;
  }

  static setItem(key, data, isJson = false) {
    try {
      if (isJson) {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        localStorage.setItem(key, data);
      }
    } catch (e) {
      console.error(`Failed to set ${key} in localStorage`, e);
    }
  }
}

export default Helpers;
