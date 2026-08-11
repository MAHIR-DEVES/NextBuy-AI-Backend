// src/app.ts
import express4 from "express";

// src/app/config/env.ts
import dotenv from "dotenv";
dotenv.config();
var requiredEnvVars = ["NODE_ENV", "PORT", "DATABASE_URL", "JWT_SECRET"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(
      `Environment variable ${varName} is required but not set in .env file.`
    );
  }
});
var loadEnvVariables = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
  };
};
var envVars = loadEnvVariables();

// src/app/middleware/golbelErrorHandler.ts
import status from "http-status";
var globalErrorHandler = (err, req, res, next) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error From Global Error Handler:", err);
  }
  let statusCode = status.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    error: err.message
  });
};

// src/app/middleware/notFound.ts
import status2 from "http-status";
var notFound = (req, res) => {
  res.status(status2.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

// src/app.ts
import cors from "cors";

// src/app/routes/index.ts
import { Router as Router7 } from "express";

// src/app/modules/user/user.route.ts
import { Router } from "express";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.2",
  "engineVersion": "94a226be1cf2967af2541cca5529f0f7ba866919",
  "activeProvider": "postgresql",
  "inlineSchema": 'model PersonalEntry {\n  id String @id @default(cuid())\n\n  date        DateTime\n  description String\n  amount      Decimal  @db.Decimal(12, 2)\n\n  status PersonalEntryStatus\n  type   PersonalEntryType\n\n  quantity       Int?\n  priceRmb       Decimal? @db.Decimal(12, 2)\n  shippingCharge Decimal? @db.Decimal(12, 2)\n\n  paidReceivedBy String?\n  platform       String?\n\n  clearanceStatus ClearanceStatus @default(PENDING)\n\n  accountType AccountType @default(PERSONAL)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("personal_entries")\n}\n\nmodel Cart {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  quantity Int @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([userId, productId]) // same product duplicate \u09A8\u09BE \u09B9\u09DF\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String\n  slug        String  @unique\n  description String?\n  image       String?\n\n  isActive Boolean @default(true)\n\n  products Product[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  CUSTOMER\n  ADMIN\n  SELLER\n}\n\nenum STATUS {\n  ACTIVE\n  INACTIVE\n  BLOCKED\n}\n\nenum OrderStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  PARTIAL\n}\n\n// account\nenum PersonalEntryStatus {\n  PAID\n  UNPAID\n  RECEIVED\n}\n\nenum PersonalEntryType {\n  COST\n  RECEIVED\n}\n\nenum ClearanceStatus {\n  COMPLETED\n  PENDING\n}\n\nenum AccountType {\n  PERSONAL\n  CENTRAL\n}\n\nmodel Hero {\n  id String @id @default(uuid())\n\n  offer  Json\n  banner Json\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Order {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  total  Float\n  status OrderStatus @default(PENDING)\n\n  name          String\n  phone         String\n  address       String\n  isInsideDhaka Boolean\n  shippingFee   Float   @default(0)\n\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id String @id @default(uuid())\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  name     String // snapshot\n  price    Float // snapshot\n  quantity Int\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Product {\n  id          String  @id @default(uuid())\n  name        String\n  slug        String  @unique\n  description String?\n\n  price    Float\n  discount Float?\n  stock    Int    @default(0)\n\n  thumbnail String\n  images    String[]\n\n  brand      String?\n  categoryId String?\n  category   Category? @relation(fields: [categoryId], references: [id])\n\n  rating      Float @default(0)\n  reviewCount Int   @default(0)\n\n  isFeatured  Boolean @default(false)\n  isPublished Boolean @default(true)\n\n  // Relations\n  orderItems OrderItem[]\n  carts      Cart[]\n  wishlist   Wishlist[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id       String  @id @default(uuid())\n  name     String\n  email    String  @unique\n  password String\n  phone    String? @unique\n  avatar   String?\n\n  role   Role   @default(CUSTOMER)\n  status STATUS @default(ACTIVE)\n\n  address String?\n  city    String?\n  country String?\n\n  lastLogin     DateTime?\n  emailVerified Boolean   @default(false)\n  provider      String? // google, email\n\n  // Relations\n  orders   Order[]\n  carts    Cart[]\n  wishlist Wishlist[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Wishlist {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, productId]) // duplicate wishlist prevent\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"PersonalEntry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"PersonalEntryStatus"},{"name":"type","kind":"enum","type":"PersonalEntryType"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceRmb","kind":"scalar","type":"Decimal"},{"name":"shippingCharge","kind":"scalar","type":"Decimal"},{"name":"paidReceivedBy","kind":"scalar","type":"String"},{"name":"platform","kind":"scalar","type":"String"},{"name":"clearanceStatus","kind":"enum","type":"ClearanceStatus"},{"name":"accountType","kind":"enum","type":"AccountType"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"personal_entries"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"CartToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Hero":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"offer","kind":"scalar","type":"Json"},{"name":"banner","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"total","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"isInsideDhaka","kind":"scalar","type":"Boolean"},{"name":"shippingFee","kind":"scalar","type":"Float"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"discount","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"brand","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"reviewCount","kind":"scalar","type":"Int"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToProduct"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"ProductToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"STATUS"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"lastLogin","kind":"scalar","type":"DateTime"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"provider","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"UserToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToWishlist"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","PersonalEntry.findUnique","PersonalEntry.findUniqueOrThrow","orderBy","cursor","PersonalEntry.findFirst","PersonalEntry.findFirstOrThrow","PersonalEntry.findMany","data","PersonalEntry.createOne","PersonalEntry.createMany","PersonalEntry.createManyAndReturn","PersonalEntry.updateOne","PersonalEntry.updateMany","PersonalEntry.updateManyAndReturn","create","update","PersonalEntry.upsertOne","PersonalEntry.deleteOne","PersonalEntry.deleteMany","having","_count","_avg","_sum","_min","_max","PersonalEntry.groupBy","PersonalEntry.aggregate","user","order","products","category","orderItems","carts","product","wishlist","items","orders","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Hero.findUnique","Hero.findUniqueOrThrow","Hero.findFirst","Hero.findFirstOrThrow","Hero.findMany","Hero.createOne","Hero.createMany","Hero.createManyAndReturn","Hero.updateOne","Hero.updateMany","Hero.updateManyAndReturn","Hero.upsertOne","Hero.deleteOne","Hero.deleteMany","Hero.groupBy","Hero.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Wishlist.findUnique","Wishlist.findUniqueOrThrow","Wishlist.findFirst","Wishlist.findFirstOrThrow","Wishlist.findMany","Wishlist.createOne","Wishlist.createMany","Wishlist.createManyAndReturn","Wishlist.updateOne","Wishlist.updateMany","Wishlist.updateManyAndReturn","Wishlist.upsertOne","Wishlist.deleteOne","Wishlist.deleteMany","Wishlist.groupBy","Wishlist.aggregate","AND","OR","NOT","id","userId","productId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","email","password","phone","avatar","Role","role","STATUS","status","address","city","country","lastLogin","emailVerified","provider","updatedAt","every","some","none","slug","description","price","discount","stock","thumbnail","images","brand","categoryId","rating","reviewCount","isFeatured","isPublished","has","hasEvery","hasSome","orderId","quantity","total","OrderStatus","isInsideDhaka","shippingFee","offer","banner","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","image","isActive","userId_productId","date","amount","PersonalEntryStatus","PersonalEntryType","type","priceRmb","shippingCharge","paidReceivedBy","platform","ClearanceStatus","clearanceStatus","AccountType","accountType","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "xwRXkAESpgEAANYCADCnAQAABAAQqAEAANYCADCpAQEAAAABrAFAAJUCACHAAQAA2ALvASLHAUAAlQIAIcwBAQCPAgAh3AECANoCACHsAUAAlQIAIe0BEADXAgAh8AEAANkC8AEi8QEQANsCACHyARAA2wIAIfMBAQCQAgAh9AEBAJACACH2AQAA3AL2ASL4AQAA3QL4ASIBAAAAAQAgAQAAAAEAIBKmAQAA1gIAMKcBAAAEABCoAQAA1gIAMKkBAQCPAgAhrAFAAJUCACHAAQAA2ALvASLHAUAAlQIAIcwBAQCPAgAh3AECANoCACHsAUAAlQIAIe0BEADXAgAh8AEAANkC8AEi8QEQANsCACHyARAA2wIAIfMBAQCQAgAh9AEBAJACACH2AQAA3AL2ASL4AQAA3QL4ASIF3AEAAOcCACDxAQAA5wIAIPIBAADnAgAg8wEAAOcCACD0AQAA5wIAIAMAAAAEACADAAAFADAEAAABACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIA-pAQEAAAABrAFAAAAAAcABAAAA7wECxwFAAAAAAcwBAQAAAAHcAQIAAAAB7AFAAAAAAe0BEAAAAAHwAQAAAPABAvEBEAAAAAHyARAAAAAB8wEBAAAAAfQBAQAAAAH2AQAAAPYBAvgBAAAA-AECAQgAAAkAIA-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_gEAIeoBIACCAgAhAwAAACQAIAMAAGUAMBQAAGYAIAMAAAAkACADAABUADAEAABRACAIpgEAAKsCADCnAQAAbAAQqAEAAKsCADCpAQEAAAABrAFAAJUCACHHAUAAlQIAIeEBAACsAgAg4gEAAKwCACABAAAAaQAgAQAAAGkAIAimAQAAqwIAMKcBAABsABCoAQAAqwIAMKkBAQCPAgAhrAFAAJUCACHHAUAAlQIAIeEBAACsAgAg4gEAAKwCACAAAwAAAGwAIAMAAG0AMAQAAGkAIAMAAABsACADAABtADAEAABpACADAAAAbAAgAwAAbQAwBAAAaQAgBakBAQAAAAGsAUAAAAABxwFAAAAAAeEBgAAAAAHiAYAAAAABAQgAAHEAIAWpAQEAAAABrAFAAAAAAccBQAAAAAHhAYAAAAAB4gGAAAAAAQEIAABzADABCAAAcwAwBakBAQDhAgAhrAFAAOICACHHAUAA4gIAIeEBgAAAAAHiAYAAAAABAgAAAGkAIAgAAHYAIAWpAQEA4QIAIawBQADiAgAhxwFAAOICACHhAYAAAAAB4gGAAAAAAQIAAABsACAIAAB4ACACAAAAbAAgCAAAeAAgAwAAAGkAIA8AAHEAIBAAAHYAIAEAAABpACABAAAAbAAgAxUAAO0DACAYAADvAwAgGQAA7gMAIAimAQAAqAIAMKcBAAB_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_gEAIdQBCACaAgAh1QECAJwCACHWASAAggIAIdcBIACCAgAhAwAAACYAIAMAAMIBADAUAADDAQAgAwAAACYAIAMAACcAMAQAACgAIBYhAACXAgAgIwAAmAIAICUAAJYCACCmAQAAjgIAMKcBAADJAQAQqAEAAI4CADCpAQEAAAABrAFAAJUCACG4AQEAjwIAIbkBAQAAAAG6AQEAjwIAIbsBAQAAAAG8AQEAkAIAIb4BAACRAr4BIsABAACSAsABIsEBAQCQAgAhwgEBAJACACHDAQEAkAIAIcQBQACTAgAhxQEgAJQCACHGAQEAkAIAIccBQACVAgAhAQAAAMYBACABAAAAxgEAIBYhAACXAgAgIwAAmAIAICUAAJYCACCmAQAAjgIAMKcBAADJAQAQqAEAAI4CADCpAQEAjwIAIawBQACVAgAhuAEBAI8CACG5AQEAjwIAIboBAQCPAgAhuwEBAJACACG8AQEAkAIAIb4BAACRAr4BIsABAACSAsABIsEBAQCQAgAhwgEBAJACACHDAQEAkAIAIcQBQACTAgAhxQEgAJQCACHGAQEAkAIAIccBQACVAgAhCiEAALADACAjAACxAwAgJQAArwMAILsBAADnAgAgvAEAAOcCACDBAQAA5wIAIMIBAADnAgAgwwEAAOcCACDEAQAA5wIAIMYBAADnAgAgAwAAAMkBACADAADKAQAwBAAAxgEAIAMAAADJAQAgAwAAygEAMAQAAMYBACADAAAAyQEAIAMAAMoBADAEAADGAQAgEyEAAK0DACAjAACuAwAgJQAArAMAIKkBAQAAAAGsAUAAAAABuAEBAAAAAbkBAQAAAAG6AQEAAAABuwEBAAAAAbwBAQAAAAG-AQAAAL4BAsABAAAAwAECwQEBAAAAAcIBAQAAAAHDAQEAAAABxAFAAAAAAcUBIAAAAAHGAQEAAAABxwFAAAAAAQEIAADOAQAgEKkBAQAAAAGsAUAAAAABuAEBAAAAAbkBAQAAAAG6AQEAAAABuwEBAAAAAbwBAQAAAAG-AQAAAL4BAsABAAAAwAECwQEBAAAAAcIBAQAAAAHDAQEAAAABxAFAAAAAAcUBIAAAAAHGAQEAAAABxwFAAAAAAQEIAADQAQAwAQgAANABADATIQAA8QIAICMAAPICACAlAADwAgAgqQEBAOECACGsAUAA4gIAIbgBAQDhAgAhuQEBAOECACG6AQEA4QIAIbsBAQDrAgAhvAEBAOsCACG-AQAA7AK-ASLAAQAA7QLAASLBAQEA6wIAIcIBAQDrAgAhwwEBAOsCACHEAUAA7gIAIcUBIADvAgAhxgEBAOsCACHHAUAA4gIAIQIAAADGAQAgCAAA0wEAIBCpAQEA4QIAIawBQADiAgAhuAEBAOECACG5AQEA4QIAIboBAQDhAgAhuwEBAOsCACG8AQEA6wIAIb4BAADsAr4BIsABAADtAsABIsEBAQDrAgAhwgEBAOsCACHDAQEA6wIAIcQBQADuAgAhxQEgAO8CACHGAQEA6wIAIccBQADiAgAhAgAAAMkBACAIAADVAQAgAgAAAMkBACAIAADVAQAgAwAAAMYBACAPAADOAQAgEAAA0wEAIAEAAADGAQAgAQAAAMkBACAKFQAA6AIAIBgAAOoCACAZAADpAgAguwEAAOcCACC8AQAA5wIAIMEBAADnAgAgwgEAAOcCACDDAQAA5wIAIMQBAADnAgAgxgEAAOcCACATpgEAAP0BADCnAQAA3AEAEKgBAAD9AQAwqQEBAPYBACGsAUAA9wEAIbgBAQD2AQAhuQEBAPYBACG6AQEA9gEAIbsBAQD-AQAhvAEBAP4BACG-AQAA_wG-ASLAAQAAgALAASLBAQEA_gEAIcIBAQD-AQAhwwEBAP4BACHEAUAAgQIAIcUBIACCAgAhxgEBAP4BACHHAUAA9wEAIQMAAADJAQAgAwAA2wEAMBQAANwBACADAAAAyQEAIAMAAMoBADAEAADGAQAgAQAAADEAIAEAAAAxACADAAAALwAgAwAAMAAwBAAAMQAgAwAAAC8AIAMAADAAMAQAADEAIAMAAAAvACADAAAwADAEAAAxACAGHAAA5QIAICIAAOYCACCpAQEAAAABqgEBAAAAAasBAQAAAAGsAUAAAAABAQgAAOQBACAEqQEBAAAAAaoBAQAAAAGrAQEAAAABrAFAAAAAAQEIAADmAQAwAQgAAOYBADAGHAAA4wIAICIAAOQCACCpAQEA4QIAIaoBAQDhAgAhqwEBAOECACGsAUAA4gIAIQIAAAAxACAIAADpAQAgBKkBAQDhAgAhqgEBAOECACGrAQEA4QIAIawBQADiAgAhAgAAAC8AIAgAAOsBACACAAAALwAgCAAA6wEAIAMAAAAxACAPAADkAQAgEAAA6QEAIAEAAAAxACABAAAALwAgAxUAAN4CACAYAADgAgAgGQAA3wIAIAemAQAA9QEAMKcBAADyAQAQqAEAAPUBADCpAQEA9gEAIaoBAQD2AQAhqwEBAPYBACGsAUAA9wEAIQMAAAAvACADAADxAQAwFAAA8gEAIAMAAAAvACADAAAwADAEAAAxACAHpgEAAPUBADCnAQAA8gEAEKgBAAD1AQAwqQEBAPYBACGqAQEA9gEAIasBAQD2AQAhrAFAAPcBACEOFQAA-QEAIBgAAPwBACAZAAD8AQAgrQEBAAAAAa4BAQAAAASvAQEAAAAEsAEBAAAAAbEBAQAAAAGyAQEAAAABswEBAAAAAbQBAQD7AQAhtQEBAAAAAbYBAQAAAAG3AQEAAAABCxUAAPkBACAYAAD6AQAgGQAA-gEAIK0BQAAAAAGuAUAAAAAErwFAAAAABLABQAAAAAGxAUAAAAABsgFAAAAAAbMBQAAAAAG0AUAA-AEAIQsVAAD5AQAgGAAA-gEAIBkAAPoBACCtAUAAAAABrgFAAAAABK8BQAAAAASwAUAAAAABsQFAAAAAAbIBQAAAAAGzAUAAAAABtAFAAPgBACEIrQECAAAAAa4BAgAAAASvAQIAAAAEsAECAAAAAbEBAgAAAAGyAQIAAAABswECAAAAAbQBAgD5AQAhCK0BQAAAAAGuAUAAAAAErwFAAAAABLABQAAAAAGxAUAAAAABsgFAAAAAAbMBQAAAAAG0AUAA-gEAIQ4VAAD5AQAgGAAA_AEAIBkAAPwBACCtAQEAAAABrgEBAAAABK8BAQAAAASwAQEAAAABsQEBAAAAAbIBAQAAAAGzAQEAAAABtAEBAPsBACG1AQEAAAABtgEBAAAAAbcBAQAAAAELrQEBAAAAAa4BAQAAAASvAQEAAAAEsAEBAAAAAbEBAQAAAAGyAQEAAAABswEBAAAAAbQBAQD8AQAhtQEBAAAAAbYBAQAAAAG3AQEAAAABE6YBAAD9AQAwpwEAANwBABCoAQAA_QEAMKkBAQD2AQAhrAFAAPcBACG4AQEA9gEAIbkBAQD2AQAhugEBAPYBACG7AQEA_gEAIbwBAQD-AQAhvgEAAP8BvgEiwAEAAIACwAEiwQEBAP4BACHCAQEA_gEAIcMBAQD-AQAhxAFAAIECACHFASAAggIAIcYBAQD-AQAhxwFAAPcBACEOFQAAhgIAIBgAAI0CACAZAACNAgAgrQEBAAAAAa4BAQAAAAWvAQEAAAAFsAEBAAAAAbEBAQAAAAGyAQEAAAABswEBAAAAAbQBAQCMAgAhtQEBAAAAAbYBAQAAAAG3AQEAAAABBxUAAPkBACAYAACLAgAgGQAAiwIAIK0BAAAAvgECrgEAAAC-AQivAQAAAL4BCLQBAACKAr4BIgcVAAD5AQAgGAAAiQIAIBkAAIkCACCtAQAAAMABAq4BAAAAwAEIrwEAAADAAQi0AQAAiALAASILFQAAhgIAIBgAAIcCACAZAACHAgAgrQFAAAAAAa4BQAAAAAWvAUAAAAAFsAFAAAAAAbEBQAAAAAGyAUAAAAABswFAAAAAAbQBQACFAgAhBRUAAPkBACAYAACEAgAgGQAAhAIAIK0BIAAAAAG0ASAAgwIAIQUVAAD5AQAgGAAAhAIAIBkAAIQCACCtASAAAAABtAEgAIMCACECrQEgAAAAAbQBIACEAgAhCxUAAIYCACAYAACHAgAgGQAAhwIAIK0BQAAAAAGuAUAAAAAFrwFAAAAABbABQAAAAAGxAUAAAAABsgFAAAAAAbMBQAAAAAG0AUAAhQIAIQitAQIAAAABrgECAAAABa8BAgAAAAWwAQIAAAABsQECAAAAAbIBAgAAAAGzAQIAAAABtAECAIYCACEIrQFAAAAAAa4BQAAAAAWvAUAAAAAFsAFAAAAAAbEBQAAAAAGyAUAAAAABswFAAAAAAbQBQACHAgAhBxUAAPkBACAYAACJAgAgGQAAiQIAIK0BAAAAwAECrgEAAADAAQivAQAAAMABCLQBAACIAsABIgStAQAAAMABAq4BAAAAwAEIrwEAAADAAQi0AQAAiQLAASIHFQAA-QEAIBgAAIsCACAZAACLAgAgrQEAAAC-AQKuAQAAAL4BCK8BAAAAvgEItAEAAIoCvgEiBK0BAAAAvgECrgEAAAC-AQivAQAAAL4BCLQBAACLAr4BIg4VAACGAgAgGAAAjQIAIBkAAI0CACCtAQEAAAABrgEBAAAABa8BAQAAAAWwAQEAAAABsQEBAAAAAbIBAQAAAAGzAQEAAAABtAEBAIwCACG1AQEAAAABtgEBAAAAAbcBAQAAAAELrQEBAAAAAa4BAQAAAAWvAQEAAAAFsAEBAAAAAbEBAQAAAAGyAQEAAAABswEBAAAAAbQBAQCNAgAhtQEBAAAAAbYBAQAAAAG3AQEAAAABFiEAAJcCACAjAACYAgAgJQAAlgIAIKYBAACOAgAwpwEAAMkBABCoAQAAjgIAMKkBAQCPAgAhrAFAAJUCACG4AQEAjwIAIbkBAQCPAgAhugEBAI8CACG7AQEAkAIAIbwBAQCQAgAhvgEAAJECvgEiwAEAAJICwAEiwQEBAJACACHCAQEAkAIAIcMBAQCQAgAhxAFAAJMCACHFASAAlAIAIcYBAQCQAgAhxwFAAJUCACELrQEBAAAAAa4BAQAAAASvAQEAAAAEsAEBAAAAAbEBAQAAAAGyAQEAAAABswEBAAAAAbQBAQD8AQAhtQEBAAAAAbYBAQAAAAG3AQEAAAABC60BAQAAAAGuAQEAAAAFrwEBAAAABbABAQAAAAGxAQEAAAABsgEBAAAAAbMBAQAAAAG0AQEAjQIAIbUBAQAAAAG2AQEAAAABtwEBAAAAAQStAQAAAL4BAq4BAAAAvgEIrwEAAAC-AQi0AQAAiwK-ASIErQEAAADAAQKuAQAAAMABCK8BAAAAwAEItAEAAIkCwAEiCK0BQAAAAAGuAUAAAAAFrwFAAAAABbABQAAAAAGxAUAAAAABsgFAAAAAAbMBQAAAAAG0AUAAhwIAIQKtASAAAAABtAEgAIQCACEIrQFAAAAAAa4BQAAAAASvAUAAAAAEsAFAAAAAAbEBQAAAAAGyAUAAAAABswFAAAAAAbQBQAD6AQAhA8gBAAAcACDJAQAAHAAgygEAABwAIAPIAQAALAAgyQEAACwAIMoBAAAsACADyAEAAC8AIMkBAAAvACDKAQAALwAgFKYBAACZAgAwpwEAAMMBABCoAQAAmQIAMKkBAQD2AQAhrAFAAPcBACG4AQEA9gEAIccBQAD3AQAhywEBAPYBACHMAQEA_gEAIc0BCACaAgAhzgEIAJsCACHPAQIAnAIAIdABAQD2AQAh0QEAAJ0CACDSAQEA_gEAIdMBAQD-AQAh1AEIAJoCACHVAQIAnAIAIdYBIACCAgAh1wEgAIICACENFQAA-QEAIBYAAJ8CACAXAACfAgAgGAAAnwIAIBkAAJ8CACCtAQgAAAABrgEIAAAABK8BCAAAAASwAQgAAAABsQEIAAAAAbIBCAAAAAGzAQgAAAABtAEIAKICACENFQAAhgIAIBYAAKECACAXAAChAgAgGAAAoQIAIBkAAKECACCtAQgAAAABrgEIAAAABa8BCAAAAAWwAQgAAAABsQEIAAAAAbIBCAAAAAGzAQgAAAABtAEIAKACACENFQAA-QEAIBYAAJ8CACAXAAD5AQAgGAAA-QEAIBkAAPkBACCtAQIAAAABrgECAAAABK8BAgAAAASwAQIAAAABsQECAAAAAbIBAgAAAAGzAQIAAAABtAECAJ4CACEErQEBAAAABdgBAQAAAAHZAQEAAAAE2gEBAAAABA0VAAD5AQAgFgAAnwIAIBcAAPkBACAYAAD5AQAgGQAA-QEAIK0BAgAAAAGuAQIAAAAErwECAAAABLABAgAAAAGxAQIAAAABsgECAAAAAbMBAgAAAAG0AQIAngIAIQitAQgAAAABrgEIAAAABK8BCAAAAASwAQgAAAABsQEIAAAAAbIBCAAAAAGzAQgAAAABtAEIAJ8CACENFQAAhgIAIBYAAKECACAXAAChAgAgGAAAoQIAIBkAAKECACCtAQgAAAABrgEIAAAABa8BCAAAAAWwAQgAAAABsQEIAAAAAbIBCAAAAAGzAQgAAAABtAEIAKACACEIrQEIAAAAAa4BCAAAAAWvAQgAAAAFsAEIAAAAAbEBCAAAAAGyAQgAAAABswEIAAAAAbQBCAChAgAhDRUAAPkBACAWAACfAgAgFwAAnwIAIBgAAJ8CACAZAACfAgAgrQEIAAAAAa4BCAAAAASvAQgAAAAEsAEIAAAAAbEBCAAAAAGyAQgAAAABswEIAAAAAbQBCACiAgAhC6YBAACjAgAwpwEAAKsBABCoAQAAowIAMKkBAQD2AQAhqwEBAPYBACGsAUAA9wEAIbgBAQD2AQAhxwFAAPcBACHNAQgAmgIAIdsBAQD2AQAh3AECAJwCACEOpgEAAKQCADCnAQAAlQEAEKgBAACkAgAwqQEBAPYBACGqAQEA9gEAIawBQAD3AQAhuAEBAPYBACG7AQEA9gEAIcABAAClAt8BIsEBAQD2AQAhxwFAAPcBACHdAQgAmgIAId8BIACCAgAh4AEIAJoCACEHFQAA-QEAIBgAAKcCACAZAACnAgAgrQEAAADfAQKuAQAAAN8BCK8BAAAA3wEItAEAAKYC3wEiBxUAAPkBACAYAACnAgAgGQAApwIAIK0BAAAA3wECrgEAAADfAQivAQAAAN8BCLQBAACmAt8BIgStAQAAAN8BAq4BAAAA3wEIrwEAAADfAQi0AQAApwLfASIIpgEAAKgCADCnAQAAfwAQqAEAAKgCADCpAQEA9gEAIawBQAD3AQAhxwFAAPcBACHhAQAAqQIAIOIBAACpAgAgDxUAAPkBACAYAACqAgAgGQAAqgIAIK0BgAAAAAGwAYAAAAABsQGAAAAAAbIBgAAAAAGzAYAAAAABtAGAAAAAAeMBAQAAAAHkAQEAAAAB5QEBAAAAAeYBgAAAAAHnAYAAAAAB6AGAAAAAAQytAYAAAAABsAGAAAAAAbEBgAAAAAGyAYAAAAABswGAAAAAAbQBgAAAAAHjAQEAAAAB5AEBAAAAAeUBAQAAAAHmAYAAAAAB5wGAAAAAAegBgAAAAAEIpgEAAKsCADCnAQAAbAAQqAEAAKsCADCpAQEAjwIAIawBQACVAgAhxwFAAJUCACHhAQAArAIAIOIBAACsAgAgDK0BgAAAAAGwAYAAAAABsQGAAAAAAbIBgAAAAAGzAYAAAAABtAGAAAAAAeMBAQAAAAHkAQEAAAAB5QEBAAAAAeYBgAAAAAHnAYAAAAAB6AGAAAAAAQumAQAArQIAMKcBAABmABCoAQAArQIAMKkBAQD2AQAhrAFAAPcBACG4AQEA9gEAIccBQAD3AQAhywEBAPYBACHMAQEA_gEAIekBAQD-AQAh6gEgAIICACEMHgAArwIAIKYBAACuAgAwpwEAACQAEKgBAACuAgAwqQEBAI8CACGsAUAAlQIAIbgBAQCPAgAhxwFAAJUCACHLAQEAjwIAIcwBAQCQAgAh6QEBAJACACHqASAAlAIAIQPIAQAAJgAgyQEAACYAIMoBAAAmACAJpgEAALACADCnAQAATgAQqAEAALACADCpAQEA9gEAIaoBAQD2AQAhqwEBAPYBACGsAUAA9wEAIccBQAD3AQAh3AECAJwCACECqgEBAAAAAasBAQAAAAEJHAAAswIAICIAALQCACCmAQAAsgIAMKcBAAAvABCoAQAAsgIAMKkBAQCPAgAhqgEBAI8CACGrAQEAjwIAIawBQACVAgAhGCEAAJcCACAjAACYAgAgJQAAlgIAIKYBAACOAgAwpwEAAMkBABCoAQAAjgIAMKkBAQCPAgAhrAFAAJUCACG4AQEAjwIAIbkBAQCPAgAhugEBAI8CACG7AQEAkAIAIbwBAQCQAgAhvgEAAJECvgEiwAEAAJICwAEiwQEBAJACACHCAQEAkAIAIcMBAQCQAgAhxAFAAJMCACHFASAAlAIAIcYBAQCQAgAhxwFAAJUCACH5AQAAyQEAIPoBAADJAQAgGh8AALoCACAgAAC7AgAgIQAAlwIAICMAAJgCACCmAQAAtwIAMKcBAAAmABCoAQAAtwIAMKkBAQCPAgAhrAFAAJUCACG4AQEAjwIAIccBQACVAgAhywEBAI8CACHMAQEAkAIAIc0BCAC4AgAhzgEIALkCACHPAQIAtgIAIdABAQCPAgAh0QEAAJ0CACDSAQEAkAIAIdMBAQCQAgAh1AEIALgCACHVAQIAtgIAIdYBIACUAgAh1wEgAJQCACH5AQAAJgAg-gEAACYAIAscAACzAgAgIgAAtAIAIKYBAAC1AgAwpwEAACwAEKgBAAC1AgAwqQEBAI8CACGqAQEAjwIAIasBAQCPAgAhrAFAAJUCACHHAUAAlQIAIdwBAgC2AgAhCK0BAgAAAAGuAQIAAAAErwECAAAABLABAgAAAAGxAQIAAAABsgECAAAAAbMBAgAAAAG0AQIA-QEAIRgfAAC6AgAgIAAAuwIAICEAAJcCACAjAACYAgAgpgEAALcCADCnAQAAJgAQqAEAALcCADCpAQEAjwIAIawBQACVAgAhuAEBAI8CACHHAUAAlQIAIcsBAQCPAgAhzAEBAJACACHNAQgAuAIAIc4BCAC5AgAhzwECALYCACHQAQEAjwIAIdEBAACdAgAg0gEBAJACACHTAQEAkAIAIdQBCAC4AgAh1QECALYCACHWASAAlAIAIdcBIACUAgAhCK0BCAAAAAGuAQgAAAAErwEIAAAABLABCAAAAAGxAQgAAAABsgEIAAAAAbMBCAAAAAG0AQgAnwIAIQitAQgAAAABrgEIAAAABa8BCAAAAAWwAQgAAAABsQEIAAAAAbIBCAAAAAGzAQgAAAABtAEIAKECACEOHgAArwIAIKYBAACuAgAwpwEAACQAEKgBAACuAgAwqQEBAI8CACGsAUAAlQIAIbgBAQCPAgAhxwFAAJUCACHLAQEAjwIAIcwBAQCQAgAh6QEBAJACACHqASAAlAIAIfkBAAAkACD6AQAAJAAgA8gBAAAgACDJAQAAIAAgygEAACAAIA0dAAC9AgAgIgAAtAIAIKYBAAC8AgAwpwEAACAAEKgBAAC8AgAwqQEBAI8CACGrAQEAjwIAIawBQACVAgAhuAEBAI8CACHHAUAAlQIAIc0BCAC4AgAh2wEBAI8CACHcAQIAtgIAIRIcAACzAgAgJAAAuwIAIKYBAAC-AgAwpwEAABwAEKgBAAC-AgAwqQEBAI8CACGqAQEAjwIAIawBQACVAgAhuAEBAI8CACG7AQEAjwIAIcABAAC_At8BIsEBAQCPAgAhxwFAAJUCACHdAQgAuAIAId8BIACUAgAh4AEIALgCACH5AQAAHAAg-gEAABwAIBAcAACzAgAgJAAAuwIAIKYBAAC-AgAwpwEAABwAEKgBAAC-AgAwqQEBAI8CACGqAQEAjwIAIawBQACVAgAhuAEBAI8CACG7AQEAjwIAIcABAAC_At8BIsEBAQCPAgAhxwFAAJUCACHdAQgAuAIAId8BIACUAgAh4AEIALgCACEErQEAAADfAQKuAQAAAN8BCK8BAAAA3wEItAEAAKcC3wEiAqoBAQAAAAGrAQEAAAABEqYBAADBAgAwpwEAABcAEKgBAADBAgAwqQEBAPYBACGsAUAA9wEAIcABAADDAu8BIscBQAD3AQAhzAEBAPYBACHcAQIAxQIAIewBQAD3AQAh7QEQAMICACHwAQAAxALwASLxARAAxgIAIfIBEADGAgAh8wEBAP4BACH0AQEA_gEAIfYBAADHAvYBIvgBAADIAvgBIg0VAAD5AQAgFgAA1QIAIBcAANUCACAYAADVAgAgGQAA1QIAIK0BEAAAAAGuARAAAAAErwEQAAAABLABEAAAAAGxARAAAAABsgEQAAAAAbMBEAAAAAG0ARAA1AIAIQcVAAD5AQAgGAAA0wIAIBkAANMCACCtAQAAAO8BAq4BAAAA7wEIrwEAAADvAQi0AQAA0gLvASIHFQAA-QEAIBgAANECACAZAADRAgAgrQEAAADwAQKuAQAAAPABCK8BAAAA8AEItAEAANAC8AEiDRUAAIYCACAWAAChAgAgFwAAhgIAIBgAAIYCACAZAACGAgAgrQECAAAAAa4BAgAAAAWvAQIAAAAFsAECAAAAAbEBAgAAAAGyAQIAAAABswECAAAAAbQBAgDPAgAhDRUAAIYCACAWAADOAgAgFwAAzgIAIBgAAM4CACAZAADOAgAgrQEQAAAAAa4BEAAAAAWvARAAAAAFsAEQAAAAAbEBEAAAAAGyARAAAAABswEQAAAAAbQBEADNAgAhBxUAAPkBACAYAADMAgAgGQAAzAIAIK0BAAAA9gECrgEAAAD2AQivAQAAAPYBCLQBAADLAvYBIgcVAAD5AQAgGAAAygIAIBkAAMoCACCtAQAAAPgBAq4BAAAA-AEIrwEAAAD4AQi0AQAAyQL4ASIHFQAA-QEAIBgAAMoCACAZAADKAgAgrQEAAAD4AQKuAQAAAPgBCK8BAAAA-AEItAEAAMkC-AEiBK0BAAAA-AECrgEAAAD4AQivAQAAAPgBCLQBAADKAvgBIgcVAAD5AQAgGAAAzAIAIBkAAMwCACCtAQAAAPYBAq4BAAAA9gEIrwEAAAD2AQi0AQAAywL2ASIErQEAAAD2AQKuAQAAAPYBCK8BAAAA9gEItAEAAMwC9gEiDRUAAIYCACAWAADOAgAgFwAAzgIAIBgAAM4CACAZAADOAgAgrQEQAAAAAa4BEAAAAAWvARAAAAAFsAEQAAAAAbEBEAAAAAGyARAAAAABswEQAAAAAbQBEADNAgAhCK0BEAAAAAGuARAAAAAFrwEQAAAABbABEAAAAAGxARAAAAABsgEQAAAAAbMBEAAAAAG0ARAAzgIAIQ0VAACGAgAgFgAAoQIAIBcAAIYCACAYAACGAgAgGQAAhgIAIK0BAgAAAAGuAQIAAAAFrwECAAAABbABAgAAAAGxAQIAAAABsgECAAAAAbMBAgAAAAG0AQIAzwIAIQcVAAD5AQAgGAAA0QIAIBkAANECACCtAQAAAPABAq4BAAAA8AEIrwEAAADwAQi0AQAA0ALwASIErQEAAADwAQKuAQAAAPABCK8BAAAA8AEItAEAANEC8AEiBxUAAPkBACAYAADTAgAgGQAA0wIAIK0BAAAA7wECrgEAAADvAQivAQAAAO8BCLQBAADSAu8BIgStAQAAAO8BAq4BAAAA7wEIrwEAAADvAQi0AQAA0wLvASINFQAA-QEAIBYAANUCACAXAADVAgAgGAAA1QIAIBkAANUCACCtARAAAAABrgEQAAAABK8BEAAAAASwARAAAAABsQEQAAAAAbIBEAAAAAGzARAAAAABtAEQANQCACEIrQEQAAAAAa4BEAAAAASvARAAAAAEsAEQAAAAAbEBEAAAAAGyARAAAAABswEQAAAAAbQBEADVAgAhEqYBAADWAgAwpwEAAAQAEKgBAADWAgAwqQEBAI8CACGsAUAAlQIAIcABAADYAu8BIscBQACVAgAhzAEBAI8CACHcAQIA2gIAIewBQACVAgAh7QEQANcCACHwAQAA2QLwASLxARAA2wIAIfIBEADbAgAh8wEBAJACACH0AQEAkAIAIfYBAADcAvYBIvgBAADdAvgBIgitARAAAAABrgEQAAAABK8BEAAAAASwARAAAAABsQEQAAAAAbIBEAAAAAGzARAAAAABtAEQANUCACEErQEAAADvAQKuAQAAAO8BCK8BAAAA7wEItAEAANMC7wEiBK0BAAAA8AECrgEAAADwAQivAQAAAPABCLQBAADRAvABIgitAQIAAAABrgECAAAABa8BAgAAAAWwAQIAAAABsQECAAAAAbIBAgAAAAGzAQIAAAABtAECAIYCACEIrQEQAAAAAa4BEAAAAAWvARAAAAAFsAEQAAAAAbEBEAAAAAGyARAAAAABswEQAAAAAbQBEADOAgAhBK0BAAAA9gECrgEAAAD2AQivAQAAAPYBCLQBAADMAvYBIgStAQAAAPgBAq4BAAAA-AEIrwEAAAD4AQi0AQAAygL4ASIAAAAB_gEBAAAAAQH-AUAAAAABBQ8AAMAEACAQAADGBAAg-wEAAMEEACD8AQAAxQQAIIECAADGAQAgBQ8AAL4EACAQAADDBAAg-wEAAL8EACD8AQAAwgQAIIECAAAoACADDwAAwAQAIPsBAADBBAAggQIAAMYBACADDwAAvgQAIPsBAAC_BAAggQIAACgAIAAAAAAB_gEBAAAAAQH-AQAAAL4BAgH-AQAAAMABAgH-AUAAAAABAf4BIAAAAAELDwAAjgMAMBAAAJMDADD7AQAAjwMAMPwBAACQAwAw_QEAAJEDACD-AQAAkgMAMP8BAACSAwAwgAIAAJIDADCBAgAAkgMAMIICAACUAwAwgwIAAJUDADALDwAA_wIAMBAAAIQDADD7AQAAgAMAMPwBAACBAwAw_QEAAIIDACD-AQAAgwMAMP8BAACDAwAwgAIAAIMDADCBAgAAgwMAMIICAACFAwAwgwIAAIYDADALDwAA8wIAMBAAAPgCADD7AQAA9AIAMPwBAAD1AgAw_QEAAPYCACD-AQAA9wIAMP8BAAD3AgAwgAIAAPcCADCBAgAA9wIAMIICAAD5AgAwgwIAAPoCADAEIgAA5gIAIKkBAQAAAAGrAQEAAAABrAFAAAAAAQIAAAAxACAPAAD-AgAgAwAAADEAIA8AAP4CACAQAAD9AgAgAQgAAL0EADAKHAAAswIAICIAALQCACCmAQAAsgIAMKcBAAAvABCoAQAAsgIAMKkBAQAAAAGqAQEAjwIAIasBAQCPAgAhrAFAAJUCACHrAQAAsQIAIAIAAAAxACAIAAD9AgAgAgAAAPsCACAIAAD8AgAgB6YBAAD6AgAwpwEAAPsCABCoAQAA-gIAMKkBAQCPAgAhqgEBAI8CACGrAQEAjwIAIawBQACVAgAhB6YBAAD6AgAwpwEAAPsCABCoAQAA-gIAMKkBAQCPAgAhqgEBAI8CACGrAQEAjwIAIawBQACVAgAhA6kBAQDhAgAhqwEBAOECACGsAUAA4gIAIQQiAADkAgAgqQEBAOECACGrAQEA4QIAIawBQADiAgAhBCIAAOYCACCpAQEAAAABqwEBAAAAAawBQAAAAAEGIgAAjQMAIKkBAQAAAAGrAQEAAAABrAFAAAAAAccBQAAAAAHcAQIAAAABAgAAABoAIA8AAIwDACADAAAAGgAgDwAAjAMAIBAAAIoDACABCAAAvAQAMAwcAACzAgAgIgAAtAIAIKYBAAC1AgAwpwEAACwAEKgBAAC1AgAwqQEBAAAAAaoBAQCPAgAhqwEBAI8CACGsAUAAlQIAIccBQACVAgAh3AECALYCACHrAQAAwAIAIAIAAAAaACAIAACKAwAgAgAAAIcDACAIAACIAwAgCaYBAACGAwAwpwEAAIcDABCoAQAAhgMAMKkBAQCPAgAhqgEBAI8CACGrAQEAjwIAIawBQACVAgAhxwFAAJUCACHcAQIAtgIAIQmmAQAAhgMAMKcBAACHAwAQqAEAAIYDADCpAQEAjwIAIaoBAQCPAgAhqwEBAI8CACGsAUAAlQIAIccBQACVAgAh3AECALYCACEFqQEBAOECACGrAQEA4QIAIawBQADiAgAhxwFAAOICACHcAQIAiQMAIQX-AQIAAAABhAICAAAAAYUCAgAAAAGGAgIAAAABhwICAAAAAQYiAACLAwAgqQEBAOECACGrAQEA4QIAIawBQADiAgAhxwFAAOICACHcAQIAiQMAIQUPAAC3BAAgEAAAugQAIPsBAAC4BAAg_AEAALkEACCBAgAAKAAgBiIAAI0DACCpAQEAAAABqwEBAAAAAawBQAAAAAHHAUAAAAAB3AECAAAAAQMPAAC3BAAg-wEAALgEACCBAgAAKAAgCyQAAKsDACCpAQEAAAABrAFAAAAAAbgBAQAAAAG7AQEAAAABwAEAAADfAQLBAQEAAAABxwFAAAAAAd0BCAAAAAHfASAAAAAB4AEIAAAAAQIAAAAeACAPAACqAwAgAwAAAB4AIA8AAKoDACAQAACaAwAgAQgAALYEADAQHAAAswIAICQAALsCACCmAQAAvgIAMKcBAAAcABCoAQAAvgIAMKkBAQAAAAGqAQEAjwIAIawBQACVAgAhuAEBAI8CACG7AQEAjwIAIcABAAC_At8BIsEBAQCPAgAhxwFAAJUCACHdAQgAuAIAId8BIACUAgAh4AEIALgCACECAAAAHgAgCAAAmgMAIAIAAACWAwAgCAAAlwMAIA6mAQAAlQMAMKcBAACWAwAQqAEAAJUDADCpAQEAjwIAIaoBAQCPAgAhrAFAAJUCACG4AQEAjwIAIbsBAQCPAgAhwAEAAL8C3wEiwQEBAI8CACHHAUAAlQIAId0BCAC4AgAh3wEgAJQCACHgAQgAuAIAIQ6mAQAAlQMAMKcBAACWAwAQqAEAAJUDADCpAQEAjwIAIaoBAQCPAgAhrAFAAJUCACG4AQEAjwIAIbsBAQCPAgAhwAEAAL8C3wEiwQEBAI8CACHHAUAAlQIAId0BCAC4AgAh3wEgAJQCACHgAQgAuAIAIQqpAQEA4QIAIawBQADiAgAhuAEBAOECACG7AQEA4QIAIcABAACZA98BIsEBAQDhAgAhxwFAAOICACHdAQgAmAMAId8BIADvAgAh4AEIAJgDACEF_gEIAAAAAYQCCAAAAAGFAggAAAABhgIIAAAAAYcCCAAAAAEB_gEAAADfAQILJAAAmwMAIKkBAQDhAgAhrAFAAOICACG4AQEA4QIAIbsBAQDhAgAhwAEAAJkD3wEiwQEBAOECACHHAUAA4gIAId0BCACYAwAh3wEgAO8CACHgAQgAmAMAIQsPAACcAwAwEAAAoQMAMPsBAACdAwAw_AEAAJ4DADD9AQAAnwMAIP4BAACgAwAw_wEAAKADADCAAgAAoAMAMIECAACgAwAwggIAAKIDADCDAgAAowMAMAgiAACpAwAgqQEBAAAAAasBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHNAQgAAAAB3AECAAAAAQIAAAAiACAPAACoAwAgAwAAACIAIA8AAKgDACAQAACmAwAgAQgAALUEADANHQAAvQIAICIAALQCACCmAQAAvAIAMKcBAAAgABCoAQAAvAIAMKkBAQAAAAGrAQEAjwIAIawBQACVAgAhuAEBAI8CACHHAUAAlQIAIc0BCAC4AgAh2wEBAI8CACHcAQIAtgIAIQIAAAAiACAIAACmAwAgAgAAAKQDACAIAAClAwAgC6YBAACjAwAwpwEAAKQDABCoAQAAowMAMKkBAQCPAgAhqwEBAI8CACGsAUAAlQIAIbgBAQCPAgAhxwFAAJUCACHNAQgAuAIAIdsBAQCPAgAh3AECALYCACELpgEAAKMDADCnAQAApAMAEKgBAACjAwAwqQEBAI8CACGrAQEAjwIAIawBQACVAgAhuAEBAI8CACHHAUAAlQIAIc0BCAC4AgAh2wEBAI8CACHcAQIAtgIAIQepAQEA4QIAIasBAQDhAgAhrAFAAOICACG4AQEA4QIAIccBQADiAgAhzQEIAJgDACHcAQIAiQMAIQgiAACnAwAgqQEBAOECACGrAQEA4QIAIawBQADiAgAhuAEBAOECACHHAUAA4gIAIc0BCACYAwAh3AECAIkDACEFDwAAsAQAIBAAALMEACD7AQAAsQQAIPwBAACyBAAggQIAACgAIAgiAACpAwAgqQEBAAAAAasBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHNAQgAAAAB3AECAAAAAQMPAACwBAAg-wEAALEEACCBAgAAKAAgCyQAAKsDACCpAQEAAAABrAFAAAAAAbgBAQAAAAG7AQEAAAABwAEAAADfAQLBAQEAAAABxwFAAAAAAd0BCAAAAAHfASAAAAAB4AEIAAAAAQQPAACcAwAw-wEAAJ0DADD9AQAAnwMAIIECAACgAwAwBA8AAI4DADD7AQAAjwMAMP0BAACRAwAggQIAAJIDADAEDwAA_wIAMPsBAACAAwAw_QEAAIIDACCBAgAAgwMAMAQPAADzAgAw-wEAAPQCADD9AQAA9gIAIIECAAD3AgAwAAAAAAAAAAAF_gEIAAAAAYQCCAAAAAGFAggAAAABhgIIAAAAAYcCCAAAAAEC_gEBAAAABIgCAQAAAAUHDwAAngQAIBAAAK4EACD7AQAAnwQAIPwBAACtBAAg_wEAACQAIIACAAAkACCBAgAAUQAgCw8AANEDADAQAADVAwAw-wEAANIDADD8AQAA0wMAMP0BAADUAwAg_gEAAKADADD_AQAAoAMAMIACAACgAwAwgQIAAKADADCCAgAA1gMAMIMCAACjAwAwCw8AAMYDADAQAADKAwAw-wEAAMcDADD8AQAAyAMAMP0BAADJAwAg_gEAAIMDADD_AQAAgwMAMIACAACDAwAwgQIAAIMDADCCAgAAywMAMIMCAACGAwAwCw8AAL0DADAQAADBAwAw-wEAAL4DADD8AQAAvwMAMP0BAADAAwAg_gEAAPcCADD_AQAA9wIAMIACAAD3AgAwgQIAAPcCADCCAgAAwgMAMIMCAAD6AgAwBBwAAOUCACCpAQEAAAABqgEBAAAAAawBQAAAAAECAAAAMQAgDwAAxQMAIAMAAAAxACAPAADFAwAgEAAAxAMAIAEIAACsBAAwAgAAADEAIAgAAMQDACACAAAA-wIAIAgAAMMDACADqQEBAOECACGqAQEA4QIAIawBQADiAgAhBBwAAOMCACCpAQEA4QIAIaoBAQDhAgAhrAFAAOICACEEHAAA5QIAIKkBAQAAAAGqAQEAAAABrAFAAAAAAQYcAADQAwAgqQEBAAAAAaoBAQAAAAGsAUAAAAABxwFAAAAAAdwBAgAAAAECAAAAGgAgDwAAzwMAIAMAAAAaACAPAADPAwAgEAAAzQMAIAEIAACrBAAwAgAAABoAIAgAAM0DACACAAAAhwMAIAgAAMwDACAFqQEBAOECACGqAQEA4QIAIawBQADiAgAhxwFAAOICACHcAQIAiQMAIQYcAADOAwAgqQEBAOECACGqAQEA4QIAIawBQADiAgAhxwFAAOICACHcAQIAiQMAIQUPAACmBAAgEAAAqQQAIPsBAACnBAAg_AEAAKgEACCBAgAAxgEAIAYcAADQAwAgqQEBAAAAAaoBAQAAAAGsAUAAAAABxwFAAAAAAdwBAgAAAAEDDwAApgQAIPsBAACnBAAggQIAAMYBACAIHQAA2wMAIKkBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHNAQgAAAAB2wEBAAAAAdwBAgAAAAECAAAAIgAgDwAA2gMAIAMAAAAiACAPAADaAwAgEAAA2AMAIAEIAAClBAAwAgAAACIAIAgAANgDACACAAAApAMAIAgAANcDACAHqQEBAOECACGsAUAA4gIAIbgBAQDhAgAhxwFAAOICACHNAQgAmAMAIdsBAQDhAgAh3AECAIkDACEIHQAA2QMAIKkBAQDhAgAhrAFAAOICACG4AQEA4QIAIccBQADiAgAhzQEIAJgDACHbAQEA4QIAIdwBAgCJAwAhBQ8AAKAEACAQAACjBAAg-wEAAKEEACD8AQAAogQAIIECAAAeACAIHQAA2wMAIKkBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHNAQgAAAAB2wEBAAAAAdwBAgAAAAEDDwAAoAQAIPsBAAChBAAggQIAAB4AIAH-AQEAAAAEAw8AAJ4EACD7AQAAnwQAIIECAABRACAEDwAA0QMAMPsBAADSAwAw_QEAANQDACCBAgAAoAMAMAQPAADGAwAw-wEAAMcDADD9AQAAyQMAIIECAACDAwAwBA8AAL0DADD7AQAAvgMAMP0BAADAAwAggQIAAPcCADAAAAAAAAAAAAAABQ8AAJkEACAQAACcBAAg-wEAAJoEACD8AQAAmwQAIIECAADGAQAgAw8AAJkEACD7AQAAmgQAIIECAADGAQAgAAAAAAAACw8AAPQDADAQAAD5AwAw-wEAAPUDADD8AQAA9gMAMP0BAAD3AwAg_gEAAPgDADD_AQAA-AMAMIACAAD4AwAwgQIAAPgDADCCAgAA-gMAMIMCAAD7AwAwEyAAAN4DACAhAADfAwAgIwAA4AMAIKkBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHLAQEAAAABzAEBAAAAAc0BCAAAAAHOAQgAAAABzwECAAAAAdABAQAAAAHRAQAA3AMAINIBAQAAAAHUAQgAAAAB1QECAAAAAdYBIAAAAAHXASAAAAABAgAAACgAIA8AAP8DACADAAAAKAAgDwAA_wMAIBAAAP4DACABCAAAmAQAMBgfAAC6AgAgIAAAuwIAICEAAJcCACAjAACYAgAgpgEAALcCADCnAQAAJgAQqAEAALcCADCpAQEAAAABrAFAAJUCACG4AQEAjwIAIccBQACVAgAhywEBAAAAAcwBAQCQAgAhzQEIALgCACHOAQgAuQIAIc8BAgC2AgAh0AEBAI8CACHRAQAAnQIAINIBAQCQAgAh0wEBAJACACHUAQgAuAIAIdUBAgC2AgAh1gEgAJQCACHXASAAlAIAIQIAAAAoACAIAAD-AwAgAgAAAPwDACAIAAD9AwAgFKYBAAD7AwAwpwEAAPwDABCoAQAA-wMAMKkBAQCPAgAhrAFAAJUCACG4AQEAjwIAIccBQACVAgAhywEBAI8CACHMAQEAkAIAIc0BCAC4AgAhzgEIALkCACHPAQIAtgIAIdABAQCPAgAh0QEAAJ0CACDSAQEAkAIAIdMBAQCQAgAh1AEIALgCACHVAQIAtgIAIdYBIACUAgAh1wEgAJQCACEUpgEAAPsDADCnAQAA_AMAEKgBAAD7AwAwqQEBAI8CACGsAUAAlQIAIbgBAQCPAgAhxwFAAJUCACHLAQEAjwIAIcwBAQCQAgAhzQEIALgCACHOAQgAuQIAIc8BAgC2AgAh0AEBAI8CACHRAQAAnQIAINIBAQCQAgAh0wEBAJACACHUAQgAuAIAIdUBAgC2AgAh1gEgAJQCACHXASAAlAIAIRCpAQEA4QIAIawBQADiAgAhuAEBAOECACHHAUAA4gIAIcsBAQDhAgAhzAEBAOsCACHNAQgAmAMAIc4BCAC3AwAhzwECAIkDACHQAQEA4QIAIdEBAAC4AwAg0gEBAOsCACHUAQgAmAMAIdUBAgCJAwAh1gEgAO8CACHXASAA7wIAIRMgAAC6AwAgIQAAuwMAICMAALwDACCpAQEA4QIAIawBQADiAgAhuAEBAOECACHHAUAA4gIAIcsBAQDhAgAhzAEBAOsCACHNAQgAmAMAIc4BCAC3AwAhzwECAIkDACHQAQEA4QIAIdEBAAC4AwAg0gEBAOsCACHUAQgAmAMAIdUBAgCJAwAh1gEgAO8CACHXASAA7wIAIRMgAADeAwAgIQAA3wMAICMAAOADACCpAQEAAAABrAFAAAAAAbgBAQAAAAHHAUAAAAABywEBAAAAAcwBAQAAAAHNAQgAAAABzgEIAAAAAc8BAgAAAAHQAQEAAAAB0QEAANwDACDSAQEAAAAB1AEIAAAAAdUBAgAAAAHWASAAAAAB1wEgAAAAAQQPAAD0AwAw-wEAAPUDADD9AQAA9wMAIIECAAD4AwAwAAAAAAAACiEAALADACAjAACxAwAgJQAArwMAILsBAADnAgAgvAEAAOcCACDBAQAA5wIAIMIBAADnAgAgwwEAAOcCACDEAQAA5wIAIMYBAADnAgAgCB8AAIkEACAgAACKBAAgIQAAsAMAICMAALEDACDMAQAA5wIAIM4BAADnAgAg0gEAAOcCACDTAQAA5wIAIAMeAACBBAAgzAEAAOcCACDpAQAA5wIAIAACHAAAhwQAICQAAIoEACAAAAAAAAX-ARAAAAABhAIQAAAAAYUCEAAAAAGGAhAAAAABhwIQAAAAAQH-AQAAAO8BAgH-AQAAAPABAgX-AQIAAAABhAICAAAAAYUCAgAAAAGGAgIAAAABhwICAAAAAQX-ARAAAAABhAIQAAAAAYUCEAAAAAGGAhAAAAABhwIQAAAAAQH-AQAAAPYBAgH-AQAAAPgBAhCpAQEAAAABrAFAAAAAAbgBAQAAAAHHAUAAAAABywEBAAAAAcwBAQAAAAHNAQgAAAABzgEIAAAAAc8BAgAAAAHQAQEAAAAB0QEAANwDACDSAQEAAAAB1AEIAAAAAdUBAgAAAAHWASAAAAAB1wEgAAAAARIhAACtAwAgIwAArgMAIKkBAQAAAAGsAUAAAAABuAEBAAAAAbkBAQAAAAG6AQEAAAABuwEBAAAAAbwBAQAAAAG-AQAAAL4BAsABAAAAwAECwQEBAAAAAcIBAQAAAAHDAQEAAAABxAFAAAAAAcUBIAAAAAHGAQEAAAABxwFAAAAAAQIAAADGAQAgDwAAmQQAIAMAAADJAQAgDwAAmQQAIBAAAJ0EACAUAAAAyQEAIAgAAJ0EACAhAADxAgAgIwAA8gIAIKkBAQDhAgAhrAFAAOICACG4AQEA4QIAIbkBAQDhAgAhugEBAOECACG7AQEA6wIAIbwBAQDrAgAhvgEAAOwCvgEiwAEAAO0CwAEiwQEBAOsCACHCAQEA6wIAIcMBAQDrAgAhxAFAAO4CACHFASAA7wIAIcYBAQDrAgAhxwFAAOICACESIQAA8QIAICMAAPICACCpAQEA4QIAIawBQADiAgAhuAEBAOECACG5AQEA4QIAIboBAQDhAgAhuwEBAOsCACG8AQEA6wIAIb4BAADsAr4BIsABAADtAsABIsEBAQDrAgAhwgEBAOsCACHDAQEA6wIAIcQBQADuAgAhxQEgAO8CACHGAQEA6wIAIccBQADiAgAhCKkBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHLAQEAAAABzAEBAAAAAekBAQAAAAHqASAAAAABAgAAAFEAIA8AAJ4EACAMHAAA7AMAIKkBAQAAAAGqAQEAAAABrAFAAAAAAbgBAQAAAAG7AQEAAAABwAEAAADfAQLBAQEAAAABxwFAAAAAAd0BCAAAAAHfASAAAAAB4AEIAAAAAQIAAAAeACAPAACgBAAgAwAAABwAIA8AAKAEACAQAACkBAAgDgAAABwAIAgAAKQEACAcAADrAwAgqQEBAOECACGqAQEA4QIAIawBQADiAgAhuAEBAOECACG7AQEA4QIAIcABAACZA98BIsEBAQDhAgAhxwFAAOICACHdAQgAmAMAId8BIADvAgAh4AEIAJgDACEMHAAA6wMAIKkBAQDhAgAhqgEBAOECACGsAUAA4gIAIbgBAQDhAgAhuwEBAOECACHAAQAAmQPfASLBAQEA4QIAIccBQADiAgAh3QEIAJgDACHfASAA7wIAIeABCACYAwAhB6kBAQAAAAGsAUAAAAABuAEBAAAAAccBQAAAAAHNAQgAAAAB2wEBAAAAAdwBAgAAAAESIwAArgMAICUAAKwDACCpAQEAAAABrAFAAAAAAbgBAQAAAAG5AQEAAAABugEBAAAAAbsBAQAAAAG8AQEAAAABvgEAAAC-AQLAAQAAAMABAsEBAQAAAAHCAQEAAAABwwEBAAAAAcQBQAAAAAHFASAAAAABxgEBAAAAAccBQAAAAAECAAAAxgEAIA8AAKYEACADAAAAyQEAIA8AAKYEACAQAACqBAAgFAAAAMkBACAIAACqBAAgIwAA8gIAICUAAPACACCpAQEA4QIAIawBQADiAgAhuAEBAOECACG5AQEA4QIAIboBAQDhAgAhuwEBAOsCACG8AQEA6wIAIb4BAADsAr4BIsABAADtAsABIsEBAQDrAgAhwgEBAOsCACHDAQEA6wIAIcQBQADuAgAhxQEgAO8CACHGAQEA6wIAIccBQADiAgAhEiMAAPICACAlAADwAgAgqQEBAOECACGsAUAA4gIAIbgBAQDhAgAhuQEBAOECACG6AQEA4QIAIbsBAQDrAgAhvAEBAOsCACG-AQAA7AK-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-XhE_YAJAYSFBYhFCYxFDZAJEZyJFaCZGaidHaydIbidJbydKcCdLcidMdAJNdShOdydPeQJQeilReydSfCdTfQJUgAEqVYEBLlaCAQ5XgwEOWIQBDlmFAQ5ahgEOW4gBDlyKAQJdiwEvXo0BDl-PAQJgkAEwYZEBDmKSAQ5jkwECZJYBMWWXATdmmAEPZ5kBD2iaAQ9pmwEPapwBD2ueAQ9soAECbaEBOG6jAQ9vpQECcKYBOXGnAQ9yqAEPc6kBAnSsATp1rQFAdq4BEHevARB4sAEQebEBEHqyARB7tAEQfLYBAn23AUF-ugEQf7wBAoABvQFCgQG_ARCCAcABEIMBwQEChAHEAUOFAcUBSYYBxwENhwHIAQ2IAcsBDYkBzAENigHNAQ2LAc8BDYwB0QECjQHSAUqOAdQBDY8B1gECkAHXAUuRAdgBDZIB2QENkwHaAQKUAd0BTJUB3gFQlgHfAROXAeABE5gB4QETmQHiAROaAeMBE5sB5QETnAHnAQKdAegBUZ4B6gETnwHsAQKgAe0BUqEB7gETogHvAROjAfABAqQB8wFTpQH0AVc"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SELLER: "SELLER"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = envVars.DATABASE_URL;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/modules/user/user.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var registerUser = async (payload) => {
  const { photoUrl, ...rest } = payload;
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
      avatar: photoUrl
      //  photoUrl → avatar mapping
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      //  correct field
      role: true,
      status: true,
      address: true,
      city: true,
      country: true,
      lastLogin: true,
      emailVerified: true,
      provider: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return user;
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone: user.phone,
      photoUrl: user.avatar,
      status: user.status
    },
    envVars.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
  const { password: _, ...userWithoutPassword } = user;
  return {
    accessToken: token,
    user: userWithoutPassword
  };
};
var getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
var getSingleUser = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};
var getCurrentUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      address: true,
      city: true,
      country: true,
      emailVerified: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
      lastLogin: true
    }
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
var updateUser = async (id, payload) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }
  const { photoUrl, ...rest } = payload;
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...rest,
      avatar: photoUrl
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      address: true,
      city: true,
      country: true,
      emailVerified: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
      lastLogin: true
    }
  });
  return user;
};
var updatePassword = async (id, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      address: true,
      city: true,
      country: true,
      emailVerified: true,
      provider: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return updatedUser;
};
var deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: { id }
  });
  return user;
};
var UserService = {
  registerUser,
  deleteUser,
  getAllUsers,
  loginUser,
  getSingleUser,
  updateUser,
  updatePassword,
  getCurrentUser
};

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data
  });
};

