import './assets/scss/App.scss'
import ikLogo from './assets/logos/logo-light.svg';
import reactLogo from './assets/logos/react.svg';
import UseLocalStorage from "./components/UseLocalStorage.tsx";
import UseToggle from "./components/UseToggle.tsx";
import UseConfirm from "./components/UseConfirm.tsx";
import UseAsync from "./components/UseAsync.tsx";
import {useCallback, useState} from "react";
import classnames from "classnames";

const tabs = {
  useLocalStorage: "1",
  useToggle: "2",
  useConfirm: "3",
  useAsync: "4"
}

function App() {
  const [tab, setTab] = useState(tabs.useLocalStorage);

  const active = useCallback((tab: keyof typeof tabs) => {
    setTab(prevState => {
      if (tabs[tab] === prevState) return prevState;
      return tabs[tab];
    })
  }, [])

  return (
    <>
      <header className="navbar">
        <nav className={"nav"}>
          <div className="nav-title">IK Hooks</div>
        </nav>
      </header>
      <div className={"row"}>
        <div className={"col-2"}>
          <aside className={"sidebar"}>
            <div className={"sidebar-items show"}>
              <div
                className={classnames("sidebar-item", {
                  "active": tab === tabs.useLocalStorage
                })}
                onClick={() => {
                  active("useLocalStorage")
                }}
              >
                UseLocalStorage
              </div>
              <div
                className={classnames("sidebar-item", {"active": tab === tabs.useToggle})}
                onClick={() => {
                  active("useToggle")
                }}
              >
                UseToggle
              </div>
              <div
                className={classnames("sidebar-item", {active: tab === tabs.useConfirm})}
                onClick={() => {
                  active("useConfirm")
                }}
              >
                UseConfirm
              </div>
              <div
                className={classnames("sidebar-item", {active: tab === tabs.useAsync})}
                onClick={() => {
                  active("useAsync")
                }}
              >
                UseAsync
              </div>
            </div>
          </aside>
        </div>
        <div className={"col-10"}>
          <div className="content">
            <div>
              <a href="https://github.com/islam-kamel/ik-hooks" target="_blank">
                <img src={ikLogo} className="logo" alt="ik-logo logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
              <p className="message">
                Welcome! Feel free to open an issue or submit a pull request for new features, bug fixes, or
                improvements. Please ensure that your code adheres to the existing coding style and conventions.
              </p>
            </div>
            <hr/>

            {tab === tabs.useLocalStorage && <section><UseLocalStorage/></section>}
            {tab === tabs.useToggle && <section><UseToggle/></section>}
            {tab === tabs.useConfirm && <section><UseConfirm/></section>}
            {tab === tabs.useAsync && <section><UseAsync/></section>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
