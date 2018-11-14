import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
//Google charts
import Chart from 'react-google-charts';

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class ResultCharts extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card chart>
                            <CardHeader color="info">
                                Tendencias en productos
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}> Papa</h4>
                                <p className={classes.cardCategory}>
                                    <span className={classes.successText}>
                                        <ArrowUpward className={classes.upArrowCardCategory} /> 30%
                                    </span>{" "}
                                    Aumento en las exportaciones.
                                    </p>
                                <h4 className={classes.cardTitle}> Yuca</h4>
                                <p className={classes.cardCategory}>
                                    <span className={classes.dangerText}>
                                        <ArrowDownward className={classes.upArrowCardCategory} /> 3%
                                    </span>{" "}
                                    Aumento en las exportaciones.
                                    </p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                        <Card chart>
                            <CardHeader color="info">
                                <Chart
                                    width={'100%'}
                                    height={'100%'}
                                    chartType="ColumnChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['City', '2010 Population', '2000 Population'],
                                        ['New York City, NY', 8175000, 8008000],
                                        ['Los Angeles, CA', 3792000, 3694000],
                                        ['Chicago, IL', 2695000, 2896000],
                                        ['Houston, TX', 2099000, 1953000],
                                        ['Philadelphia, PA', 1526000, 1517000],
                                    ]}
                                    options={{
                                        title: 'Population of Largest U.S. Cities',
                                        chartArea: { width: '30%' },
                                        hAxis: {
                                            title: 'Total Population',
                                            minValue: 0,
                                        },
                                        vAxis: {
                                            title: 'City',
                                        },
                                    }}
                                    legendToggle
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Tendencias en importaciones</h4>
                                <p className={classes.cardCategory}>
                                    <span className={classes.successText}>
                                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                                    </span>{" "}
                                    Aumento en las importaciones de hoy.
                                    </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime /> Actualizado 4 minutos atras
                                </div>
                            </CardFooter>
                        </Card>
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
                                <h4 className={classes.cardTitle}>Ventas en este año</h4>
                                <p className={classes.cardCategory}>
                                    Rendimiento de las ventas
                                </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime /> Actualizado 1 minuto atras
                </div>
                            </CardFooter>
                        </Card>

                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} />
                    <GridItem xs={12} sm={12} md={9}>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

ResultCharts.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ResultCharts);
