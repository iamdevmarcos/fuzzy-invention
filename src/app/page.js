"use client";

import { process } from "@progress/kendo-data-query";
import { Button } from "@progress/kendo-react-buttons";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import * as React from "react";
import orders from "./orders.json";

const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <div>
      <section style={{ width: "200px", float: "left" }}>
        <p>
          <strong>Rua:</strong> {dataItem.shipAddress.street}
        </p>
        <p>
          <strong>City:</strong> {dataItem.shipAddress.city}
        </p>
        <p>
          <strong>Country:</strong> {dataItem.shipAddress.country}
        </p>
        <p>
          <strong>Postal Code:</strong> {dataItem.shipAddress.postalCode}
        </p>
      </section>
      <Grid style={{ width: "500px" }} data={dataItem.details} />
    </div>
  );
};

export default function GridNextjs() {
  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    sort: [{ field: "orderDate", dir: "desc" }],
    group: [{ field: "customerID" }],
  });
  const [dataResult, setDataResult] = React.useState(
    process(orders, dataState)
  );

  const dataStateChange = (event) => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };

  const expandChange = (event) => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;

    setDataResult({ ...dataResult, data: [...dataResult.data] });
  };

  let _pdfExport;
  const exportExcel = () => {
    _export.save();
  };

  let _export;
  const exportPDF = () => {
    _pdfExport.save();
  };

  return (
    <div>
      <ExcelExport
        data={orders}
        ref={(exporter) => {
          _export = exporter;
        }}
      >
        <Grid
          id="test"
          style={{ height: "700px" }}
          sortable={true}
          filterable={true}
          groupable={true}
          reorderable={true}
          pageable={{ buttonCount: 4, pageSizes: true }}
          data={dataResult}
          {...dataState}
          onDataStateChange={dataStateChange}
          detail={DetailComponent}
          expandField="expanded"
          onExpandChange={expandChange}
        >
          <GridToolbar>
            &nbsp;&nbsp;&nbsp;
            <Button title="Export to Excel" onClick={exportExcel}>
              Export to Excel
            </Button>
            &nbsp;
            <Button onClick={exportPDF}>Export to PDF</Button>
          </GridToolbar>
          <GridColumn field="customerID" width="200px" />
          <GridColumn
            field="orderDate"
            filter="date"
            format="{0:D}"
            width="300px"
          />
          <GridColumn field="shipName" width="280px" />
          <GridColumn field="freight" filter="numeric" width="200px" />
          <GridColumn
            field="shippedDate"
            filter="date"
            format="{0:D}"
            width="300px"
          />
          <GridColumn field="employeeID" filter="numeric" width="200px" />
          <GridColumn
            locked={true}
            field="orderID"
            filterable={false}
            title="ID"
            width="90px"
          />
        </Grid>
      </ExcelExport>
      <GridPDFExport
        ref={(element) => {
          _pdfExport = element;
        }}
        margin="1cm"
      >
        {
          <Grid
            data={process(orders, {
              skip: dataState.skip,
              take: dataState.take,
            })}
          >
            <GridColumn field="customerID" width="200px" />
            <GridColumn
              field="orderDate"
              filter="date"
              format="{0:D}"
              width="300px"
            />
            <GridColumn field="shipName" width="280px" />
            <GridColumn field="freight" filter="numeric" width="200px" />
            <GridColumn
              field="shippedDate"
              filter="date"
              format="{0:D}"
              width="300px"
            />
            <GridColumn field="employeeID" filter="numeric" width="200px" />
            <GridColumn
              locked={true}
              field="orderID"
              filterable={false}
              title="ID"
              width="90px"
            />
          </Grid>
        }
      </GridPDFExport>
    </div>
  );
}
