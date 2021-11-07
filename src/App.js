import { Switch, Route, Redirect, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.module.css";
import Home from "./components/Home/Home.js";
import Login from "./components/User/Login/Loign.js";
import Footer from "./components/Footer/Footer.js";
import Navigation from "./components/Navigation/Navigation.js";

function App() {
  return (
    <div className="App">
      {/* <ErrorContextProvider> */}
      {/* <AuthContextProvider> */}
      {/* <ErrorComp /> */}
      <Navigation />
      {/* <Switch> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      {/* <Route path="*" component={Error404} /> */}
      {/* </Switch> */}
      <Footer />
      {/* </AuthContextProvider> */}
      {/* </ErrorContextProvider> */}
    </div>
  );
}

export default App;
