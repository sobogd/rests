import express, { Application, Response, Request } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

RegisterRoutes(app);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  return res.status(err.status || 500).json({ ...err, message: err.message, code: err.status });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
