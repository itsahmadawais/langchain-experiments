import express from "express";
import cors from "cors";
import appRoutes from "./routes/app.routes";

const app = express();

// CORS first, so all requests get the headers
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Health check / root route
app.get("/", (_req, res) => {
  res.send("Langchain Experiments API");
});

// API routes
app.use("/api", appRoutes);

export default app;
