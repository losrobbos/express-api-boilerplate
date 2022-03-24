import express from 'express';
import { auth } from './auth/auth.middleware';
import authRouter from './auth/auth.router';
const app = express();

app.use( express.json() ) // parse incoming HTTP body into req.body object

// REGISTER ROUTES
app.use("/auth", authRouter)

app.get('/', (req, res) => {
  res.send('Hello from API!');
});

app.get("/protected", auth, (req, res) => {
  res.json({
    success: true,
    message: "You have all the rights to party"
  })
})


export default app
