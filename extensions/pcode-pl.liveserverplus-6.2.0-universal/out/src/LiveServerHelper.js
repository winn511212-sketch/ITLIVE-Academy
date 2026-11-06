'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveServerHelper = void 0;
const live_server_1 = __importDefault(require("live-server"));
const http_shutdown_1 = __importDefault(require("http-shutdown"));
class LiveServerHelper {
    static startServer(params, callback, newClientCallback = () => { }) {
        setTimeout(() => {
            try {
                live_server_1.default.newClientCallback = newClientCallback;
                let httpServer = live_server_1.default.start(params);
                setTimeout(() => {
                    // if (!httpServer._connectionKey) {
                    if (!httpServer.listening) {
                        return callback({});
                    }
                    (0, http_shutdown_1.default)(httpServer);
                    return callback(httpServer);
                }, 1000);
            }
            catch (err) {
                console.error(err);
                callback({
                    errorMsg: err
                });
            }
        }, 0);
    }
    static reloadBrowser(callback) {
        live_server_1.default.reload();
        setTimeout(() => { callback(); }, 1000);
    }
    static stopServer(httpServer, callback) {
        httpServer.shutdown(() => {
            // callback(); /*only Working first time, Unknown Bug*/
        });
        httpServer.close();
        live_server_1.default.shutdown();
        setTimeout(() => { callback(); }, 1000);
    }
}
exports.LiveServerHelper = LiveServerHelper;
//# sourceMappingURL=LiveServerHelper.js.map