// src/app/modules/user/user.controller.ts
var registerUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserService.registerUser(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "user created successfully",
    data: result
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Login successful",
    data: result
  });
});
var getAllUsers2 = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "user fetched successfully",
    data: result
  });
});
var getSingleUser2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "user fetched successfully",
    data: result
  });
});
var getCurrentUser2 = catchAsync(async (req, res) => {
  const id = req.user?.id;
  if (!id) {
    throw new Error("Unauthorized");
  }
  const result = await UserService.getCurrentUser(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "user fetched successfully",
    data: result
  });
});
var updateUser2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "user updated successfully",
    data: result
  });
});
var changePassword = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const result = await UserService.updatePassword(
    id,
    oldPassword,
    newPassword
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Password updated successfully",
    data: result
  });
});
var deleteUser2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "user delete successfully",
    data: result
  });
});
var UserController = {
  registerUser: registerUser2,
  getAllUsers: getAllUsers2,
  deleteUser: deleteUser2,
  loginUser: loginUser2,
  getSingleUser: getSingleUser2,
  updateUser: updateUser2,
  changePassword,
  getCurrentUser: getCurrentUser2
};

// src/app/middleware/auth.ts
import jwt2 from "jsonwebtoken";
var auth = (...requiredRoles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Invalid token format"
        });
      }
      const verifiedUser = jwt2.verify(token, envVars.JWT_SECRET);
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access"
        });
      }
      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// src/app/modules/user/user.route.ts
