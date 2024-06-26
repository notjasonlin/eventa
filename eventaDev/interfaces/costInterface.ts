export interface Cost {
    id: number,
    budgetID: number,
    vendorType: string,
    costInDollar: number,
    priority: number,
    flexibility: boolean,
    flexTop: number,
    predictedCost: number,
    absoluteMinimum: number,
    percentEstimate: number,
}