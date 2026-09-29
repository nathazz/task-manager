import cors from "cors";
import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { env } from "./config/env.js";
import router from "./routes/router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = env.PORT;

app.set("trust proxy", 1);
app.use(helmet());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(clerkMiddleware());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Working...", PORT);
});
