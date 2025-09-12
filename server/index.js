import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// allowing api calls from different domains
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({message: "Hello World"});
});

app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});