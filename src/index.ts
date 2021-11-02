import '@effect-ts/core/Tracing/Enable'
import { Effect as T, pipe } from '@effect-ts/core'

const program = T.gen(function* ($) {
  yield* $(T.succeedWith(() => console.log('hello world')))
})

const main = () => {
  pipe(program, T.runPromise)  
}

main()