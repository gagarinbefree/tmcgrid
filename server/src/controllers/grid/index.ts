import {Response, Request, json} from 'express'

const getData = async (req: Request, res: Response): Promise<void> => {
    res.json({ data: [] })
}

export { getData }