var router = Router();
router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getAllUsers);
router.get(
  "/me",
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  UserController.getCurrentUser
);
router.get(
  "/:id",
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  UserController.getSingleUser
);
router.put(
  "/:id",
  auth(Role.SELLER, Role.CUSTOMER, Role.ADMIN),
  UserController.updateUser
);
router.put(
  "/:id/password",
  auth(Role.SELLER, Role.CUSTOMER, Role.ADMIN),
  UserController.changePassword
);
router.delete("/:id", auth(Role.ADMIN), UserController.deleteUser);
var UserRoute = router;

// src/app/modules/products/product.route.ts
import { Router as Router2 } from "express";

// src/app/modules/products/product.service.ts
var createProduct = async (payload) => {
  try {
    const result = await prisma.product.create({
      data: payload
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
};
var getAllProducts = async (query) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
      isFeatured
    } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const filters = {};
    if (search) {
      filters.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
    if (category) {
      filters.category = category;
    }
    if (brand) {
      filters.brand = brand;
    }
    if (isFeatured !== void 0) {
      filters.isFeatured = isFeatured === "true";
    }
    if (minPrice || maxPrice) {
      filters.price = {
        gte: minPrice ? Number(minPrice) : void 0,
        lte: maxPrice ? Number(maxPrice) : void 0
      };
    }
    const orderBy = {
      [sortBy]: sortOrder
    };
    const result = await prisma.product.findMany({
      where: filters,
      orderBy,
      skip,
      take: Number(limit)
    });
    const total = await prisma.product.count({
      where: filters
    });
    return {
      data: result,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);
    throw new Error("Failed to fetch products");
  }
};
var getSingleProduct = async (id) => {
  try {
    const result = await prisma.product.findUnique({
      where: { id }
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};
var updateProduct = async (id, payload) => {
  try {
    const result = await prisma.product.update({
      where: { id },
      data: payload
    });
    return result;
  } catch (error) {
    throw new Error("Failed to update product");
  }
};
var deleteProduct = async (id) => {
  try {
    const result = await prisma.product.delete({
      where: { id }
    });
    return result;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};
var ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};

// src/app/modules/products/product.controller.ts
var createProduct2 = async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: result
  });
};
var getAllProducts2 = async (req, res) => {
  const result = await ProductService.getAllProducts(req.query);
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: result
  });
};
var getSingleProduct2 = async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);
  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: result
  });
};
var updateProduct2 = async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.updateProduct(id, req.body);
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: result
  });
};
var deleteProduct2 = async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: result
  });
};
var ProductController = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  getSingleProduct: getSingleProduct2,
  updateProduct: updateProduct2,
  deleteProduct: deleteProduct2
};

