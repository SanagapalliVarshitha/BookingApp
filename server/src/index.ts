import express = require('express');
import cors = require('cors');
import dotenv from "dotenv";
import mongoose = require('mongoose');
import movieRoutes from './routes/movie.routes';
import showRoutes from './routes/show.routes';
import bookingroute from './routes/booking.routes';
import seatLockRoutes from './routes/seatLock.routes';
import authRoutes from './routes/auth.routes';
import watchlistRoutes from './routes/watchlist.routes';
dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MONGO_URI || "")
.then(() => {console.log("Connected to MongoDB")})
.catch((err) => {console.error("Error connecting to MongoDB:", err)});
app.get('/', (req, res) => { res.send('Hello, World!'); });
app.use("/movies",movieRoutes);
app.use("/shows",showRoutes);
app.use("/bookings",bookingroute);
app.use("/seat-locks",seatLockRoutes);
app.use("/auth",authRoutes);
app.use("/watchlist",watchlistRoutes);
app.listen(3000, () => { console.log('Server is running on port 3000'); });
