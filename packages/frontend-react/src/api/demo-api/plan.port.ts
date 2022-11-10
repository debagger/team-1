import { Either, ErrorEntity, left, right } from 'core'

import { withLocalStorage } from './with-local-storage.helper'
import { IPlanPort } from 'core/dist/domain/plan/plan.port'
import { PlanEntity } from 'core/dist/domain/plan/plan.entity'

export class PlanPort implements IPlanPort {
 
    private withPlans = withLocalStorage<PlanEntity>('plan')

    async addEntity(entity: PlanEntity): Promise<Either<ErrorEntity, PlanEntity>> {
        return right(
            this.withPlans((items: any) => {
                const newId = Number.isInteger(items.lastId) ? ++items.lastId : 0
                items.lastId = newId

                const newPlan = entity
                newPlan.id = newId
                items[newId] = newPlan
                return newPlan
            })
        )
    }

    async updateEntity(entity: PlanEntity): Promise<Either<ErrorEntity, PlanEntity>> {
        return this.withPlans((items) => {            
            if (items[entity.id]) {
                items[entity.id] = entity
                return right(items[entity.id])
            } else {
                return left(new ErrorEntity('Неправильный id плана'))
            }
        })
    }

    async getEntities(): Promise<Either<ErrorEntity, PlanEntity[]>> {
        return right(this.withPlans((items) => Object.values(items)))
    }

    async getEntity(id: number): Promise<Either<ErrorEntity, PlanEntity>> {
        return right(this.withPlans((items) => items[id]))
    }

    async deleteEntity(id: number): Promise<Either<ErrorEntity, void>> {
        return this.withPlans((items) => {        
            if (items[id]) {
                delete items[id]
                return right(undefined)
            } else {
                return left(new ErrorEntity('План не найден'))
            }
        })
        throw new Error('Method not implemented.')
    }

}
