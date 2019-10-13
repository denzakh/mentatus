import Backendless from "backendless";

const APP_ID = "0E5B183F-2CAF-AE3F-FF18-A91BB0BF0200";
const API_KEY = "E6A07455-F8EA-CB77-FFC6-3A3E2CEF4C00";
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APP_ID, API_KEY);

export default Backendless;
