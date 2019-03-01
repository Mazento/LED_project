const URL_MAIN = "http://192.168.1.250:8080/api/main";
const URL_AMBIENT = "http://192.168.1.250:8080/api/ambi";
// const URL_MAIN = "http://localhost:4321/api/main";
// const URL_AMBIENT = "http://localhost:4321/api/ambi/all";

export default {
  async getMainLight() {    
    let response = await fetch(`${URL_MAIN}/status`, { method: "GET" });
    let data = await response.json();
    return data;
  },
  async sendMainLight(gpioStatus, cmd) {
    let response = await fetch(`${URL_MAIN}/${cmd}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gpioStatus)
    });
    let data = await response.json();
    return data;
  },
  async sendAmbientLight(data) {
    await fetch(URL_AMBIENT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
}