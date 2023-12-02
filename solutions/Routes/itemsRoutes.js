import { Router } from "express";
import { ItemsController } from "../Controller/itemsController.js";
export const itemsRouter = Router();
itemsRouter.get("/items", ItemsController.getAllItems);
itemsRouter.get("/items/:id", ItemsController.getItem);
itemsRouter.post("/items", ItemsController.addItem);
itemsRouter.delete("/items/:id", ItemsController.deleteItem);
itemsRouter.patch("/items/:id", ItemsController.updateItem);