// src/app/modules/products/product.route.ts
var router2 = Router2();
router2.post(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  ProductController.createProduct
);
router2.get("/", ProductController.getAllProducts);
router2.get("/:id", ProductController.getSingleProduct);
router2.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  ProductController.updateProduct
);
router2.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  ProductController.deleteProduct
);
var ProductRoutes = router2;

// src/app/modules/orders/order.route.ts
import { Router as Router3 } from "express";

// src/app/modules/orders/order.service.ts
var createBuyNowOrder = async (userId, productId, quantity, name, phone, address, isInsideDhaka) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });
    if (!product) {
      throw new Error("Product not found");
    }
    const total = product.price * quantity;
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        name,
        phone,
        address,
        isInsideDhaka,
        items: {
          create: [
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity
            }
          ]
        }
      }
    });
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create buy now order");
  }
};
var checkoutCart = async (userId, name, phone, address, isInsideDhaka) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }
    });
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }
    const shippingFee = isInsideDhaka ? 60 : 120;
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    const total = subtotal + shippingFee;
    const order = await prisma.order.create({
      data: {
        userId,
        name,
        phone,
        address,
        isInsideDhaka,
        total,
        items: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          }))
        }
      },
      include: {
        items: true
      }
    });
    await prisma.cart.deleteMany({
      where: { userId }
    });
    return order;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
