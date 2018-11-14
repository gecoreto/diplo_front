import React from "react";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Password from "components/Password/Password.jsx";

import image from "assets/img/sidebar-2.jpg";

const styles = {
  gridItem: {
    margin: "6em auto"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  buttonSubmit: {
    margin: "0 auto"
  },
  background:{
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '1',
    display: 'block',
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: "url(" + image + ")"
  }
};

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', redirectToReferrer: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state)
    this.setState({ redirectToReferrer: true });
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    let { redirectToReferrer } = this.state;
    const { classes } = this.props;
    if (redirectToReferrer) return <Redirect to={from} />;
    return (
      <form onSubmit={this.handleSubmit} className={classes.background}>
        <GridContainer>
          <GridItem style={styles.gridItem} xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Inicio de sesión</h4>
                <p className={classes.cardCategoryWhite}>Completa el formulario</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      inputProps={{
                        value: this.state.email,
                        onChange: this.handleChange('email')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Password
                      labelText="Contraseña"
                      id="password"
                      inputProps={{
                        value: this.state.value,
                        onChange: this.handleChange('password')
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button disabled={(!this.state.email || !this.state.password)} type="submit" fullWidth={true} className={classes.buttonSubmit} color="info">Iniciar sesión</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(styles)(Login);