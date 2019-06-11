const URL_MAIN = "http://192.168.1.250:9090/api/main";
const URL_AMBIENT = "http://192.168.1.250:9090/api/ambi";
const URL_MAIN_DEV = "http://localhost:4321/api/main";
const URL_AMBIENT_DEV = "http://localhost:4321/api/ambi";
const DEV_MODE = 0;

export default {
    async getMainLight() {
        const response = await fetch(`${URL_MAIN}`, { method: "GET" });
        return  await response.json();
    },

    async sendMainLight(gpioStatus) {
        const headers = DEV_MODE ? { "Content-Type": "application/json" } : { "Content-Type": "text/plain" };
        const URL = DEV_MODE ? URL_MAIN_DEV : URL_MAIN;

        const response = await fetch(URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(gpioStatus)
        });
        return  await response.json();
    },

    async getAmbientLight() {
        const response = await fetch(`${URL_AMBIENT}`, { method: "GET" });
        return  await response.json();
    },

    async sendAmbientLight(config) {
        const headers = DEV_MODE ? { "Content-Type": "application/json" } : { "Content-Type": "text/plain" };
        const URL = DEV_MODE ? URL_AMBIENT_DEV : URL_AMBIENT;

        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(config)
        });
        return await response.json();
    }
}
