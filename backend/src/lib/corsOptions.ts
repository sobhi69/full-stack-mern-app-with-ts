// (err: Error | null, origin?: StaticOrigin) => void
type Origin = string | undefined
type Cb = (err: Error | null, origin?: boolean) => void

// const allowedOrigins = ['http://localhost:3011', "http://localhost:5174",]

export const corsOptions = {
    origin: (origin: Origin, cb: Cb) => {
        console.log(origin)
        cb(null, true)
        // if (!origin || allowedOrigins.indexOf(origin) != -1) {
        // } else {
        //     cb(new Error('Error, not allowed from Cors'))
        // }
    },
    optionsSuccessStatus: 200,
    credentials: true,
}
