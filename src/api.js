const URL_MAIN = "192.168.1.250:8080/api/main";
const URL_AMBIENT = "192.168.1.250:8080/api/ambi/all";

export default {
  async getMainLight() {    
    let response = await fetch(`${URL_MAIN}/status`, { method: "GET" });
    let data = await response.json();
    return data;
  },
  async sendMainLight(gpio, cmd) {
    await fetch(`${URL_MAIN}/${cmd}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify([gpio])
    });
  },
  async sendAmbientLight(data) {
    await fetch(URL_AMBIENT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data)
    });
  }
}