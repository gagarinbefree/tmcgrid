import React from "react"
import {IServerSideDatasource, IServerSideGetRowsParams} from 'ag-grid-enterprise'
import axios, {AxiosResponse} from "axios"

export interface IGridData {
    id: number
    value: string
}

const TableDataSource = (): IServerSideDatasource<IGridData> => {
    const createServerSideDatasource = (): IServerSideDatasource<IGridData> => {
        return {
            getRows: async (params: IServerSideGetRowsParams<IGridData>) => {
                const response: AxiosResponse = await axios.get('/api/grid', {
                    params: {
                        startRow: params.request.startRow,
                        endRow: params.request.endRow
                    }
                })
                const result: IGridData[] = await response.data
                params.success({rowData: result})
            }
        }
    }

    return createServerSideDatasource()
}

export default TableDataSource