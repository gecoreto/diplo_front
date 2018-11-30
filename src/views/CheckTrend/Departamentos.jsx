// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import Map from "components/Map/Map.jsx";
import Colombia from "components/Map/mapas/colombia-map";

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

class Departamentos extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // const { classes } = this.props;
        // const { addProduct, productsTable, country, deparment, city, currentStep } = this.state;
        return (
            <div>
                <Map data={Colombia} width={800} height={800} />
            </div>
        );
    }
}

export default withStyles(styles)(Departamentos);
