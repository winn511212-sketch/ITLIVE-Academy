"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusbarUi = void 0;
const vscode_1 = require("vscode");
const Config_1 = require("./Config");
class StatusbarUi {
    static get statusbar() {
        if (!StatusbarUi._statusBarItem) {
            StatusbarUi._statusBarItem = vscode_1.window
                .createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
            // Show status bar only if user wants :)
            if (Config_1.Config.getShowOnStatusbar)
                this.statusbar.show();
        }
        return StatusbarUi._statusBarItem;
    }
    static Init() {
        StatusbarUi.Offline();
    }
    static Working(workingMsg = 'Working on it...') {
        StatusbarUi.statusbar.text = `$(pulse) ${workingMsg}`;
        StatusbarUi.statusbar.tooltip = 'In case if it takes long time, try to close all browser window.';
        StatusbarUi.statusbar.command = null;
    }
    static Offline() {
        StatusbarUi.statusbar.text = '$(broadcast) Go Live';
        StatusbarUi.statusbar.command = 'extension.liveServer.goOnline';
        StatusbarUi.statusbar.tooltip = 'Click to run live server';
    }
    static Live(port = null, numberOfClients = 0) {
        StatusbarUi.statusbar.text = `$(circle-slash) Clients: ${numberOfClients}`;
        StatusbarUi.statusbar.command = 'extension.liveServer.goOffline';
        if (port !== null) {
            StatusbarUi.statusbar.tooltip = `Port: ${port}. Click to close server`;
        }
    }
    static dispose() {
        StatusbarUi.statusbar.dispose();
    }
}
exports.StatusbarUi = StatusbarUi;
//# sourceMappingURL=StatusbarUi.js.map