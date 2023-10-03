import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import "./theme/variables.css";
import "./theme/globals.css";
import { ContextContainer } from "./components/AppContext";
import Board from "./pages/Board";
import Initial from "./pages/Initial";
import { LOCAL_STORAGE } from "./utils/envariables";
setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <ContextContainer>
          <Route
            path={"/deslogar"}
            render={() => {
              localStorage.removeItem(LOCAL_STORAGE.USER_DATA);
              window.location.pathname = "/";
              return <>Um momento...</>;
            }}
          />
          <Route path="/" exact={true}>
            <Route path={"/"}>
              <Initial />
            </Route>
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path={"/avisos"}>
            <Board />
          </Route>
        </ContextContainer>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
