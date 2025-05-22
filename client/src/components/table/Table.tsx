import React, {ChangeEvent, FC, ReactElement, useCallback, useMemo, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {
    CellValueChangedEvent,
    ColDef,
    colorSchemeDarkBlue,
    GetRowIdParams,
    IServerSideDatasource,
    themeQuartz
} from 'ag-grid-enterprise'
import DataSource, {IGridData} from './DataSource'
import {RowDragEndEvent} from 'ag-grid-community/dist/types/src/events'
import {RowSelectionOptions} from 'ag-grid-community/dist/types/src/entities/gridOptions'

const Table: FC = (): ReactElement => {
    const [search, setSearch] = useState('')

    const columnDefs = useMemo<ColDef<IGridData>[]>(() => [
        { field: "id", width: 100, rowDrag: true, sortable: false },
        { field: "value", flex: 2, sortable: false },
        {
            field: "checked",
            headerName: "Selected",
            width: 100,
            cellRenderer: 'agCheckboxCellRenderer',
            cellEditor: 'agCheckboxCellEditor',
            editable: true,
            sortable: false
        }
    ], [])

    const defaultColDef = useMemo<ColDef>(() => ({
        suppressHeaderMenuButton: true,
    }), [])

    const rowSelection = useMemo<RowSelectionOptions<IGridData>>(() => ({
        mode: 'multiRow',
        headerCheckbox: false,
        checkboxes: false
    }), [])

    const serverSideDatasource = (): IServerSideDatasource<IGridData> =>
        DataSource.createServerSideDatasource(search);

    const onCellValueChanged = useCallback(async (event: CellValueChangedEvent<IGridData>): Promise<void> =>
        await DataSource.updateCheckedOnServer(event.data.id, event.newValue), [])

    const onRowDragEnd = useCallback(async (event: RowDragEndEvent<IGridData>): Promise<void> => {
        if (!event.overNode || !event.node.id)
            return

        if (event.overNode.data)
            await DataSource.updateRowOrderOnServer(event.node.id, event.overNode.data.id)

        event.api.refreshServerSide({ purge: false });
    }, [])

    return (
        <div style={{height: 400}}>
            <input
                type="text"
                id="filter-text-box"
                placeholder="filter..."
                className="input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                value={search}
                autoComplete="off"
            />
            <div style={{margin: 2}}></div>
            <AgGridReact<IGridData>
                columnDefs={columnDefs}
                theme={themeQuartz.withPart(colorSchemeDarkBlue)}
                rowModelType="serverSide"
                serverSideDatasource={serverSideDatasource()}
                serverSideInitialRowCount={20}
                cacheBlockSize={20}
                maxBlocksInCache={1}
                rowBuffer={0}
                defaultColDef={defaultColDef}
                getRowId={(params: GetRowIdParams<IGridData>) => params.data.id}
                rowSelection={rowSelection}
                onRowDragEnd={onRowDragEnd}
                onCellValueChanged={onCellValueChanged}
            />
        </div>
    ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
}

export default Table