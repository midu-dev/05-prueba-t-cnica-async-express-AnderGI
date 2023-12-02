/* eslint-disable quotes */
import express from "express";
import { itemsRouter } from "./Routes/itemsRoutes.js";
export const app = express();
app.use(express.json());
app.use(itemsRouter);
// EJERCICO 6 aquí
const PORT = process.env.PORT || 3000;
export const server = app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
