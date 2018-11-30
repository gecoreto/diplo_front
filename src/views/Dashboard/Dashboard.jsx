import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import colombia from "assets/img/colombia.svg";
import { List, ListItem, ListItemText } from "@material-ui/core";

class Dashboard extends React.Component {
  state = {
    value: 0,
    isAdmin: !!sessionStorage.getItem('isAdmin')
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    const { isAdmin } = this.state;
    return (
      <div>
        {(isAdmin) ?
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Accessibility />
                    </CardIcon>
                    <p className={classes.cardCategory}>Usuarios Registrados</p>
                    <h3 className={classes.cardTitle}>120</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Incidencias resueltas</p>
                    <h3 className={classes.cardTitle}>10</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Últimas 24 horas
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Icon>info_outline</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Incidencias por solucionar</p>
                    <h3 className={classes.cardTitle}>4</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Últimas 24 horas
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="success">
                    <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Ventas diarias</h4>
                    <p className={classes.cardCategory}>
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                      Incremento de las ventas en los ultimos dias.
                </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> Recien actualizado
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="warning">
                    <ChartistGraph
                      className="ct-chart"
                      data={emailsSubscriptionChart.data}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                      listener={emailsSubscriptionChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Subscripcion de email</h4>
                    <p className={classes.cardCategory}>
                      Rendimiento de la última campaña
                </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> Campaña enviada hace 2 días
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <ChartistGraph
                      className="ct-chart"
                      data={completedTasksChart.data}
                      type="Line"
                      options={completedTasksChart.options}
                      listener={completedTasksChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Tareas completadas</h4>
                    <p className={classes.cardCategory}>
                      Rendimiento de la última campaña
                </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> Campaña enviada hace 2 días
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Ultimos usuarios registrados</h4>
                    <p className={classes.cardCategoryWhite}>
                      Nuevos usuarios en las últimas 24 horas.
                </p>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["Nombre", "País"]}
                      tableData={[
                        ["1", "Dakota Rice", "Niger"],
                        ["2", "Minerva Hooper", "Curaçao"],
                        ["3", "Sage Rodriguez", "Netherlands"],
                        ["4", "Philip Chaney", "Korea, South"]
                      ]}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          :
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader style={{ height: "500px", textAlign: "center" }} color="info">
                    <iframe frameBorder="0" width="500px" height="500px" src="http://127.0.0.1:8000/graficas/uno">
                      <p>Your browser does not support iframes.</p>
                    </iframe>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Estimación tendencia de productos a través de los años</h4>
                    <p className={classes.cardCategory}>
                      Rendimiento de las exportaciones
                                </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> Ultima consulta de tendencia realizada
                </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader color="success">
                    {/* <ChartistGraph
                      className="ct-chart"
                      data={completedTasksChart.data}
                      type="Line"
                      options={completedTasksChart.options}
                      listener={completedTasksChart.animation}
                    /> */}
                    <img style={{ maxWidth: "500px", maxHeight: "493px" }} src={colombia} />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Mapa departamentos de Colombia</h4>
                    <p className={classes.cardCategory}>
                      Departamentos con mayor exportación de acuerdo a los productos seleccionados:
                </p>
                    <List dense={true}>
                      <ListItem>
                        <ListItemText
                          primary="Meta"
                        />
                        <ListItemText
                          primary="Guaviare"
                        />
                        <ListItemText
                          primary="Caquetá"
                        />
                      </ListItem>
                    </List>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>

          </div>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
