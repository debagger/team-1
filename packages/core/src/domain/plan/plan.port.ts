import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { PlanEntity } from './plan.entity'

export interface IPlanPort {

    addEntity(entity: PlanEntity): Promise<Either<ErrorEntity, PlanEntity>>
    
    updateEntity(entity: PlanEntity): Promise<Either<ErrorEntity, PlanEntity>>

    deleteEntity(id: number): Promise<Either<ErrorEntity, void>>

    getEntity(id: number): Promise<Either<ErrorEntity, PlanEntity>>

    getEntities(): Promise<Either<ErrorEntity, PlanEntity[]>>
    
}
