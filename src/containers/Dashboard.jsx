import React from "react";
import { withRouter } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import PropertyDetail from "../components/PropertyDetail";

class AddressCellRenderer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <span>{this.props.data.prop_address_one} </span>
                {this.props.data.prop_address_two ? <span>{this.props.data.prop_address_two} </span> : null}
                {this.props.data.prop_city}, {this.props.data.prop_state} {this.props.data.prop_zipcode}
            </React.Fragment>
        );
    }
}

class DashboardE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRecord: {},
            columnDefs: [
                { headerName: "UID", field: "uid", checkboxSelection: true, width: 140 },
                { headerName: "County", field: "county", width: 120 },
                { headerName: "Cause #", field: "cause_nbr", width: 120 },
                { headerName: "Sale Date", field: "sale_date", width: 120 },
                { headerName: "Status", field: "status", width: 140 },
                { headerName: "Account #", field: "account_nbr", width: 120 },
                {
                    headerName: "Property Address",
                    children: [
                        {
                            headerName: "",
                            cellRenderer: "addressCellRenderer",
                            suppressSorting: true,
                            suppressFilter: true,
                            columnGroupShow: "closed"
                        },
                        {
                            headerName: "Address 1",
                            field: "prop_address_one",
                            columnGroupShow: "open"
                        },
                        {
                            headerName: "Address 2",
                            field: "prop_address_two",
                            columnGroupShow: "open"
                        },
                        {
                            headerName: "City",
                            field: "prop_city",
                            columnGroupShow: "open"
                        },
                        {
                            headerName: "State",
                            field: "prop_state",
                            columnGroupShow: "open"
                        },
                        {
                            headerName: "Zip",
                            field: "prop_zipcode",
                            columnGroupShow: "open"
                        }
                    ]
                },
                { headerName: "Value", field: "value", width: 100 },
                { headerName: "Minimum", field: "minimum_bid", width: 100 },
                { headerName: "Sale Notes", field: "sale_notes" },
                { headerName: "Court #", field: "details.court_nbr", width: 100 },
                { headerName: "Precinct", field: "details.precinct", width: 100 },
                { headerName: "Style", field: "details.case_style" },
                { headerName: "School District", field: "details.school_district" },
                { headerName: "Excess Amount", field: "ExcessAmount", width: 120 },
                { headerName: "Balance", field: "balance", width: 120 }
            ],
            rowData: []
        };
    }

    componentDidMount() {
        if (this.props.properties.length === 0) {
            this.props.loadPropertyData(this.UpdateTableData);
        }
    }

    UpdateTableData = data => {
        this.setState(
            {
                rowData: data
            },
            () => {
                var filterModel = {
                    county: {
                        type: "equals",
                        filter: "Tarrant County"
                    }
                };
                this.gridApi.setFilterModel(filterModel);
                //this.gridApi.onFilterChanged();
                //console.log("DATA", this.state.rowData.length);
            }
        );
    };

    onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => node.uid).join(", ");
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    };

    onRowClicked = node => {
        this.setState({
            activeRecord: node.data
        });
    };

    render() {
        return (
            <div>
                <h4>Dashboard E - ag-grid-react</h4>
                <hr />
                <div
                    className="ag-theme-balham"
                    style={{
                        height: "40vh",
                        fontSize: "9pt"
                    }}
                >
                    <button onClick={this.onButtonClick}>Get selected rows</button>
                    <AgGridReact
                        enableColResize={true}
                        reactNext={true}
                        onGridReady={params => (this.gridApi = params.api)}
                        enableSorting={true}
                        enableFilter={true}
                        rowSelection="multiple"
                        onRowClicked={this.onRowClicked}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        frameworkComponents={{
                            addressCellRenderer: AddressCellRenderer
                        }}
                        rowHeight={25}
                    />
                    <PropertyDetail {...this.state.activeRecord} />
                </div>
            </div>
        );
    }
}
export default withRouter(DashboardE);

/// ******************************** Summary *************************************
/// Native React
/// Easy simple programming model, but very deep functionality.  Most powerful grid.
/// Easiest and most powerful options for column filters
/// Easy Grouping and "folding" of columns in groups.
/// Reasonable easy out-of-table Master-Detail
