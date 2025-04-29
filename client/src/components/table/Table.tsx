import React, {FC, ReactElement, useCallback, useState} from "react"
import {AgGridReact} from 'ag-grid-react'
import {colorSchemeDarkBlue, GridReadyEvent, themeQuartz} from 'ag-grid-enterprise'
import TableDataSource, {IGridData} from "./TableDataSource";

const Table: FC = (): ReactElement => {
    const [colDefs, setColDefs] = useState([
        { field: "id" },
        { field: "value" },
    ]);

    const serverSideDatasource = useCallback(() =>TableDataSource(), [])();

    const onGridReady = useCallback((params: GridReadyEvent) => {
        params.api.sizeColumnsToFit()
    }, [])

    return (
        <div style={{ height: 400 }}>
            <input
                type="text"
                id="filter-text-box"
                placeholder="filter..."
                className="input"
            />
            <div style={{margin: 2}}></div>
            <AgGridReact<IGridData>
                columnDefs={colDefs as any}
                theme={themeQuartz.withPart(colorSchemeDarkBlue)}
                rowModelType="serverSide"
                serverSideDatasource={serverSideDatasource}
                onGridReady={onGridReady}
                serverSideInitialRowCount={20}
                cacheBlockSize={20}
                maxBlocksInCache={1}
                rowBuffer={0}
            />
        </div>
    )
}

export default Table