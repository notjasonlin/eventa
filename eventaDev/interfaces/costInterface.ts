export interface Cost {
    id: string,
    budgetID: string,
    vendorType: string,
    costInDollar: number,
    priority: number,
    flexibility: boolean,
    flexTop: number,
    predictedCost: number,
    absoluteMinimum: number,
    percentEstimate: number,
    vendorID: string,
}