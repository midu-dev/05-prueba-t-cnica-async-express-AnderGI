import { z } from "zod";
const itemSchema = z.object({
  id: z.number().nonnegative(),
  content: z.string().trim(),
});

// Parse lanza un error sino usar safeParse que devuelve un objeto con
// la información del error
export const fullValidation = (obj) => itemSchema.parse(obj);
export const partialValidation = (obj) => itemSchema.partial.parse(obj);
