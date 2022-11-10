import { right } from '@sweet-monads/either'
import { InferType, number, object, string } from 'yup'
import { ControllerType, Input } from '../../common/controller.types'
import { ValidateControllerInput } from '../../common/validate.decorator'
import { AddPlanDto } from './dto/add.dto'
import { PlanEntity } from './plan.entity'
import { PlanService } from './plan.service'


export class PlanController implements ControllerType<PlanController> {

    constructor(private readonly planService: PlanService) { }

    @ValidateControllerInput(AddPlanDto)
    async addEntity(input: Input<InferType<typeof AddPlanDto>>) {

        const entity: PlanEntity = {
            id: input.data.id,
            budget_id: input.data.budget_id,
            type: input.data.type,
            name: input.data.name,
            amount: input.data.amount,
            date: input.data.date,
            repeat: input.data.repeat,
        }

        return this.planService.addEntity(entity)
    }
    
    async updateEntity(input: Input<InferType<typeof AddPlanDto>>) {

        const entity: PlanEntity = {
            id: input.data.id,
            budget_id: input.data.budget_id,
            type: input.data.type,
            name: input.data.name,
            amount: input.data.amount,
            date: input.data.date,
            repeat: input.data.repeat,
        }

        return this.planService.updateEntity(entity)
    }

    async getEntity(input: Input<{ id: number }>) {
        return this.planService.getEntity(input.data.id)
    }

    async getEntities(input: Input<void>) {
        return this.planService.getEntities()
    }

    async deleteEntity(input: Input<{ id: number }>) {
        return this.planService.deleteEntity(input.data.id)
    }
}

