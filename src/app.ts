import { vehicleSpecificationRouter } from './vehicleSpecifications/vehicleSpecification.route';

import express, { Application, Response } from "express";
 import { logger } from "./middleware/logger";
import { userRouter } from "./users/user.route";

import { authRouter } from "./auth/auth.route";
import { vehicleRouter } from './vehicles/vehicles.route';
import { locationRouter } from './location/location.route';
import { bookingRouter } from './bookings/bookings.route';
import { paymentRouter } from './payments/payments.route';
// import { rateLimiterMiddleware } from "./middleware/rateLimiter";
// import cors from "cors"


const app:Application = express()




//Basic MIddleware
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 app.use(logger);
// app.use(rateLimiterMiddleware)

//default route
app.get('/',(req,res:Response)=>{
    res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL")
})


//import routes
app.use('/api',userRouter)
app.use('/api',vehicleSpecificationRouter)
app.use('/api',authRouter)
app.use('/api',vehicleRouter)
app.use('/api',locationRouter)
app.use('/api',bookingRouter)
app.use('/api',paymentRouter)
export default app;