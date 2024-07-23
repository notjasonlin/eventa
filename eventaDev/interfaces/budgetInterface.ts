export interface Budget {
    eventId: string,
    id: string,
    totalCost: number,
    flexible: boolean,
    maxFlex: number,
    remainder: number,
}