import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: any, res: any) => {
  return res.send("Estou vivo!");
});

app.listen(3002, () => {
  console.log("Servidor rodando!");
});
