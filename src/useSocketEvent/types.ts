import {Socket} from "socket.io-client";

export interface UseSocketEventsProps<T> {
    callback: (args?: T) => Promise<T> | void;
    event: string;
    debug?: boolean;
    socketProvider?: Socket;
}
