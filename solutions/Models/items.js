const items = [
  {
    id: 1,
    content: "Item 1",
  },
];

export class Items {
  static async findItemIndexById(id) {
    return items.findIndex((item) => item.id == id);
  }
  static async getAllItems(req, res) {
    //res.status(200).json(items);
    return items;
  }
  static async getItem(id) {
    const index = await this.findItemIndexById(id);
    if (index !== -1) {
      return items[index];
    }
  }
  static async addItem(item) {
    items.push(item);
    return item;
  }
  static async deleteItem(id) {
    const index = this.findItemIndexById(id);
    // Si existe
    if (index !== -1) {
      const deletedItem = items[index];
      items.splice(index, 1);
      return deletedItem;
    }
  }
  static async updateItem(id, updatableData) {
    const index = this.findItemIndexById(id);
    if (index !== -1) {
      const item = items[index];
      items[index] = {
        ...item,
        ...updatableData,
      };
      return items[index];
    }
  }
}
