import React from "react";
import PropTypes, { object } from "prop-types";
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
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Departamentos from "views/CheckTrend/Departamentos.jsx";

//Services
import axios from 'axios'

class ResultCharts extends React.Component {

    constructor(props) {
        super(props);
        this.loadGraphOne = this.loadGraphOne.bind(this);
        this.onSelectHistograma = this.onSelectHistograma.bind(this);
        this.state = {
            loading: true,
            urlGraphOne: false,
            histogramaSelected: false,
            productData: {}
        }
    }

    onSelectHistograma(keyProduct, anioSelected = 2018) {
        const { productData } = this.state;
        const prod = productData[keyProduct];
        let anios = [];
        const mesesData = Object.keys(prod)
            .reduce((data, anio) => {
                anios.push([anio, anio]);
                const meses = [
                    prod[anio]['Enero']['cantidadesTotales'] || 0,
                    prod[anio]['Febrero']['cantidadesTotales'] || 0,
                    prod[anio]['Marzo']['cantidadesTotales'] || 0,
                    prod[anio]['Abril']['cantidadesTotales'] || 0,
                    prod[anio]['Mayo']['cantidadesTotales'] || 0,
                    prod[anio]['Junio']['cantidadesTotales'] || 0,
                    prod[anio]['Julio']['cantidadesTotales'] || 0,
                    prod[anio]['Agosto']['cantidadesTotales'] || 0,
                    prod[anio]['Septiembre']['cantidadesTotales'] || 0,
                    prod[anio]['Octubre']['cantidadesTotales'] || 0,
                    prod[anio]['Noviembre']['cantidadesTotales'] || 0,
                    prod[anio]['Diciembre']['cantidadesTotales'] || 0
                ];
                data[anio] = meses;
                return data;
            }, {});
        const meses = mesesData[anioSelected];
        const max = Math.max(...meses) + 200;
        const histogramaSelected = {
            ...emailsSubscriptionChart,
            anioSelected,
            keyProduct,
            anios,
            options: {
                ...emailsSubscriptionChart.options,
                // high: 1000000,
                high: max,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: (max > 1000000) ? 40 : 20
                }
            },
            data: {
                ...emailsSubscriptionChart.data,
                series: [mesesData[anioSelected]]
            }
        }
        this.setState({ histogramaSelected })
    }

    loadGraphOne() {
        const { state: { productsTable } } = this.props;
        const products = productsTable.map(([val, labelProduct]) => ({ [val]: labelProduct }));
        axios.post('http://127.0.0.1:8000/graficas/generar', { products, numberGraph: 1 })
        // new Promise((resolver, rechazar) => {
        //     resolver({
        //         data: {"urlImg": "http://127.0.0.1:8000/graficas/uno", "products": {"banano": {"2006": {"Septiembre": {"cantidadesTotales": 160984936.44}, "Diciembre": {"cantidadesTotales": 128999598.44000001}, "Abril": {"cantidadesTotales": 120563614.16}, "Marzo": {"cantidadesTotales": 117092118.84999998}, "Mayo": {"cantidadesTotales": 171215697.26}, "Enero": {"cantidadesTotales": 101369906.03}, "Febrero": {"cantidadesTotales": 112587363.35999998}, "Octubre": {"cantidadesTotales": 110075588.49}, "Noviembre": {"cantidadesTotales": 186590238.09}, "Junio": {"cantidadesTotales": 116345776.31000002}, "Julio": {"cantidadesTotales": 103671821.3}, "Agosto": {"cantidadesTotales": 138401037.6}}, "2007": {"Septiembre": {"cantidadesTotales": 131851645.63}, "Diciembre": {"cantidadesTotales": 155279661.37}, "Abril": {"cantidadesTotales": 100137251.32}, "Marzo": {"cantidadesTotales": 163578364.32}, "Mayo": {"cantidadesTotales": 176634257.65}, "Enero": {"cantidadesTotales": 73068523.35}, "Febrero": {"cantidadesTotales": 125871626.26}, "Octubre": {"cantidadesTotales": 121290386.28}, "Noviembre": {"cantidadesTotales": 216232687.37}, "Junio": {"cantidadesTotales": 146299235.76}, "Julio": {"cantidadesTotales": 139695961.56}, "Agosto": {"cantidadesTotales": 119666532.55000001}}, "2008": {"Septiembre": {"cantidadesTotales": 144203334.56}, "Diciembre": {"cantidadesTotales": 89760013.27000001}, "Abril": {"cantidadesTotales": 169335783.7}, "Marzo": {"cantidadesTotales": 108337801.74000001}, "Mayo": {"cantidadesTotales": 159145189.53}, "Enero": {"cantidadesTotales": 0.0}, "Febrero": {"cantidadesTotales": 117283876.16}, "Octubre": {"cantidadesTotales": 60293539.06}, "Noviembre": {"cantidadesTotales": 70976790.66}, "Junio": {"cantidadesTotales": 182748709.09000003}, "Julio": {"cantidadesTotales": 149407498.36}, "Agosto": {"cantidadesTotales": 150073051.04999998}}, "2009": {"Septiembre": {"cantidadesTotales": 207209439.55}, "Diciembre": {"cantidadesTotales": 120789287.94}, "Abril": {"cantidadesTotales": 129653691.15}, "Marzo": {"cantidadesTotales": 195955702.71}, "Mayo": {"cantidadesTotales": 146741892.58}, "Enero": {"cantidadesTotales": 130702348.85000001}, "Febrero": {"cantidadesTotales": 213670352.29999998}, "Octubre": {"cantidadesTotales": 177201979.73999998}, "Noviembre": {"cantidadesTotales": 194321781.54999998}, "Junio": {"cantidadesTotales": 130444680.35}, "Julio": {"cantidadesTotales": 181138720.12}, "Agosto": {"cantidadesTotales": 144401460.12}}, "2010": {"Septiembre": {"cantidadesTotales": 157147041.44}, "Diciembre": {"cantidadesTotales": 132095580.47000003}, "Abril": {"cantidadesTotales": 125352128.68}, "Marzo": {"cantidadesTotales": 168477434.16}, "Mayo": {"cantidadesTotales": 103614775.44}, "Enero": {"cantidadesTotales": 132018230.05000001}, "Febrero": {"cantidadesTotales": 128519517.1}, "Octubre": {"cantidadesTotales": 192480238.51999998}, "Noviembre": {"cantidadesTotales": 182149802.26}, "Junio": {"cantidadesTotales": 83732806.89999999}, "Julio": {"cantidadesTotales": 134058242.76000002}, "Agosto": {"cantidadesTotales": 152142142.01}}, "2011": {"Septiembre": {"cantidadesTotales": 182379145.89999998}, "Diciembre": {"cantidadesTotales": 143338763.14}, "Abril": {"cantidadesTotales": 116819316.16999999}, "Marzo": {"cantidadesTotales": 128695887.25}, "Mayo": {"cantidadesTotales": 199365793.21}, "Enero": {"cantidadesTotales": 169605117.49999997}, "Febrero": {"cantidadesTotales": 107615729.28}, "Octubre": {"cantidadesTotales": 199903200.5}, "Noviembre": {"cantidadesTotales": 168485640.98999998}, "Junio": {"cantidadesTotales": 155014235.1}, "Julio": {"cantidadesTotales": 66666758.839999996}, "Agosto": {"cantidadesTotales": 190391470.05}}, "2012": {"Septiembre": {"cantidadesTotales": 118610213.5}, "Diciembre": {"cantidadesTotales": 158867722.26}, "Abril": {"cantidadesTotales": 106189142.94}, "Marzo": {"cantidadesTotales": 98636258.3}, "Mayo": {"cantidadesTotales": 207270389.83}, "Enero": {"cantidadesTotales": 135708405.4}, "Febrero": {"cantidadesTotales": 95097472.41999999}, "Octubre": {"cantidadesTotales": 181852267.1}, "Noviembre": {"cantidadesTotales": 171382212.31999996}, "Junio": {"cantidadesTotales": 187177289.78}, "Julio": {"cantidadesTotales": 129509662.84999998}, "Agosto": {"cantidadesTotales": 143062583.59}}, "2013": {"Septiembre": {"cantidadesTotales": 71251118.82000001}, "Diciembre": {"cantidadesTotales": 192513036.11}, "Abril": {"cantidadesTotales": 198275152.25}, "Marzo": {"cantidadesTotales": 109818273.13999999}, "Mayo": {"cantidadesTotales": 145850285.64}, "Enero": {"cantidadesTotales": 98788045.06}, "Febrero": {"cantidadesTotales": 98169025.26}, "Octubre": {"cantidadesTotales": 133816205.71000001}, "Noviembre": {"cantidadesTotales": 147481290.72}, "Junio": {"cantidadesTotales": 143413424.59}, "Julio": {"cantidadesTotales": 138019765.0}, "Agosto": {"cantidadesTotales": 71871839.54999998}}, "2014": {"Septiembre": {"cantidadesTotales": 136469520.76000002}, "Diciembre": {"cantidadesTotales": 137435574.38}, "Abril": {"cantidadesTotales": 125132296.48999998}, "Marzo": {"cantidadesTotales": 136133734.82000002}, "Mayo": {"cantidadesTotales": 238142837.57999998}, "Enero": {"cantidadesTotales": 143214969.14}, "Febrero": {"cantidadesTotales": 191138590.26}, "Octubre": {"cantidadesTotales": 87744044.83999999}, "Noviembre": {"cantidadesTotales": 79960355.57}, "Junio": {"cantidadesTotales": 182541404.51000005}, "Julio": {"cantidadesTotales": 105942219.24}, "Agosto": {"cantidadesTotales": 114079239.76999998}}, "2015": {"Septiembre": {"cantidadesTotales": 123286346.92}, "Diciembre": {"cantidadesTotales": 131963231.60000001}, "Abril": {"cantidadesTotales": 194777703.54000002}, "Marzo": {"cantidadesTotales": 160756909.77}, "Mayo": {"cantidadesTotales": 126054794.6}, "Enero": {"cantidadesTotales": 113208652.62}, "Febrero": {"cantidadesTotales": 164720664.16}, "Octubre": {"cantidadesTotales": 164229225.38}, "Noviembre": {"cantidadesTotales": 96118579.39999999}, "Junio": {"cantidadesTotales": 130629436.39999999}, "Julio": {"cantidadesTotales": 89612771.01}, "Agosto": {"cantidadesTotales": 93263477.06}}, "2016": {"Septiembre": {"cantidadesTotales": 127259549.85}, "Diciembre": {"cantidadesTotales": 189437232.26}, "Abril": {"cantidadesTotales": 208627910.42000002}, "Marzo": {"cantidadesTotales": 204801353.82999998}, "Mayo": {"cantidadesTotales": 215927255.89999998}, "Enero": {"cantidadesTotales": 80583555.04}, "Febrero": {"cantidadesTotales": 171725363.01999998}, "Octubre": {"cantidadesTotales": 79256236.25999999}, "Noviembre": {"cantidadesTotales": 180161501.13}, "Junio": {"cantidadesTotales": 219822640.35999998}, "Julio": {"cantidadesTotales": 62263494.12}, "Agosto": {"cantidadesTotales": 102056102.77000001}}, "2017": {"Septiembre": {"cantidadesTotales": 146706085.45}, "Diciembre": {"cantidadesTotales": 113093655.0}, "Abril": {"cantidadesTotales": 101468704.7}, "Marzo": {"cantidadesTotales": 277431513.92}, "Mayo": {"cantidadesTotales": 292858759.75}, "Enero": {"cantidadesTotales": 127655437.3}, "Febrero": {"cantidadesTotales": 158162689.5}, "Octubre": {"cantidadesTotales": 135963541.09}, "Noviembre": {"cantidadesTotales": 111314989.84}, "Junio": {"cantidadesTotales": 160810190.28}, "Julio": {"cantidadesTotales": 127440204.94}, "Agosto": {"cantidadesTotales": 131903233.02000001}}, "2018": {"Septiembre": {"cantidadesTotales": 109666622.54}, "Diciembre": {"cantidadesTotales": 0.0}, "Abril": {"cantidadesTotales": 229173066.85}, "Marzo": {"cantidadesTotales": 131945231.92}, "Mayo": {"cantidadesTotales": 179885620.76999998}, "Enero": {"cantidadesTotales": 187897573.33}, "Febrero": {"cantidadesTotales": 144024782.67}, "Octubre": {"cantidadesTotales": 0.0}, "Noviembre": {"cantidadesTotales": 0.0}, "Junio": {"cantidadesTotales": 98035727.13999999}, "Julio": {"cantidadesTotales": 136747504.5}, "Agosto": {"cantidadesTotales": 173745128.57}}}}}
        //     });
        // })
            .then((resp) => {
                console.log(resp)
                const { data: { urlImg, products } } = resp;
                this.setState({
                    loading: false,
                    urlGraphOne: urlImg,
                    productData: products
                })
                const keyProduct = Object.keys(products).sort()[0];
                this.onSelectHistograma(keyProduct)
            })
            .catch((error) => {
                // handle error
                console.log('error', error);
                alert('Estamos presentando incovenientes')
            })
            .then(() => {
                this.setState({
                    loading: false
                })
            })

    }

    componentDidMount() {
        this.loadGraphOne();
    }

    render() {
        const { classes, state: { productsTable }, onChangeStep } = this.props;
        const { loading, urlGraphOne, histogramaSelected } = this.state;
        const productos = productsTable.map(([key, label]) => ([key, label]));
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        {(!!histogramaSelected) ?
                            <Card chart>
                                <CardHeader color="info">
                                    <ChartistGraph
                                        className="ct-chart"
                                        data={histogramaSelected.data}
                                        type="Bar"
                                        options={histogramaSelected.options}
                                        responsiveOptions={histogramaSelected.responsiveOptions}
                                        listener={histogramaSelected.animation}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h4 className={classes.cardTitle}>Cantidad a través de los meses durante el año seleccionado</h4>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomSelect
                                                labelText="Producto"
                                                id="producto-select"
                                                inputProps={{
                                                    value: histogramaSelected.keyProduct,
                                                    onChange: (e, el) => {
                                                        this.onSelectHistograma(el.props.value, histogramaSelected.anioSelected)
                                                    }
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                options={productos}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomSelect
                                                labelText="Año"
                                                id="anio-select"
                                                inputProps={{
                                                    value: histogramaSelected.anioSelected,
                                                    onChange: (e, el) => {
                                                        this.onSelectHistograma(histogramaSelected.keyProduct, el.props.value)
                                                    }
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                options={histogramaSelected.anios}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            : null}
                        <Card chart>
                            <CardHeader color="info">
                                Productos seleccionados
                            </CardHeader>
                            <CardBody>
                                {productsTable.map(([id, producto], key) => {
                                    return (<div key={key}>
                                        <h4 style={{ borderBottom: 'dashed 1px #00acc1', paddingBottom: '5px' }} className={classes.cardTitle}> {producto}</h4>
                                        {/* <p className={classes.cardCategory}>
                                            <span className={classes.successText}>
                                                <ArrowUpward className={classes.upArrowCardCategory} /> 30%
                                            </span>
                                            {" "}
                                            Aumento en las exportaciones.
                                        </p> */}
                                    </div>);
                                })}
                                <Button style={{
                                    float: 'right', padding: '7px 8px',
                                    minWidth: '64px',
                                    fontSize: '0.8125rem',
                                    minHeight: '32px',
                                    marginTop: '1em'
                                }} variant="outlined" onClick={(e) => { onChangeStep(e, true) }} type="button" color="warning">
                                    Editar
                                </Button>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card chart>
                            <CardHeader style={{ height: "500px", textAlign: "center" }} color="info">
                                {
                                    (loading) ?
                                        <p style={{ marginTop: '49%', fontSize: '2em' }}>Cargando...</p>
                                        :
                                        (!!urlGraphOne) ?
                                            <iframe frameBorder="0" width="500px" height="500px" src={urlGraphOne}>
                                                <p>Your browser does not support iframes.</p>
                                            </iframe> : null
                                }

                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Estimación tendencia de productos a través de los años</h4>
                                <p className={classes.cardCategory}>
                                    Rendimiento de las exportaciones
                                </p>
                            </CardBody>
                            {/* <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime /> Actualizado 1 minuto atras
                </div>
                            </CardFooter> */}
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
