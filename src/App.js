import { Switch, Route, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.module.css";
import Home from "./components/Home/Home.js";
import Login from "./components/User/Login/Loign.js";
import Footer from "./components/Footer/Footer.js";
import Navigation from "./components/Navigation/Navigation.js";
import Register from "./components/User/Register/Register.js";
import AuthContextProvider from "./contexts/AuthContext.js";
import RouteGuard from "./contexts/RouteGuard.js";
import Profile from "./components/User/Profile/Profile.js";
import CreateCar from "./components/Car/Create/Create.js";
import CreateShop from "./components/Shops/Create/Create.js";
import DetailsCar from "./components/Car/Details/Details.js";
import EditCar from "./components/Car/Edit/Edit.js";
import DetailsShop from "./components/Shops/Details/Details.js";
import EditShop from "./components/Shops/Edit/Edit.js";

function App() {
  return (
    <div className="App">
      {/* <ErrorContextProvider> */}
      <AuthContextProvider>
        {/* <ErrorComp /> */}
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <RouteGuard exact path="/user/profile" component={Profile} />
          <RouteGuard exact path="/car/create" component={CreateCar} />
          <RouteGuard exact path="/car/edit/:id" component={EditCar} />
          <RouteGuard exact path="/car/:id" component={DetailsCar} />
          <RouteGuard exact path="/shop/create" component={CreateShop} />
          <RouteGuard exact path="/shop/:id" component={DetailsShop} />
          <RouteGuard exact path="/shop/edit/:id" component={EditShop} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/logout" component={() => <Redirect to="/user/login" />} />
          {/* <Route path="*" component={Error404} /> */}
        </Switch>
        <Footer />
      </AuthContextProvider>
      {/* </ErrorContextProvider> */}
    </div>
  );
}

export default App;
