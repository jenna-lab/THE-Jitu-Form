import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import{ userRouter} from "./routes/userRoute";

const app = express();

app.use(cors());
app.use(json());

app.use("/user", userRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error.message,
  });
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});

export default app;
