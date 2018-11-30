// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Delete from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import React from "react";
//views
import ResultCharts from "views/CheckTrend/ResultCharts.jsx";

const styles = {
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
    deleteButton: {
        width: '23px',
        height: '23px',
        color: '#f44336',
        boxShadow: 'none',
        backgroundColor: 'transparent'
    },
    tableActionButton: {
        width: '27px',
        height: '27px',
        padding: '0'
    }
};

class CheckTrend extends React.Component {

    constructor(props) {
        super(props);
        const productsDatasets = [
            ['acuicultura', 'Pescados'],
            ['aguacate', 'Aguacate'],
            ['algodon', 'Algodón'],
            ['arroz', 'Arroz'],
            ['avicultura', 'Avicultura'],
            ['banano', 'Banano'],
            ['cacao', 'Cacao'],
            ['cafe', 'Café'],
            ['caucho', 'Caucho'],
            ['flores', 'Flores'],
            ['maiz', 'Maíz'],
            ['mango', 'Mango'],
            ['papa', 'Papa'],
            ['piña', 'Piña'],
            ['platano', 'Platano'],
            ['yuca', 'Yuca'],

        ];
        productsDatasets.sort(([key, valOne], [keyTwo, valTwo]) => {
            valOne = valOne.toUpperCase();
            valTwo = valTwo.toUpperCase();
            if (valOne < valTwo)
                return -1;
            if (valOne < valTwo)
                return 1;
            return 0;
        });
        this.state = {
            currentStep: 1,
            addProduct: '',
            country: '',
            deparment: '',
            city: '',
            redirectToReferrer: false,
            productsTable: [],
            productsDatasets,
            countries: [
                [1, 'Colombia'],
                [2, 'Panama'],
                [3, 'Peru'],
            ],
            deparments: [
                [1, 'Cundinamarca'],
                [2, 'Atlantico'],
                [3, 'Meta'],
            ],
            cities: [
                [1, 'Bogotá'],
                [2, 'Barranquilla'],
                [3, 'Villavicencio'],
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChangeStep = this.onChangeStep.bind(this);
        this.handleSubmitForms = this.handleSubmitForms.bind(this);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmitForms(event) {
        event.preventDefault();
        const { addProduct, productsTable, currentStep, productsDatasets } = this.state;
        const [valP, labelProduct] = productsDatasets.find(([key]) => key === addProduct);
        switch (currentStep) {
            case 1:
                this.setState({
                    addProduct: '',
                    productsTable: [
                        ...productsTable,
                        [
                            addProduct,
                            labelProduct,
                            <Tooltip
                                id="tooltip-top-start"
                                title="Eliminar"
                                placement="top"
                            >
                                <IconButton
                                    aria-label="Close"
                                    style={styles.tableActionButton}
                                >
                                    <Delete style={styles.deleteButton} onClick={() => { this.removeProductTable(addProduct) }} />
                                </IconButton>
                            </Tooltip>
                        ]
                    ]
                });
                break;
            case 2:
                this.setState({
                    currentStep: currentStep + 1
                });
                break;
            default:
        }
    }

    onChangeStep(event, back = false) {
        event.preventDefault();
        const { currentStep } = this.state;
        this.setState({
            currentStep: back ? currentStep - 1 : currentStep + 1
        })
    }

    removeProductTable(addProduct) {
        const { productsTable } = this.state;
        this.setState({
            productsTable: productsTable.filter((p) => p[0] !== addProduct)
        });
    }

    render() {
        const { classes } = this.props;
        const { addProduct, productsTable, country, deparment, city, currentStep } = this.state;
        return (
            <div>
                {{
                    1: (
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <Card profile>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Agregar producto</h4>
                                        {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
                                    </CardHeader>
                                    <CardBody profile>
                                        <form onSubmit={this.handleSubmitForms}>
                                            <CustomSelect
                                                labelText="Selecciona un producto"
                                                id="addProduct"
                                                inputProps={{
                                                    value: addProduct,
                                                    onChange: this.handleChange('addProduct')
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                options={this.state.productsDatasets}
                                            />
                                            {/* <CustomInput
                                                labelText="Ej: yuca"
                                                id="addProduct"
                                                inputProps={{
                                                    value: addProduct,
                                                    onChange: this.handleChange('addProduct')
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            /> */}
                                            <p className={classes.description}>
                                                Ingresa uno a uno los productos que quieres consultar.
                                            </p>
                                            <Button disabled={(!addProduct)} type="submit" color="primary" round>
                                                Agregar
                                            </Button>
                                        </form>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="info">
                                        <h4 className={classes.cardTitleWhite}>Listado de productos agregados</h4>
                                        <p className={classes.cardCategoryWhite}>Una vez termines de agregar tus productos da click en "Siguiente".</p>
                                    </CardHeader>
                                    <CardBody>
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["Nombre", "Opciones"]}
                                            tableData={productsTable}
                                        />
                                    </CardBody>
                                    <CardFooter>
                                        <Button onClick={this.onChangeStep} disabled={(productsTable.length === 0)} color="info">Siguiente</Button>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    ),
                    20000: (
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="info">
                                        <h4 className={classes.cardTitleWhite}>Zona geográfica</h4>
                                        <p className={classes.cardCategoryWhite}>Ingresa el país, departamento y ciudad donde cultivas actualmente</p>
                                    </CardHeader>
                                    <CardBody>
                                        <form onSubmit={this.handleSubmitForms}>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <CustomSelect
                                                        labelText="País"
                                                        id="country"
                                                        inputProps={{
                                                            value: country,
                                                            onChange: this.handleChange('country')
                                                        }}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        options={this.state.countries}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <CustomSelect
                                                        labelText="Departamento"
                                                        id="deparment"
                                                        inputProps={{
                                                            value: deparment,
                                                            onChange: this.handleChange('deparment')
                                                        }}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        options={this.state.deparments}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <CustomSelect
                                                        labelText="Ciudad"
                                                        id="city"
                                                        inputProps={{
                                                            value: city,
                                                            onChange: this.handleChange('city')
                                                        }}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        options={this.state.cities}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <Button variant="outlined" onClick={(e) => { this.onChangeStep(e, true) }} type="button" color="warning">
                                                Regresar
                                            </Button>
                                            <Button disabled={(!country || !deparment || !city)} style={{ marginLeft: '10px' }} type="submit" color="info">
                                                Siguiente
                                            </Button>
                                        </form>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    ),
                    2: (
                        <ResultCharts state={this.state} onChangeStep={this.onChangeStep} />
                    )
                }[currentStep]}
            </div>
        );
    }
}

export default withStyles(styles)(CheckTrend);
