import { Func, isFunc, isObject } from '@benzed/types'

import { each } from '@benzed/each'

import { define } from '@benzed/util'
import { $$context, $$signature } from './symbols'
import { AbstractCallableInstance, CallableProperties } from './instance'

//// EsLint ////
/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

//// Main ////

interface CallableStaticProperties {
    /**
     * Symbolic key to implement a getter in extended classes
     * that returns a function to be used as the call signature.
     */
    readonly signature: typeof $$signature

    /**
     * The outer 'this' of the calling signature
     */
    readonly context: typeof $$context

    /**
     * Convert the given object to a callable instance with
     * it's {@link $$signature} property.
     */
    apply<T extends CallableProperties>(object: T): T
}

type AbstractCallableSignature = abstract new <
    F extends Func
>() => AbstractCallableInstance<F>

/**
 * Create a callable class by extending this abstraction and
 * providing a method to the symbolic {@link $$signature} property.
 *
 * Use the {@link CallableStaticProperties.apply} method in the
 * extended constructor.
 */
interface AbstractCallableConstructor
    extends AbstractCallableSignature,
        CallableStaticProperties {}

//// Callable ////

const AbstractCallable = class {
    static readonly signature: typeof $$signature = $$signature
    static readonly context: typeof $$context = $$context

    static [Symbol.hasInstance](instance: unknown) {
        if (!isObject(instance) || !isFunc(instance?.constructor)) return false

        if (Object.is(instance.constructor, this)) return true

        if (each.prototypeOf(instance.constructor).toArray().includes(this))
            return true

        return false
    }

    static apply(instance: object) {
        // Create callable instance
        function callable(this: unknown, ...args: unknown[]): unknown {
            // Update outer 'this' context
            define.hidden(callable, $$context, this)

            const signature = (callable as any)[$$signature]
            return signature.apply(callable, args)
        }

        // Add instance properties
        define.transpose(instance, callable, [Function.prototype])

        return callable
    }

    constructor() {
        const instance = this as any
        return AbstractCallable.apply(instance)
    }
} as AbstractCallableConstructor

//// Export ////

export {
    AbstractCallable,
    AbstractCallableConstructor,
    CallableStaticProperties
}
