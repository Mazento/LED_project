const URL_MAIN = "http://192.168.1.250:8080/api/main";
const URL_AMBIENT = "http://192.168.1.250:8080/api/ambi/all";

export default {
  async sendMainLight(gpio, cmd) {
    await fetch(`${URL_MAIN}/${cmd}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: [gpio]
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