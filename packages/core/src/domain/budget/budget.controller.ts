import { right } from '@sweet-monads/either'
import { InferType } from 'yup'
import { ControllerType, Input } from '../../common/controller.types'
import { ValidateControllerInput } from '../../common/validate.decorator'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create.dto'
import { GetCollaboratorsDto } from './dto/get-collaborators.dto'

export class BudgetController implements ControllerType<BudgetController> {
    constructor(private readonly budgetService: BudgetService) {}
    @ValidateControllerInput(CreateBudgetDto)
    async createBudget(input: Input<InferType<typeof CreateBudgetDto>>) {
        return this.budgetService.createBudget(
            input.context.email,
            input.data.name
        )
    }

    async getOwnedBudgets(input: Input<void>) {
        return this.budgetService.getOwnedBudgets(input.context.email)
    }

    async getCollabBudgets(input: Input<void>) {
        return this.budgetService.getCollabBudgets(input.context.email)
    }

    @ValidateControllerInput(GetCollaboratorsDto)
    async getCollaborators(
        input: Input<InferType<typeof GetCollaboratorsDto>>
    ) {
        return this.budgetService.getCollaborators(
            input.context.email,
            input.data.budget_id
        )
    }
}
