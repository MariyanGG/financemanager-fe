import { Budget } from "./budget.model";

export interface BudgetsGroupedByYear {
    [year: string]: Budget[];
}