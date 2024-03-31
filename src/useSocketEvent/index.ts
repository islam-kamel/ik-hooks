import {useEffect} from "react";
import {UseSocketEventsProps} from "./types";

/**
 * useSocketEvent
 * "useSocketEvent" is a custom hook that listens to a socket event and executes a callback function when the event is triggered.
 * @param callback
 * @param event
 * @param debug
 * @param socketProvider
 */
const useSocketEvent = <T>({callback, event, debug, socketProvider}: UseSocketEventsProps<T>): void => {
    useEffect(() => {
        socketProvider?.off(event);
        socketProvider?.on(event, async (args: T) => {
            if (debug) console.log(`[socket] ${event}`);
            await callback(args);
        });
    }, [callback, debug, event, socketProvider]);
};

export {useSocketEvent};
