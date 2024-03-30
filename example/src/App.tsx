import reactLogo from './assets/react.svg'
import ikLogo from './assets/logo-light.svg'
import './App.css'
import UseLocalStorage from "./components/UseLocalStorage.tsx";
import UseToggle from "./components/UseToggle.tsx";

function App() {
    return (
        <>
            <div>
                <a href="https://github.com/islam-kamel/ik-hooks" target="_blank">
                    <img src={ikLogo} className="logo" alt="ik-logo logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>IK Hooks</h1>
            <section><UseLocalStorage/></section>
            <hr/>
            <section><UseToggle/></section>
            <p className="quote">
                Welcome! Feel free to open an issue or submit a pull request for new features, bug fixes, or
                improvements. Please ensure that your code adheres to the existing coding style and conventions.
            </p>
        </>
    )
}

export default App
