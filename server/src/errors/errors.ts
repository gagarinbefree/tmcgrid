import {NextFunction, Request, Response} from "express";

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(500).send()
}

export  {errorHandler}
