import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default props => {
    if (props.uid) {
        const transactionColumnDefs = [
            { headerName: "FileMark", field: "FileMark", width:100 },
            { headerName: "Description", field: "Description" },
            { headerName: "Fee", field: "Fee", width: 100 },
            { headerName: "Amount", field: "Amount", width:100 }
        ];

        const partyColumnDefs = [
            { headerName: "PartyName", field: "PartyName" },            
            { headerName: "PartyType", field: "PartyType" },
            { headerName: "PartyStatus", field: "PartyStatus" },
            { headerName: "AttorneyName", field: "AttorneyName" },
            { headerName: "AttorneyStatus", field: "AttorneyStatus" },
            { headerName: "FirmPhone", field: "FirmPhone" },
            { headerName: "PartyNumber", field: "PartyNumber" },
        ];

        let parties = props.parties.filter((v) => {
            return v.PartyType !== 'PLAINTIFF' &&
                v.PartyStatus === 'ACTIVE';
        })

        return (
            <div>
                <h2>Detail Info</h2>
                <hr />
                {props.uid ? (
                    <div>
                        <div className="row">
                            <div className="col">{props.uid}</div>
                            <div className="col">
                                {props.prop_address_one}
                                <br />
                                {props.prop_address_two ? (
                                    <span>
                                        {props.prop_address_two}
                                        <br />
                                    </span>
                                ) : null}
                                {props.prop_city}, {props.prop_state} {props.prop_zipcode} <br />
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col ag-theme-balham"
                                style={{
                                    height: "250px",
                                    fontSize: "9pt"
                                }}
                            >
                                <AgGridReact
                                    enableColResize={true}
                                    reactNext={true}
                                    enableSorting={true}
                                    enableFilter={true}
                                    rowSelection="multiple"
                                    columnDefs={partyColumnDefs}
                                    rowData={parties}
                                />
                            </div>
                            <div
                                className="col ag-theme-balham"
                                style={{
                                    height: "250px",
                                    fontSize: "9pt"
                                }}
                            >
                                <AgGridReact
                                    enableColResize={true}
                                    reactNext={true}
                                    enableSorting={true}
                                    enableFilter={true}
                                    rowSelection="multiple"
                                    columnDefs={transactionColumnDefs}
                                    rowData={props.transactions}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>No Record Selected</div>
                )}
            </div>
        );
    } else {
        return null;
    }
};