var getUserOrders = async (userId) => {
  try {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (error) {
    throw new Error("Failed to get user orders");
  }
};
var getAllOrders = async ({
  page = 1,
  limit = 10,
  search = "",
  status: status3
} = {}) => {
  try {
    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const skip = (currentPage - 1) * perPage;
    const where = {};
    const searchValue = search.trim();
    if (searchValue) {
      where.OR = [
        // Order name
        {
          name: {
            contains: searchValue,
            mode: "insensitive"
          }
        },
        // Order phone
        {
          phone: {
            contains: searchValue
          }
        },
        // User name
        {
          user: {
            name: {
              contains: searchValue,
              mode: "insensitive"
            }
          }
        },
        // User email
        {
          user: {
            email: {
              contains: searchValue,
              mode: "insensitive"
            }
          }
        },
        // User phone
        {
          user: {
            phone: {
              contains: searchValue
            }
          }
        }
      ];
    }
    if (status3) {
      const validStatuses = [
        "PENDING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "PARTIAL"
      ];
      if (!validStatuses.includes(status3)) {
        throw new Error("Invalid order status");
      }
      where.status = status3;
    }
    const [orders, total, statusCounts] = await prisma.$transaction([
      // --------------------------
      // Orders
      // --------------------------
      prisma.order.findMany({
        where,
        skip,
        take: perPage,
        include: {
          items: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }),
      // --------------------------
      // Total matching orders
      // --------------------------
      prisma.order.count({
        where
      }),
      // --------------------------
      // Status counts
      // --------------------------
      prisma.order.groupBy({
        by: ["status"],
        _count: {
          _all: true
        }
      })
    ]);
    const totalPending = statusCounts.find((item) => item.status === "PENDING")?._count._all ?? 0;
    const totalShipped = statusCounts.find((item) => item.status === "SHIPPED")?._count._all ?? 0;
    const totalDelivered = statusCounts.find((item) => item.status === "DELIVERED")?._count._all ?? 0;
    const totalCancelled = statusCounts.find((item) => item.status === "CANCELLED")?._count._all ?? 0;
    const totalPartial = statusCounts.find((item) => item.status === "PARTIAL")?._count._all ?? 0;
    const totalPages = Math.ceil(total / perPage);
    return {
      orders,
      meta: {
        page: currentPage,
        limit: perPage,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        totalOrders: total,
        totalPending,
        totalShipped,
        totalDelivered,
        totalCancelled,
        totalPartial
      }
    };
  } catch (error) {
    console.error("Get all orders error:", error);
    throw new Error("Failed to get all orders");
  }
};
var VALID_ORDER_STATUSES = [
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "PARTIAL"
];
var updateOrderStatus = async (orderId, status3) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    if (!VALID_ORDER_STATUSES.includes(status3)) {
      throw new Error("Invalid order status");
    }
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId
      }
    });
    if (!existingOrder) {
      throw new Error("Order not found");
    }
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: status3
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true
          }
        }
      }
    });
    return updatedOrder;
  } catch (error) {
    console.error("Update order status error:", error);
    if (error instanceof Error && [
      "Order ID is required",
      "Invalid order status",
      "Order not found"
    ].includes(error.message)) {
      throw error;
    }
    throw new Error("Failed to update order status");
  }
};
var deleteOrder = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId
      }
    });
    if (!existingOrder) {
      throw new Error("Order not found");
    }
    await prisma.order.delete({
      where: {
        id: orderId
      }
    });
    return {
      id: orderId
    };
  } catch (error) {
    console.error("Delete order error:", error);
    if (error instanceof Error && ["Order ID is required", "Order not found"].includes(error.message)) {
      throw error;
    }
    throw new Error("Failed to delete order");
  }
};
var OrderService = {
  createBuyNowOrder,
  checkoutCart,
  getUserOrders,
  getAllOrders
};

