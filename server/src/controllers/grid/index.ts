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
    newId: string
}

export interface ICheckedBody {
    id: string
    value: boolean
}

interface ICustomRequest<T> extends Request {
    body: T
}

interface IOrdered {
    id: string
    newId: string
}

interface IChecked {
    id: string,
    value: boolean
}

interface IGrid {
    data: IGridData[]
    orders: IOrdered[],
    checks: IChecked[],

    order: () => IGrid
    checked: () => IGrid
    filter: (filter: string) => IGrid
    paginate: (start: number, end: number) => IGrid
}

const grid: IGrid = {
    data: generateData(1, 1000000) as IGridData[],
    orders: [] as IOrdered[],
    checks: [] as IChecked[],

    order(): IGrid {
        const data: IGridData[] = [...this.data]

        for (const item of this.orders) {
            const currentIndex: number = data.findIndex((el: IGridData) => el.id == item.id)
            const newIndex: number = data.findIndex((el: IGridData) => el.id == item.newId)
            if (currentIndex == -1 || newIndex == -1)
                continue

            const [element] = data.splice(currentIndex, 1);
            data.splice(newIndex - 1, 0, element);
        }

        return {...this, data}
    },

    checked(): IGrid {
        const data: IGridData[] = [...this.data]

        for (const checked of this.checks) {
            const item: IGridData | undefined = data.find((item: IGridData) => item.id === checked.id)
            item!.checked = checked.value
        }
0
        return {...this, data}
    },

    filter(filter: string): IGrid {
        const data: IGridData[] = filter ? this.data.filter((item: IGridData) => item.value.includes(filter.toLowerCase())) : [...this.data]

        return {...this, data}
    },

    paginate(start: number, end: number): IGrid {
        const data: IGridData[] = this.data.slice(start, end)

        return {...this, data}
    }
}

const gridController = {
    getData: (req: ITypedRequestQuery<IRequestParams>, res: Response): void => {
        const params: IRequestParams = req.query

        const data: IGridData[] = grid
            .checked()
            .order()
            .filter(params.search)
            .paginate(parseInt(params.start), parseInt(params.end))
            .data

        res.status(200).json(data)
    },

    orderData: (req: ICustomRequest<IOrderBody>, res: Response): void => {
        grid.orders = [...grid.orders, { ...req.body }]

        res.status(200).send()
    },

    checkedData: (req: ICustomRequest<ICheckedBody>, res: Response): void => {
        const checked: ICheckedBody = req.body;

        grid.checks = [...grid.checks, checked]

        res.status(200).send(grid.checks)
    },

    errorHandler: (err: Error, req: Request, res: Response, next: NextFunction): void => {
        res.status(500).send()
    }
}

export default gridController
