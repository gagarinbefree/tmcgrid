import {NextFunction, Request, Response} from 'express'
import {generateData, IGridData} from "../../mock/mock"
import {Query} from 'express-serve-static-core';

export interface ITypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface IRequestParams extends Query {
    start: string
    end: string
    search: string
}

export interface IOrderBody {
    id: string
    index: number
}

export interface ICheckedBody {
    id: string
}

interface ICustomRequest<T> extends Request {
    body: T
}

const data: IGridData[] = generateData(1, 1000000)

const swapElements = (id: string, index: number): void => {
    const currentIndex = data.findIndex((item: IGridData) => item.id == id);
    [data[currentIndex], data[index]] = [data[index], data[currentIndex]];
}

const checkRow = (id: string): void => {
    const row: IGridData | undefined = data.find((item: IGridData) => item.id == id)
    if (!row)
        return

    row.checked = !row.checked
}

const gridController = {
    getData: async (req: ITypedRequestQuery<IRequestParams>, res: Response): Promise<void> => {
        const params: IRequestParams = req.query

        const filteredData: IGridData[] = params.search ? data.filter((item: IGridData) => item.value.includes(params.search.toLowerCase())) : data
        const paginatedData: IGridData[] = filteredData.slice(parseInt(params.start), parseInt(params.end))

        res.status(200).json(paginatedData)
    },

    orderData: async (req: ICustomRequest<IOrderBody>, res: Response): Promise<void> => {
        swapElements(req.body.id, req.body.index)

        res.status(200).send()
    },

    checkedData: async (req: ICustomRequest<ICheckedBody>, res: Response): Promise<void> => {
        checkRow(req.body.id)

        res.status(200).send()
    },

    errorHandler: async (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.status(500).send()
    }
}

export default gridController
