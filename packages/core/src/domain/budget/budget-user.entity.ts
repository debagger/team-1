export interface BudgetUserEntity {
    id: number
    user_email: string
    budget_id: number
    role: BudgetUserRoleEnum
}

export enum BudgetUserRoleEnum {
    OWNER = 'OWNER',
    COLLAB = 'COLLAB',
    READONLY = 'READONLY',
}
