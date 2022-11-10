import { chain, left, merge, mergeInMany, right } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { NotFoundErrorEntity } from '../../errors/entities/not-found-error.entity'
import { PlanEntity } from './plan.entity'
import { IPlanPort } from './plan.port'

export class PlanService {
    constructor(private readonly planPort: IPlanPort) { }

    async addEntity(entity: PlanEntity) {
        return await this.planPort.addEntity(entity).then(
            chain(async (e) => right(e)))
    }

    async updateEntity(entity: PlanEntity) {
        return await this.planPort.updateEntity(entity).then(
            chain(async (e) => right(e)))
    }

    async getEntity(id: number) {
        return this.planPort.getEntity(id)
    }

    async getEntities() {
        return this.planPort.getEntities()
    }

    async deleteEntity(id: number) {
        return this.planPort.deleteEntity(id)
    }

}
