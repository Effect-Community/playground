import '@effect-ts/core/Tracing/Enable'
import { Effect as T, pipe } from '@effect-ts/core'
import { runMain } from '@effect-ts/node/Runtime'

const program = T.gen(function* ($) {
  yield* $(T.succeedWith(() => console.log('hello world')))
})

runMain(program)
