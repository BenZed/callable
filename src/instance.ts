import { Func } from '@benzed/types'
import { $$context, $$signature } from './symbols'

////  ////

export abstract class CallableProperties<F extends Func = Func> {
    abstract readonly name: string

    abstract get [$$signature](): F

    readonly [$$context]: unknown
}

/**
 * Instance with a callable signature
 */
export type AbstractCallableInstance<F extends Func> = F & CallableProperties<F>

export type CallableInstance<F extends Func> = AbstractCallableInstance<F> & {
    get [$$signature](): F
}
