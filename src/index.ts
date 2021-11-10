import '@effect-ts/core/Tracing/Enable'
import { Effect as T, pipe } from '@effect-ts/core'
import { runMain } from '@effect-ts/node/Runtime'

const program = T.gen(function* ($) {
  yield* $(T.succeedWith(() => console.log('hello world')))

  const result = yield* $(pipe(
    T.succeed(1),
    T.map(_ => _ * 2),
    T.map(_ => _ * 3) ,
  ))

  yield* $(T.succeedWith(() => console.log({ result })))
})

runMain(program)
