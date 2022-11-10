import { right } from '@sweet-monads/either'
import { InferType, number, object, string } from 'yup'
import { ControllerType, Input } from '../../common/controller.types'
import { ValidateControllerInput } from '../../common/validate.decorator'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create.dto'

export class BudgetController implements ControllerType<BudgetController> {
    constructor(private readonly budgetService: BudgetService) {}
    @ValidateControllerInput(CreateBudgetDto)
    async createBudget(input: Input<InferType<typeof CreateBudgetDto>>) {
        return this.budgetService.createBudget(
            input.context.email,
            input.data.name
        )
    }

    async getBudgets(input: Input<void>) {
        return this.budgetService.getBudgets(input.context.email)
    }

    @ValidateControllerInput(
        object({ budget_id: number().defined().integer() })
    )
    async deleteBudget(input: Input<{ budget_id: number }>) {
        return this.budgetService.deleteBudget(
            input.context.email,
            input.data.budget_id
        )
    }

    @ValidateControllerInput(
        object({
            name: string().min(1),
            budget_id: number().defined().integer(),
        })
    )
    async updateBudgetName({
        data,
        context,
    }: Input<{ name: string; budget_id: number }>) {
        const { budget_id, name } = data
        const { email } = context
        return this.budgetService.updateBudgetName(email, budget_id, name)
    }
    
    @ValidateControllerInput(
        object({
            name: string().min(1),
            budget_id: number().defined().integer(),
        })
        )
        async getBudgetInfo({
            data,
            context,
        }: Input<{ budget_id: number }>) {
            const { budget_id } = data
            const { email } = context
            return this.budgetService.getBudgetInfo(email, budget_id)
        }
}

