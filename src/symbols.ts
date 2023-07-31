//// Symbols ////

/**
 * Property that holds the function representing the signature
 * for the callable class.
 */
export const $$signature = Symbol('callable-signature')

/**
 * Property holding the outer 'this' context that may be
 * bound to the signature method
 */
export const $$context = Symbol('callable-outer-this-context')
