import {IServerSideDatasource, IServerSideGetRowsParams} from 'ag-grid-enterprise'
import axios, {AxiosResponse} from 'axios'

export interface IGridData {
    id: string
    value: string
    checked: boolean
}

export interface ITableDataSource {
    createServerSideDatasource: (search: string) => IServerSideDatasource<IGridData>
    updateRowOrderOnServer: (id: string, newId: string) => Promise<void>
    updateCheckedOnServer: (id: string, value: boolean) => Promise<void>
}

const DataSource: ITableDataSource = {
    createServerSideDatasource(search: string): IServerSideDatasource<IGridData> {
        return {
            getRows: async (params: IServerSideGetRowsParams<IGridData>) => {
                try {

                    const response: AxiosResponse = await axios.get('/api/grid', {
                        params: {
                            start: params.request.startRow,
                            end: params.request.endRow,
                            search
                        }
                    })
                    const result: IGridData[] = await response.data
                    params.success({rowData: result})
                }
                catch (e: any) {
                    params.success({rowData: []})
                    console.error(e?.message)
                }
            }
        }
    },

    async updateRowOrderOnServer(id: string, newId: string): Promise<void> {
        try {
            await axios.post('/api/grid/order', { id, newId })
        }
        catch (e: any) {
            console.error(e?.message)
        }
    },

    async updateCheckedOnServer(id: string, value: boolean): Promise<void> {
        try {
            await axios.post('/api/grid/checked', {id, value})
        }
        catch (e: any) {
            console.error(e?.message)
        }
    }
}

export default DataSource