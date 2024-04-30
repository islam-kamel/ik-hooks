# IK Hooks 🪝

IK hooks is a collection of custom React hooks designed to enhance your development experience by providing useful
utilities for common tasks. These hooks are designed to be simple, efficient, and seamlessly integrate with your React
projects.

## Features

- **useLocalStorage**: A hook for storing state locally within the user's browser using Local Storage. Easily persist
  data across page reloads and maintain a seamless user experience.
- **useToggle**: A hook for managing boolean state values. Simplify the process of toggling between true and false
  values with ease.
- **useSocketEvent**: A hook for handling real-time data updates using WebSockets. Subscribe to specific events and
  receive updates in real-time and execute callback fn with args.

_(More hooks to be added in future releases)_

## Installation

You can install ik-hooks using npm:

```bash
npm install ik-hooks
```

or using yarn:

```bash
yarn add ik-hooks
```

## Usage

Simply import the desired hook into your React component and start using it right away:

## useLocalStorage

```javascript
import {useLocalStorage} from "ik-hooks";
import {useCallback, useEffect} from "react";

function UseLocalStorage() {

  const {value: count, remove, set: setCount, get: getCount, processing, getAsyncValue} = useLocalStorage('count', 0)

  const onReset = useCallback(() => {
    remove()
  }, [remove])

  const onRemove = useCallback(() => {
    remove({reset: false})
  }, [remove])

  useEffect(() => {
    console.log("get Storage", getCount())
  }, [getCount]);

  useEffect(() => {
    getAsyncValue().then(value => {
      console.log("getAsyncValue", value)
    })
  }, [getAsyncValue]);

  useEffect(() => {
    console.log("here")
  }, []);

  return (
          <>
            <h2>useLocalStorage</h2>
            <div className="card">
              <button onClick={() => {
                setCount(prevState => prevState + 1)
              }}>
                {processing ? 'Processing...' : <>count is {count}</>}
              </button>
              <button
                      onClick={onReset}
              >
                Rest
              </button>
              <button
                      onClick={onRemove}
              >
                Remove
              </button>
            </div>
          </>
  );
}

export default UseLocalStorage; 
```

## useToggle

```javascript
import {useToggle} from "ik-hooks";

function UseToggle() {
  const [isOpen, toggle] = useToggle(true)

  return (
    <>
      <h2>useToggle</h2>
      <button onClick={() => toggle()}>
        {isOpen ? 'Open' : 'Close'}
      </button>
    </>
  );
}

export default UseToggle;
```

## useSocketEvent

```javascript
import {useSocketEvent} from "ik-hooks";
import {useCallback, useState} from "react";
import {io} from "socket.io-client";

const mySocket = io("http://localhost:3000");

function UseToggle() {
  const [socketValue, setSocketValue] = useState(null);
  
  const socketCallback = useCallback((data) => {
    setSocketValue(data);
  }, []);
  
  useSocketEvent({event: "event-name", callback:socketCallback, socketProvider: mySocket, debug: true}) // debug is optional and when true will console.log the '[socket] event-name'
  return (
    <>
      <h2>useSocketEvent</h2>
      <pre>
        {JSON.stringify(socketValue, null, 2)}
      </pre>
    </>
  );
}

export default UseToggle;
```

## useConfirm

```javascript
import {useConfirm} from "ik-hooks";

function UseConfirm() {
    const {dialog, toggle} = useConfirm({
        onConfirm: () => console.log("confirmed"),
        onCancel: () => console.log("canceled"), // Optional
        message: "Are you sure ?", // Optional
        dialog: ({open, onCancel, onConfirm, message}) => (
            <dialog open={open}>
                <p>{message}</p>
                <p>Custom Dialog</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </dialog>
        ), // Optional Custom Component
    });

    return (
        <>
            <h2>useConfirm</h2>
            <button onClick={() => toggle()}>Open Dialog</button>
            {dialog}
        </>
    );
}

export default UseConfirm;
```

## Hooks Structure

each hook has the following structure:

```text
src
├── useLocalStorage
│   ├── index.ts (main hook file with hook logic only)
│   ├── types.ts (typescript types for the hook)
│   └── other dependencies (optional)
└── types.ts (global types for the library)
└── index.ts (main file that exports all hooks)
```

Make sure to follow this structure when adding new hooks to the library,
and update the README with the new hook's usage instructions.
and include the new hook in the main index.ts file.
and add the new hook test in the `__tests__` folder and all test cases passed.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for new features, bug fixes, or
improvements. Please ensure that your code adheres to the existing coding style and conventions.

## License

This project is licensed under the [MIT License](LICENSE).

```

This README provides an overview of the library, its features, installation instructions, usage examples, contribution guidelines, and licensing information. Feel free to customize it further to suit your specific needs and preferences.