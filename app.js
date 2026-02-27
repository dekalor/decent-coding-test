import express from "express";
import routes from "./routes/index.js";
import notFound from "./middleware/notfound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

// Register Routes
app.use(routes);

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;