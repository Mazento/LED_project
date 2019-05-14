const URL_MAIN = "http://192.168.1.250:8080/api/main";
const URL_AMBIENT = "http://192.168.1.250:8080/api/ambi";
// const URL_MAIN = "http://localhost:4321/api/main";
// const URL_AMBIENT = "http://localhost:4321/api/ambi";

export default {
  async getMainLight() {
    const response = await fetch(`${URL_MAIN}/status`, { method: "GET" });
    const data = await response.json();
    return data;
  },
  async sendMainLight(gpioStatus, cmd) {
    const response = await fetch(`${URL_MAIN}/${cmd}`, {
      method: "POST",
      // text/plain for production.
      // application/json for development
      headers: { "Content-Type": "text/plain" },
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gpioStatus)
    });
    const data = await response.json();
    return data;
  },
  async getAmbientLight() {
    const response = await fetch(`${URL_AMBIENT}`, { method: "GET" });
    const data = await response.json();
    return data;
  },
  async sendAmbientLight(config) {
    const response = await fetch(`${URL_AMBIENT}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    const data = await response.json();
    return data;
  }
}