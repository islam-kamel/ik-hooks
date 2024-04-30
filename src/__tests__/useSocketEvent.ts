/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {createServer} from "node:http";
import {io as ioc} from "socket.io-client";
import {Server} from "socket.io";
import {useSocketEvent} from "../useSocketEvent";
import {renderHook} from "@testing-library/react";

global.setImmediate = async (callback) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, 0);
    })
};

function waitFor(socket, event) {
    return new Promise((resolve) => {
        socket.once(event, resolve);
    });
}

let serverSocket;
const PORT = 3000;
const httpServer = createServer();
const io = new Server(httpServer);
httpServer.listen(PORT)
io.on("connection", (socket) => {
    serverSocket = socket;
});
const clientSocket = ioc(`http://localhost:${PORT}`);

describe("my awesome project", () => {

    beforeAll((done) => {
        clientSocket?.on("connect", () => {
            if (serverSocket) done()
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.disconnect();
    });

    it("return the correct value", async () => {
        serverSocket.emit("test", "hello");
        const res = await waitFor(clientSocket, "test");
        expect(res).toBe("hello")
    })

    it("executes the callback function", async () => {
        const callback = jest.fn();
        const {result} = renderHook(() => useSocketEvent({callback, event: "test", socketProvider: clientSocket}));
        serverSocket.emit("test", "hello");
        await waitFor(clientSocket, "test");
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("hello");
    })
});