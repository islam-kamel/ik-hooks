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
import React from 'react';
import {useLocalStorage} from "ik-hooks";

function UseLocalStorage() {
  const [count, setCount, remove] = useLocalStorage('count', 0)

  const onUp = () => {
    setCount(prev => {
      return prev + 1
    })
  }
  const onReset = () => remove()
  const onRemove = () => remove({reset: false})

  return (
    <>
      <h1>Count: {count}</h1>

      <button onClick={() => {
        setCount(prev => {
          return prev + 1
        })
      }}>
        Count Up
      </button>
      <button onClick={onReset}>Rest</button>
      <button onClick={onRemove}>Remove</button>
    </>
  )
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