// src/app/modules/orders/order.controller.ts
var buyNow = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, name, phone, address, isInsideDhaka } = req.body;
  const result = await OrderService.createBuyNowOrder(
    userId,
    productId,
    quantity || 1,
    name,
    phone,
    address,
    isInsideDhaka
  );
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Order placed successfully (Buy Now)",
    data: result
  });
});
var checkout = catchAsync(async (req, res) => {
  const user = req.user;
  const { name, phone, address, isInsideDhaka } = req.body;
  const result = await OrderService.checkoutCart(
    user.id,
    name,
    phone,
    address,
    isInsideDhaka
  );
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Order placed successfully from cart",
    data: result
  });
});
var getOrders = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await OrderService.getUserOrders(userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result
  });
});
var getAllOrders2 = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = String(req.query.search || "");
  const status3 = req.query.status ? String(req.query.status) : void 0;
  const result = await OrderService.getAllOrders({
    page,
    limit,
    search,
    status: status3
  });
  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: result.orders,
    meta: result.meta,
    summary: result.summary
  });
});
var updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status: status3 } = req.body;
    if (!id) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: "Order ID is required"
      });
    }
    if (!status3) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: "Order status is required"
      });
    }
    const order = await updateOrderStatus(id, status3);
    return sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (error) {
    console.error("Update order status controller error:", error);
    const message = error instanceof Error ? error.message : "Failed to update order status";
    if (message === "Order not found") {
      return sendResponse(res, {
        httpStatusCode: 404,
        success: false,
        message
      });
    }
    if (message === "Invalid order status") {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message
      });
    }
    return sendResponse(res, {
      httpStatusCode: 500,
      success: false,
      message: "Failed to update order status"
    });
  }
};
var deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: "Order ID is required"
      });
    }
    const result = await deleteOrder(id);
    return sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Order deleted successfully",
      data: result
    });
  } catch (error) {
    console.error("Delete order controller error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete order";
    if (message === "Order not found") {
      return sendResponse(res, {
        httpStatusCode: 404,
        success: false,
        message
      });
    }
    return sendResponse(res, {
      httpStatusCode: 500,
      success: false,
      message: "Failed to delete order"
    });
  }
};
var OrderController = {
  buyNow,
  checkout,
  getOrders,
  getAllOrders: getAllOrders2
};

