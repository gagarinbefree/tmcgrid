export interface  IGridData {
    id: string
    value: string
    checked: boolean
}

const generateData = (start: number, end: number): IGridData[] => {
    const data: IGridData[] = [];
    for (let i: number = start; i <= end; i++) {
        data.push({ id: i.toString(), value: `item ${i}`, checked: false });
    }
    return data;
}

export { generateData }