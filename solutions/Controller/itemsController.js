import { Items } from "../Models/items.js";
import { fullValidation, partialValidation } from "../Schemas/itemsSchemas.js";
let currentId = 1;

export class ItemsController {
  static async getAllItems(req, res) {
    Items.getAllItems(req, res).then((data) => res.status(200).json(data));
  }

  static async getItem(req, res) {
    const { id } = req.params;
    Items.getItem(id).then((data) => res.status(200).json(data));
  }

  static async addItem(req, res) {
    const sendedItem = req.body;
    let validatedItem = null;
    const idObj = {
      id: ++currentId,
    };
    try {
      validatedItem = fullValidation({
        ...sendedItem,
        ...idObj,
      });
    } catch (error) {
      validatedItem = {
        content: sendedItem.content,
        ...idObj,
      };
    }

    Items.addItem(validatedItem).then((addedItem) =>
      res.status(200).json(addedItem)
    );
  }
  static async deleteItem(req, res) {
    const { id } = req.params;
    Items.deleteItem(id).then((deletedItem) => res.status(200));
  }
  static async updateItem(req, res) {
    const { id } = req.params;
    const updatableData = req.body;
    let updatedItem = null;

    try {
      updatedItem = partialValidation({
        ...updatableData,
      });
    } catch (error) {
      updatedItem = {
        content: "UPDATED ITEM",
      };
    }

    Items.updateItem(id, updatedItem).then((data) =>
      res.status(200).json(data)
    );
  }
}
