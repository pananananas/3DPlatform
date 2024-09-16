// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  doublePrecision
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `3d_platform_${name}`);

export const models3d = createTable(
  "model3d",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    fileType: varchar("file_type", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    fileKey: varchar("file_key", { length: 1024 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    translateX: doublePrecision("translate_x").default(0).notNull(),
    translateY: doublePrecision("translate_y").default(0).notNull(),
    translateZ: doublePrecision("translate_z").default(0).notNull(),
    rotateX:    doublePrecision("rotate_x").default(0).notNull(),
    rotateY:    doublePrecision("rotate_y").default(0).notNull(),
    rotateZ:    doublePrecision("rotate_z").default(0).notNull(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
    translateIndex: index("translate_idx").on(
      table.translateX,
      table.translateY,
      table.translateZ,
    ),
    rotateIndex: index("rotate_idx").on(
      table.rotateX,
      table.rotateY,
      table.rotateZ,
    ),
  }),
);

