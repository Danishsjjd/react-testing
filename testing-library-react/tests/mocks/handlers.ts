import { db } from "./db"

export const handlers = [...db.products.toHandlers("rest")]
