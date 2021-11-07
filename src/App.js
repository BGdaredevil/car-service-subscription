import { Switch, Route, Redirect, Link, NavLink } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.module.css";
import Navigation from "./components/Navigation/Navigation.js";

function App() {
  return (
    <div className="App">
      {/* <ErrorContextProvider> */}
      {/* <AuthContextProvider> */}
      {/* <ErrorComp /> */}
      <Navigation />
      {/* <Switch> */}
      {/* <Route exact path="/" component={Home} /> */}
      {/* <Route path="*" component={Error404} /> */}
      {/* </Switch> */}
      {/* <Footer /> */}
      {/* </AuthContextProvider> */}
      {/* </ErrorContextProvider> */}
      Hello
    </div>
  );
}

export default App;