// src/app/modules/orders/order.route.ts
var router3 = Router3();
router3.post(
  "/buy-now",
  auth(Role.CUSTOMER, Role.ADMIN),
  OrderController.buyNow
);
router3.post(
  "/checkout",
  auth(Role.CUSTOMER, Role.ADMIN),
  OrderController.checkout
);
router3.get("/", auth(Role.CUSTOMER, Role.ADMIN), OrderController.getOrders);
router3.get("/all", auth(Role.ADMIN), OrderController.getAllOrders);
var OrderRoutes = router3;
router3.patch("/:id/status", auth(Role.ADMIN), updateOrderStatusController);
router3.delete("/:id", auth(Role.ADMIN), deleteOrderController);

// src/app/modules/cart/cart.route.ts
import { Router as Router4 } from "express";

// src/app/modules/cart/cart.service.ts
var addToCart = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });
  if (!product) {
    throw new Error("Product not found");
  }
  const existingCart = await prisma.cart.findFirst({
    where: { userId, productId }
  });
  if (existingCart) {
    return await prisma.cart.update({
      where: { id: existingCart.id },
      data: {
        quantity: existingCart.quantity + quantity
      }
    });
  }
  return await prisma.cart.create({
    data: {
      userId,
      productId,
      quantity
    }
  });
};
var getMyCart = async (userId) => {
  return await prisma.cart.findMany({
    where: { userId },
    include: {
      product: true
    }
  });
};
var updateCartItem = async (cartId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  return await prisma.cart.update({
    where: { id: cartId },
    data: { quantity }
  });
};
var deleteCartItem = async (cartId) => {
  return await prisma.cart.delete({
    where: { id: cartId }
  });
};
var clearCart = async (userId) => {
  return await prisma.cart.deleteMany({
    where: { userId }
  });
};
var CartService = {
  addToCart,
  getMyCart,
  updateCartItem,
  deleteCartItem,
  clearCart
};

// src/app/modules/cart/cart.controller.ts
var addToCart2 = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;
  const result = await CartService.addToCart(
    userId,
    productId,
    quantity
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Added to cart",
    data: result
  });
});
var getMyCart2 = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await CartService.getMyCart(userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Cart fetched successfully",
    data: result
  });
});
var updateCartItem2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const result = await CartService.updateCartItem(id, quantity);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Cart updated successfully",
    data: result
  });
});
var deleteCartItem2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartService.deleteCartItem(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Cart item deleted",
    data: result
  });
});
var clearCart2 = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await CartService.clearCart(userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Cart cleared",
    data: result
  });
});
var CartController = {
  addToCart: addToCart2,
  getMyCart: getMyCart2,
  updateCartItem: updateCartItem2,
  deleteCartItem: deleteCartItem2,
  clearCart: clearCart2
};

// src/app/modules/cart/cart.route.ts
var router4 = Router4();
router4.post(
  "/",
  auth(Role.CUSTOMER, Role.SELLER, Role.ADMIN),
  CartController.addToCart
);
router4.get("/", auth(Role.CUSTOMER, Role.ADMIN), CartController.getMyCart);
router4.patch(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN, Role.SELLER),
  CartController.updateCartItem
);
router4.delete(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN, Role.SELLER),
  CartController.deleteCartItem
);
router4.delete("/clear/all", auth(Role.CUSTOMER), CartController.clearCart);
var CartRoute = router4;

// src/app/modules/chatbot/chatbot.route.ts
import express from "express";

// src/app/modules/chatbot/chatbot.service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// src/app/modules/chatbot/chatbot.knowledge.ts
var COMPANY_KNOWLEDGE = `
## Company
- Name: Jonoprio AI
- Type: AI-powered e-commerce platform
- Mission: Revolutionizing online shopping with intelligent recommendations and personalized experiences
- Contact: /contact, support@nextbuy.ai
- Help Center: /help
- About Us: /about

## Platform Features

### AI-Powered Shopping Assistant
- Personalized product recommendations based on browsing history and preferences
- Natural language search to find products using conversational queries
- Size and fit recommendations for clothing items
- Price drop alerts and smart deal notifications
- Virtual try-on capabilities for fashion items

### Smart Shopping Tools
- Wishlist with AI-powered price tracking
- Comparative analysis across similar products
- Automatic coupon application at checkout
- Smart bundle suggestions for better deals
- Trending products in your preferred categories

### Enhanced User Experience
- One-click reorder for frequently purchased items
- Voice search and shopping commands
- AR product visualization for home goods
- Real-time inventory updates
- Multi-language support (English, Spanish, French, German)

## Product Categories
- Electronics & Gadgets
- Fashion & Apparel
- Home & Garden
- Sports & Outdoors
- Books & Media
- Health & Beauty
- Toys & Games
- Automotive
- Food & Grocery
- Pet Supplies

## Pricing & Plans

### Free Plan
- Basic shopping features
- Standard recommendations
- Limited wishlist (50 items)
- Community support

### Premium Plan ($9.99/month)
- Advanced AI recommendations
- Unlimited wishlist
- Price drop alerts
- Early access to sales
- Priority customer support
- Exclusive member deals

### Business Plan ($29.99/month)
- All Premium features
- Bulk purchasing tools
- Business analytics dashboard
- Dedicated account manager
- Custom integrations API access

## Payment Methods
- Credit/Debit Cards (Visa, MasterCard, American Express)
- Digital Wallets (PayPal, Apple Pay, Google Pay)
- Buy Now, Pay Later (Affirm, Klarna)
- Cryptocurrency (Bitcoin, Ethereum)
- Bank transfers for large orders

## Shipping & Delivery
- Standard Shipping (5-7 business days): $4.99
- Express Shipping (2-3 business days): $12.99
- Next Day Delivery: $24.99
- Free shipping on orders over $50
- International shipping available (rates vary by location)
- Real-time tracking for all orders

## Return Policy
- 30-day return window for most items
- Free returns for defective products
- Restocking fee may apply for some items
- Easy online return process
- Refund processed within 5-7 business days

## Customer Support
- 24/7 AI chat support
- Email support: support@nextbuy.ai
- Phone support: 1-800-NEXTBUY (Mon-Fri, 9 AM - 6 PM EST)
- Comprehensive help center with tutorials
- Community forum for peer support

## Security & Privacy
- SSL encryption for all transactions
- PCI DSS compliant payment processing
- GDPR compliant data handling
- Two-factor authentication available
- Privacy-first approach to personal data

## Mobile App
- Available on iOS and Android
- Full feature parity with web platform
- Push notifications for deals and updates
- Offline browsing capability
- Biometric login support

## Technology Stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, GraphQL API
- Database: PostgreSQL, Redis for caching
- AI/ML: TensorFlow, OpenAI GPT integration
- Search: Elasticsearch with AI enhancements
- Payments: Stripe, PayPal APIs
- Cloud: AWS, Vercel deployment
- Analytics: Custom AI-powered insights

## FAQ

Q: How does NextBuy AI's recommendation engine work?
A: Our AI analyzes your browsing history, purchase patterns, and preferences to suggest products you'll love. The more you shop, the smarter it gets!

Q: Is my payment information secure?
A: Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment data is tokenized and never stored on our servers.

Q: Can I return items if they don't fit?
A: Yes! We offer a 30-day return window for most items, including clothing. Return shipping is free for defective products.

Q: How do I track my order?
A: You'll receive a tracking number via email once your order ships. You can also track orders in real-time through your account dashboard.

Q: Does NextBuy AI ship internationally?
A: Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.

Q: What's the difference between Free and Premium plans?
A: Premium includes advanced AI recommendations, unlimited wishlist, price alerts, early sale access, and priority support - all for just $9.99/month.

Q: How do I contact customer support?
A: You can reach us 24/7 through our AI chat, email support@nextbuy.ai, or call 1-800-NEXTBUY during business hours.

Q: Can I use NextBuy AI for my business?
A: Yes! Our Business Plan ($29.99/month) includes bulk purchasing tools, analytics dashboard, and API access for custom integrations.

Q: How do price drop alerts work?
A: Add items to your wishlist and enable alerts. We'll notify you automatically when prices drop, so you never miss a deal.

Q: Is there a mobile app?
A: Yes! Download the NextBuy AI app from the App Store or Google Play for full shopping functionality on the go.

Q: What payment methods do you accept?
A: We accept all major credit cards, digital wallets (PayPal, Apple Pay, Google Pay), buy-now-pay-later options, and even cryptocurrency.

Q: How accurate is the AI sizing recommendation?
A: Our sizing AI has 95% accuracy based on millions of data points. You can also input your measurements for even better recommendations.
`;
var SYSTEM_PROMPT = `
You are the AI shopping assistant for NextBuy AI, an intelligent e-commerce platform.
Your role is to help customers by:
1. Answering questions about products, features, and services
2. Providing personalized shopping recommendations
3. Assisting with orders, returns, and account management
4. Guiding customers to the best solutions for their shopping needs

## Your Knowledge Base
${COMPANY_KNOWLEDGE}

## Behavior Rules
- Be friendly, helpful, and enthusiastic about shopping
- Keep answers concise (2\u20134 sentences max unless a detailed list is needed)
- Focus on helping customers find the best products and deals
- Use conversational, shopping-focused language
- When customers mention product needs, suggest relevant categories or specific features
- Always mention available plans and benefits when discussing premium features
- If a customer wants to make a purchase, guide them to checkout or account creation
- If you're unsure about specific product details, suggest browsing the relevant category
- Do NOT make up product specifications, prices, or features not in your knowledge base
- Do NOT discuss topics unrelated to shopping, products, or NextBuy AI services
- When recommending products or plans, explain the benefits clearly
- End responses with helpful next steps (e.g., "Ready to shop? Browse our Electronics category!" or "Want premium features? Upgrade to our Premium plan!")
- Use markdown formatting: **bold** for product names and prices, bullet lists for features
- Always be customer-focused and solution-oriented
- Emphasize AI-powered features and personalization benefits
`.trim();

// src/app/modules/chatbot/chatbot.service.ts
var genAI = null;
var getClient = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables");
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};
var chat = async ({ messages, leadData }) => {
  if (!messages || messages.length === 0) {
    throw new Error("messages array cannot be empty");
  }
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    throw new Error('The last message must have role "user"');
  }
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));
  const attemptChat = async (modelName) => {
    const model = getClient().getGenerativeModel({
      model: modelName
    });
    const chatSession = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I am the DeltA Digivast AI assistant. I will help visitors according to your instructions. How can I help you today?"
            }
          ]
        },
        ...history
      ],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7
      }
    });
    return await chatSession.sendMessage(lastMessage.content);
  };
  let result;
  try {
    result = await attemptChat("gemini-2.5-flash");
  } catch (err) {
    const message = err.message || "";
    if (message.includes("404")) {
      try {
        result = await attemptChat("gemini-flash-latest");
      } catch (fallbackErr) {
        throw new Error(
          `AI Model Error: ${fallbackErr.message || "Models not found."}`
        );
      }
    } else if (message.includes("429") || message.includes("quota")) {
      throw new Error(
        "Our AI assistant is temporarily busy (Quota exceeded). Please try again in a moment."
      );
    } else {
      throw err;
    }
  }
  const reply = result.response.text();
  let leadSaved = false;
  if (leadData?.email && leadData?.name) {
    await prisma.lead.create({
      data: {
        name: leadData.name,
        email: leadData.email,
        from: "chatbot",
        company: leadData.message ?? void 0,
        date: /* @__PURE__ */ new Date()
      }
    });
    leadSaved = true;
  }
  return { reply, leadSaved };
};
var ChatbotService = { chat };

// src/app/modules/chatbot/chatbot.controller.ts
var chat2 = catchAsync(async (req, res) => {
  const { messages, leadData } = req.body;
  const result = await ChatbotService.chat({ messages, leadData });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Chatbot reply generated successfully",
    data: result
  });
});
var ChatbotController = { chat: chat2 };

// src/app/modules/chatbot/chatbot.route.ts
var router5 = express.Router();
router5.post("/chat", ChatbotController.chat);
var ChatbotRoutes = router5;

// src/app/modules/wishlist/wishlist.route.ts
import express2 from "express";

