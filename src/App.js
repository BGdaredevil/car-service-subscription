import { Switch, Route, Redirect, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.module.css";
import Home from "./components/Home/Home.js";
import Login from "./components/User/Login/Loign.js";
import Footer from "./components/Footer/Footer.js";
import Navigation from "./components/Navigation/Navigation.js";
import Register from "./components/User/Register/Register.js";
import AuthContextProvider from "./contexts/AuthContext.js";

function App() {
  return (
    <div className="App">
      {/* <ErrorContextProvider> */}
      <AuthContextProvider>
        {/* <ErrorComp /> */}
        <Navigation />
        {/* <Switch> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/register" component={Register} />
        {/* <Route path="*" component={Error404} /> */}
        {/* </Switch> */}
        <Footer />
      </AuthContextProvider>
      {/* </ErrorContextProvider> */}
    </div>
  );
}

export default App;
