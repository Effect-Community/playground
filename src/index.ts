import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import { pipe } from "@effect-ts/core/Function"
import { runMain } from "@effect-ts/node/Runtime"
import { service, tag } from "@effect-ts/core/Has"
import { _A } from "@effect-ts/core/Utils"

// 
// Service Constructor
//

export const LoggerId = Symbol()

export const makeLogger = T.succeedWith(() => {
  return service(LoggerId, {
    log: (s: string) => T.succeedWith(() => {
      console.log(s)
    })
  })
})

// 
// Service Constructor
//

export interface Logger extends _A<typeof makeLogger> { }
export const Logger = tag<Logger>(LoggerId)

// 
// Layer to compose constructors (like LiveLogger["+++"](LiveDatabase)[">+>"](LiveUserRepo))
//

export const LiveLogger = L.fromEffect(Logger)(makeLogger)

//
// Access functions (here there is an annotation)
//
export const { log } = T.deriveLifted(Logger)(["log"], [], [])

//
// Any type of program, freely uses log without any explicit annotation, the type will be T.Effect<Has<Logger>, never, void>
//

export const program = pipe(
  T.do,
  T.bind("a", () => T.succeedWith(() => 1)),
  T.bind("b", () => T.succeedWith(() => 2)),
  T.bind("c", ({ a, b }) => T.succeedWith(() => a + b)),
  T.chain((result) => log(`result: ${result}`))
)

pipe(
  program,
  // provides all the dependencies
  T.provideSomeLayer(LiveLogger),
  // runs the program
  runMain
)