// src/app/modules/wishlist/wishlist.service.ts
var createWishlist = async (userId, productId) => {
  const existing = await prisma.wishlist.findFirst({
    where: { userId, productId }
  });
  if (existing) {
    throw new Error("Product already in wishlist");
  }
  const result = await prisma.wishlist.create({
    data: {
      userId,
      productId
    }
  });
  return result;
};
var getWishlistByUser = async (userId) => {
  const result = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var deleteWishlistItem = async (id) => {
  const result = await prisma.wishlist.delete({
    where: { id }
  });
  return result;
};
var WishlistService = {
  createWishlist,
  getWishlistByUser,
  deleteWishlistItem
};

// src/app/modules/wishlist/wishlist.controller.ts
var createWishlist2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const result = await WishlistService.createWishlist(userId, productId);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Added to wishlist",
    data: result
  });
});
var getWishlistByUser2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await WishlistService.getWishlistByUser(userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Wishlist fetched successfully",
    data: result
  });
});
var deleteWishlistItem2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WishlistService.deleteWishlistItem(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Removed from wishlist",
    data: result
  });
});
var WishlistController = {
  createWishlist: createWishlist2,
  getWishlistByUser: getWishlistByUser2,
  deleteWishlistItem: deleteWishlistItem2
};

// src/app/modules/wishlist/wishlist.route.ts
var router6 = express2.Router();
router6.post(
  "/",
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  WishlistController.createWishlist
);
router6.get(
  "/",
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  WishlistController.getWishlistByUser
);
router6.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  WishlistController.deleteWishlistItem
);
var WishlistRoutes = router6;

// src/app/modules/category/category.route.ts
import { Router as Router5 } from "express";

// src/app/modules/category/category.service.ts
var createCategory = async (data) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      slug: data.slug
    }
  });
  if (existingCategory) {
    throw new Error("Category with this slug already exists");
  }
  const category = await prisma.category.create({
    data
  });
  return category;
};
var getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return categories;
};
var getSingleCategory = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      products: true
    }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};
var updateCategory = async (id, data) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      id
    }
  });
  if (!existingCategory) {
    throw new Error("Category not found");
  }
  if (data.slug) {
    const slugExists = await prisma.category.findFirst({
      where: {
        slug: data.slug,
        NOT: {
          id
        }
      }
    });
    if (slugExists) {
      throw new Error("Category with this slug already exists");
    }
  }
  const category = await prisma.category.update({
    where: {
      id
    },
    data
  });
  return category;
};
var deleteCategory = async (id) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      products: true
    }
  });
  if (!existingCategory) {
    throw new Error("Category not found");
  }
  if (existingCategory.products.length > 0) {
    throw new Error(
      "Cannot delete category because products are assigned to it"
    );
  }
  const category = await prisma.category.delete({
    where: {
      id
    }
  });
  return category;
};
var categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

// src/app/modules/category/category.controller.ts
var createCategory2 = catchAsync(async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result
  });
});
var getAllCategories2 = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategories();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Categories fetched successfully",
    data: result
  });
});
var getSingleCategory2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.getSingleCategory(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Category fetched successfully",
    data: result
  });
});
var updateCategory2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.updateCategory(id, req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Category updated successfully",
    data: result
  });
});
var deleteCategory2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result
  });
});
var CategoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/app/modules/category/category.route.ts
var router7 = Router5();
router7.post("/", auth(Role.ADMIN), CategoryController.createCategory);
router7.get("/", auth(Role.ADMIN), CategoryController.getAllCategories);
router7.get("/:id", auth(Role.ADMIN), CategoryController.getSingleCategory);
router7.patch("/:id", auth(Role.ADMIN), CategoryController.updateCategory);
router7.delete("/:id", auth(Role.ADMIN), CategoryController.deleteCategory);
var categoryRoutes = router7;

// src/app/modules/hero-management/hero.route.ts
import { Router as Router6 } from "express";

// src/app/modules/hero-management/hero.service.ts
var createHero = async (payload) => {
  const result = await prisma.hero.create({
    data: payload
  });
  return result;
};
var getAllHeroes = async (isShowing) => {
  const where = {};
  if (isShowing === "true") {
    where.OR = [
      {
        offer: {
          path: ["isShowing"],
          equals: true
        }
      },
      {
        banner: {
          path: ["isShowing"],
          equals: true
        }
      }
    ];
  }
  if (isShowing === "false") {
    where.AND = [
      {
        offer: {
          path: ["isShowing"],
          equals: false
        }
      },
      {
        banner: {
          path: ["isShowing"],
          equals: false
        }
      }
    ];
  }
  const result = await prisma.hero.findMany({
    where,
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getHeroById = async (id) => {
  const result = await prisma.hero.findUnique({
    where: {
      id
    }
  });
  return result;
};
var updateHero = async (id, payload) => {
  const result = await prisma.hero.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};
var deleteHero = async (id) => {
  const result = await prisma.hero.delete({
    where: {
      id
    }
  });
  return result;
};
var HeroService = {
  createHero,
  getAllHeroes,
  getHeroById,
  updateHero,
  deleteHero
};

// src/app/modules/hero-management/hero.controller.ts
var createHero2 = catchAsync(async (req, res) => {
  const result = await HeroService.createHero(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Hero created successfully",
    data: result
  });
});
var getAllHeroes2 = catchAsync(async (req, res) => {
  const { isShowing } = req.query;
  const result = await HeroService.getAllHeroes(
    isShowing
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Heroes fetched successfully",
    data: result
  });
});
var getHeroById2 = catchAsync(async (req, res) => {
  const result = await HeroService.getHeroById(req.params.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Hero fetched successfully",
    data: result
  });
});
var updateHero2 = catchAsync(async (req, res) => {
  const result = await HeroService.updateHero(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Hero updated successfully",
    data: result
  });
});
var deleteHero2 = catchAsync(async (req, res) => {
  const result = await HeroService.deleteHero(req.params.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Hero deleted successfully",
    data: result
  });
});
var HeroController = {
  createHero: createHero2,
  getAllHeroes: getAllHeroes2,
  getHeroById: getHeroById2,
  updateHero: updateHero2,
  deleteHero: deleteHero2
};

// src/app/modules/hero-management/hero.route.ts
var router8 = Router6();
router8.post("/", auth(Role.ADMIN), HeroController.createHero);
router8.get("/", auth(Role.ADMIN), HeroController.getAllHeroes);
router8.get("/:id", auth(Role.ADMIN), HeroController.getHeroById);
router8.patch("/:id", auth(Role.ADMIN), HeroController.updateHero);
router8.delete("/:id", auth(Role.ADMIN), HeroController.deleteHero);
var HeroRoutes = router8;

// src/app/modules/accounts/personal/personalEntry.route.ts
import express3 from "express";

// src/app/modules/accounts/personal/personalEntry.service.ts
var createPersonalEntry = async (payload) => {
  const {
    date,
    description,
    amount,
    status: status3,
    type,
    quantity,
    priceRmb,
    shippingCharge,
    paidReceivedBy,
    platform,
    clearanceStatus
  } = payload;
  const result = await prisma.personalEntry.create({
    data: {
      date: new Date(date),
      description,
      amount,
      status: status3,
      type,
      quantity,
      priceRmb,
      shippingCharge,
      paidReceivedBy,
      platform,
      clearanceStatus: clearanceStatus ?? "PENDING",
      accountType: "PERSONAL"
    }
  });
  return result;
};
var getAllPersonalEntries = async (params = {}) => {
  const page = Math.max(Number(params.page) || 1, 1);
  const limit = Math.max(Number(params.limit) || 10, 1);
  const skip = (page - 1) * limit;
  const [entries, total, statusSummary] = await Promise.all([
    // Paginated entries
    prisma.personalEntry.findMany({
      skip,
      take: limit,
      orderBy: {
        date: "desc"
      }
    }),
    // Total entries
    prisma.personalEntry.count(),
    // Status wise count
    prisma.personalEntry.groupBy({
      by: ["status"],
      _count: {
        _all: true
      }
    })
  ]);
  const summary = {
    totalEntries: total,
    paid: 0,
    unpaid: 0,
    received: 0
  };
  statusSummary.forEach((item) => {
    switch (item.status) {
      case "PAID":
        summary.paid = item._count._all;
        break;
      case "UNPAID":
        summary.unpaid = item._count._all;
        break;
      case "RECEIVED":
        summary.received = item._count._all;
        break;
    }
  });
  const totalPages = Math.ceil(total / limit);
  const meta = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
  return {
    data: entries,
    meta,
    summary
  };
};
var personalEntry_service_default = {
  getAllPersonalEntries
};
var getSinglePersonalEntry = async (id) => {
  const result = await prisma.personalEntry.findUnique({
    where: {
      id
    }
  });
  return result;
};
var updatePersonalEntry = async (id, payload) => {
  const data = {
    ...payload
  };
  if (payload.date) {
    data.date = new Date(payload.date);
  }
  const result = await prisma.personalEntry.update({
    where: {
      id
    },
    data
  });
  return result;
};
var deletePersonalEntry = async (id) => {
  const result = await prisma.personalEntry.delete({
    where: {
      id
    }
  });
  return result;
};
var PersonalEntryService = {
  createPersonalEntry,
  getAllPersonalEntries,
  getSinglePersonalEntry,
  updatePersonalEntry,
  deletePersonalEntry
};

// src/app/modules/accounts/personal/personalEntry.controller.ts
var createPersonalEntry2 = catchAsync(async (req, res) => {
  const result = await PersonalEntryService.createPersonalEntry(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Personal entry created successfully",
    data: result
  });
});
var getAllPersonalEntries2 = catchAsync(
  async (req, res) => {
    const result = await personalEntry_service_default.getAllPersonalEntries({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    });
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Personal entries retrieved successfully",
      data: result
    });
  }
);
var getSinglePersonalEntry2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await PersonalEntryService.getSinglePersonalEntry(
      id
    );
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Personal entry retrieved successfully",
      data: result
    });
  }
);
var updatePersonalEntry2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PersonalEntryService.updatePersonalEntry(
    id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Personal entry updated successfully",
    data: result
  });
});
var deletePersonalEntry2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  await PersonalEntryService.deletePersonalEntry(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Personal entry deleted successfully",
    data: null
  });
});
var PersonalEntryController = {
  createPersonalEntry: createPersonalEntry2,
  getAllPersonalEntries: getAllPersonalEntries2,
  getSinglePersonalEntry: getSinglePersonalEntry2,
  updatePersonalEntry: updatePersonalEntry2,
  deletePersonalEntry: deletePersonalEntry2
};

// src/app/modules/accounts/personal/personalEntry.route.ts
var router9 = express3.Router();
router9.post("/", auth(Role.ADMIN), PersonalEntryController.createPersonalEntry);
router9.get(
  "/",
  auth(Role.ADMIN),
  PersonalEntryController.getAllPersonalEntries
);
router9.get(
  "/:id",
  auth(Role.ADMIN),
  PersonalEntryController.getSinglePersonalEntry
);
router9.patch(
  "/:id",
  auth(Role.ADMIN),
  PersonalEntryController.updatePersonalEntry
);
router9.delete(
  "/:id",
  auth(Role.ADMIN),
  PersonalEntryController.deletePersonalEntry
);
var PersonalEntryRoutes = router9;

// src/app/routes/index.ts
var router10 = Router7();
router10.use("/users", UserRoute);
router10.use("/products", ProductRoutes);
router10.use("/orders", OrderRoutes);
router10.use("/cart", CartRoute);
router10.use("/chatbot", ChatbotRoutes);
router10.use("/wishlist", WishlistRoutes);
router10.use("/categories", categoryRoutes);
router10.use("/heroes", HeroRoutes);
router10.use("/personal-entries", PersonalEntryRoutes);
var routes_default = router10;

// src/app/modules/payment/payment.webhook.ts
import Stripe from "stripe";
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
var handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send("Webhook Error");
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await prisma.payment.create({
      data: {
        userId: session.metadata.userId,
        courseId: session.metadata.courseId,
        amount: session.amount_total / 100,
        currency: session.currency,
        status: session.payment_status,
        stripeSessionId: session.id
      }
    });
  }
  res.json({ received: true });
};

// src/app.ts
var app = express4();
var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://next-buy-ai-frontend.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept"
  ],
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express4.urlencoded({ extended: true }));
app.post("/webhook", express4.raw({ type: "application/json" }), handleWebhook);
app.use(express4.json());
app.use("/api/v1", routes_default);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/server.ts
var bootstrap = () => {
  try {
    app_default.listen(envVars.PORT, () => {
      console.log(`\u{1F680} Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
bootstrap();
