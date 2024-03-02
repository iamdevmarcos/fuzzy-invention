"use client";

import { process } from "@progress/kendo-data-query";
import {
  GridColumn as Column,
  Grid,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";

export const KendoGrid = () => {
  const [dataState, setDataState] = useState({ take: 10, skip: 0 });
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await api();
        setMoviesList(data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

  const exportPDF = () => {
    gridPDFExport.save();
  };

  const onDataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const grid = (
    <Grid
      className="grid"
      data={process(moviesList, dataState)}
      filterable={true}
      pageable={true}
      {...dataState}
      onDataStateChange={onDataStateChange}
      total={moviesList.length}
    >
      <GridToolbar>
        <button
          title="Export PDF"
          onClick={exportPDF}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
        >
          Export PDF
        </button>
      </GridToolbar>
      <Column className="column" field="title" filter="text" title="Title" />
      <Column
        className="column"
        field="overview"
        filterable={false}
        title="Overview"
      />
      <Column
        className="column"
        field="releaseDate"
        filter="date"
        title="Release Date"
      />
      <Column
        className="column"
        field="voteAverage"
        filter="numeric"
        title="Note"
      />
      <Column
        className="column"
        field="originalLanguage"
        filter="text"
        title="Original Lang"
      />
    </Grid>
  );

  const gridPDFExportRef = useRef(null);

  return (
    <div className="grid-container">
      {grid}
      <GridPDFExport ref={gridPDFExportRef} fileName="movies-export.pdf">
        {grid}
      </GridPDFExport>
    </div>
  );
};
