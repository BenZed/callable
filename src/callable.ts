import { define } from '@benzed/util'
import { Func } from '@benzed/types'

import { AbstractCallable, CallableStaticProperties } from './abstract-callable'
import { CallableInstance } from './instance'

//// Main ////

type CallableSignature = new <F extends Func>(func: F) => CallableInstance<F>

/**
 * Create a callable class by providing a signature method as
 * a parameter.
 */
interface CallableConstructor
    extends CallableSignature,
        CallableStaticProperties {}

const Callable = class extends AbstractCallable<Func> {
    //
    [AbstractCallable.signature]!: Func

    constructor(signature: Func) {
        super()
        define.hidden(this, AbstractCallable.signature, signature)
    }
} as CallableConstructor

//// Exports ////

export { Callable }
