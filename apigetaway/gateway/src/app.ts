import Express from 'express'
import expressJwt from 'express-jwt'
import cors from 'cors'
import compression from 'compression'

const app = Express()


app.use('*', cors());
app.use(compression());
app.use(
  expressJwt({
    secret: "f1BtnWgD3VKY",
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);

export  { app }