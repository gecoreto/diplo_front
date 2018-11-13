/* eslint-disable */
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import guestRoutes from "routes/guest.jsx";


const switchRoutes = (
  <Switch>
    {guestRoutes.map((prop, key) => {
      if (prop.redirect)
      return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  render() {
    // console.log(this.props)
    // console.log(this.getRoute())
    const { classes, ...rest } = this.props;
    return (
      <div>{switchRoutes}</div>
    );
  }
}

export default App;
