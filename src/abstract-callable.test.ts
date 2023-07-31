import { it, expect } from '@jest/globals'

import { AbstractCallable } from './abstract-callable'

//// EsLint ////
/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

//// Exports ////

it('is abstract', () => {
    // @ts-expect-error Abstract
    void new AbstractCallable()
})

it('must implement abstract properties', () => {
    // @ts-expect-error need abstract properties properties
    class UseFoo extends AbstractCallable<() => string> {}

    void UseFoo
})

it('extends', () => {
    class Doubler extends AbstractCallable<(i: number) => number> {
        get [AbstractCallable.signature]() {
            return this.double
        }

        double(i: number) {
            return i * 2
        }
    }

    const x2 = new Doubler()

    expect(x2(2)).toBe(4)
})
