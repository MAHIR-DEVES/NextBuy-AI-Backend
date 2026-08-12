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
import { Router as Router12 } from "express";

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
  "inlineSchema": 'model InvestorPayment {\n  id String @id @default(cuid())\n\n  date        DateTime\n  description String\n\n  amount Decimal @db.Decimal(12, 2)\n\n  status InvestorPaymentStatus @default(PAID)\n\n  investorName String\n\n  investedAmount Decimal @db.Decimal(12, 2)\n  receivedAmount Decimal @db.Decimal(12, 2)\n\n  paymentBy   String\n  referenceBy String\n  platform    String\n\n  investmentStatus InvestmentStatus @default(RUNNING)\n\n  monthsPaid Int @default(0)\n\n  buyProducts String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("investor_payments")\n}\n\n// account\nenum PersonalEntryStatus {\n  PAID\n  UNPAID\n  RECEIVED\n}\n\nenum PersonalEntryType {\n  COST\n  RECEIVED\n}\n\nenum ClearanceStatus {\n  COMPLETED\n  PENDING\n}\n\nenum AccountType {\n  PERSONAL\n  CENTRAL\n}\n\nenum SteadfastWithdrawalStatus {\n  PAID\n  UNPAID\n}\n\nenum SteadfastWithdrawalClearanceStatus {\n  COMPLETED\n  PENDING\n}\n\nenum InvestorPaymentStatus {\n  PAID\n  UNPAID\n}\n\nenum InvestmentStatus {\n  RUNNING\n  COMPLETED\n}\n\nenum WholesaleStatus {\n  PAID\n  UNPAID\n}\n\nenum FixedMonthlyCostStatus {\n  PAID\n  UNPAID\n}\n\nmodel FixedMonthlyCost {\n  id          String                 @id @default(uuid())\n  date        DateTime\n  description String\n  amount      Decimal                @db.Decimal(12, 2)\n  status      FixedMonthlyCostStatus @default(UNPAID)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("fixed_monthly_costs")\n}\n\nmodel PersonalEntry {\n  id String @id @default(cuid())\n\n  date        DateTime\n  description String\n  amount      Decimal  @db.Decimal(12, 2)\n\n  status PersonalEntryStatus\n  type   PersonalEntryType\n\n  quantity       Int?\n  priceRmb       Decimal? @db.Decimal(12, 2)\n  shippingCharge Decimal? @db.Decimal(12, 2)\n\n  paidReceivedBy String?\n  platform       String?\n\n  clearanceStatus ClearanceStatus @default(PENDING)\n\n  accountType AccountType @default(PERSONAL)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("personal_entries")\n}\n\nenum ShipmentStatus {\n  PAID\n  UNPAID\n}\n\nenum ShippingStatus {\n  PROCESSING\n  COMPLETED\n}\n\nmodel Shipment {\n  id String @id @default(uuid())\n\n  date        DateTime\n  description String?\n  amount      Decimal        @db.Decimal(12, 2)\n  status      ShipmentStatus\n\n  productName String\n  quantity    Int\n\n  shippingCompany String\n  weight          Decimal @db.Decimal(10, 2)\n  perKgRate       Decimal @db.Decimal(10, 2)\n  shippingCharge  Decimal @db.Decimal(12, 2)\n\n  billingStatus  ShipmentStatus\n  shippingStatus ShippingStatus\n\n  receivingDate DateTime?\n\n  investorName String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("shipment-records")\n}\n\nmodel SteadfastWithdrawal {\n  id              String                             @id @default(cuid())\n  date            DateTime\n  description     String\n  amount          Decimal                            @db.Decimal(12, 2)\n  status          SteadfastWithdrawalStatus          @default(PAID)\n  withdrawBy      String\n  paymentMethod   String\n  clearanceStatus SteadfastWithdrawalClearanceStatus @default(PENDING)\n  createdAt       DateTime                           @default(now())\n  updatedAt       DateTime                           @updatedAt\n\n  @@map("steadfast_withdrawals")\n}\n\nmodel Wholesale {\n  id String @id @default(uuid())\n\n  date        DateTime\n  description String?\n  amount      Decimal         @db.Decimal(12, 2)\n  status      WholesaleStatus @default(UNPAID)\n\n  productName String\n  quantity    Int\n\n  priceRmb  Decimal @db.Decimal(12, 2)\n  priceTaka Decimal @db.Decimal(12, 2)\n\n  weight    Decimal @db.Decimal(12, 2)\n  costPerKg Decimal @db.Decimal(12, 2)\n\n  shipping     Decimal @db.Decimal(12, 2)\n  courierChina String?\n\n  note String?\n\n  onePairPrice Decimal @db.Decimal(12, 2)\n  salePrice    Decimal @db.Decimal(12, 2)\n\n  loss   Decimal @default(0) @db.Decimal(12, 2)\n  profit Decimal @default(0) @db.Decimal(12, 2)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("wholesale-records")\n}\n\nmodel Cart {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  quantity Int @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([userId, productId]) // same product duplicate \u09A8\u09BE \u09B9\u09DF\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String\n  slug        String  @unique\n  description String?\n  image       String?\n\n  isActive Boolean @default(true)\n\n  products Product[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  CUSTOMER\n  ADMIN\n  SELLER\n}\n\nenum STATUS {\n  ACTIVE\n  INACTIVE\n  BLOCKED\n}\n\nenum OrderStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  PARTIAL\n}\n\nmodel Hero {\n  id String @id @default(uuid())\n\n  offer  Json\n  banner Json\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Order {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  total  Float\n  status OrderStatus @default(PENDING)\n\n  name          String\n  phone         String\n  address       String\n  isInsideDhaka Boolean\n  shippingFee   Float   @default(0)\n\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id String @id @default(uuid())\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  name     String // snapshot\n  price    Float // snapshot\n  quantity Int\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Product {\n  id          String  @id @default(uuid())\n  name        String\n  slug        String  @unique\n  description String?\n\n  price    Float\n  discount Float?\n  stock    Int    @default(0)\n\n  thumbnail String\n  images    String[]\n\n  brand      String?\n  categoryId String?\n  category   Category? @relation(fields: [categoryId], references: [id])\n\n  rating      Float @default(0)\n  reviewCount Int   @default(0)\n\n  isFeatured  Boolean @default(false)\n  isPublished Boolean @default(true)\n\n  // Relations\n  orderItems OrderItem[]\n  carts      Cart[]\n  wishlist   Wishlist[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id       String  @id @default(uuid())\n  name     String\n  email    String  @unique\n  password String\n  phone    String? @unique\n  avatar   String?\n\n  role   Role   @default(CUSTOMER)\n  status STATUS @default(ACTIVE)\n\n  address String?\n  city    String?\n  country String?\n\n  lastLogin     DateTime?\n  emailVerified Boolean   @default(false)\n  provider      String? // google, email\n\n  // Relations\n  orders   Order[]\n  carts    Cart[]\n  wishlist Wishlist[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Wishlist {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, productId]) // duplicate wishlist prevent\n}\n',
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
config.runtimeDataModel = JSON.parse('{"models":{"InvestorPayment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"InvestorPaymentStatus"},{"name":"investorName","kind":"scalar","type":"String"},{"name":"investedAmount","kind":"scalar","type":"Decimal"},{"name":"receivedAmount","kind":"scalar","type":"Decimal"},{"name":"paymentBy","kind":"scalar","type":"String"},{"name":"referenceBy","kind":"scalar","type":"String"},{"name":"platform","kind":"scalar","type":"String"},{"name":"investmentStatus","kind":"enum","type":"InvestmentStatus"},{"name":"monthsPaid","kind":"scalar","type":"Int"},{"name":"buyProducts","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"investor_payments"},"FixedMonthlyCost":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"FixedMonthlyCostStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"fixed_monthly_costs"},"PersonalEntry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"PersonalEntryStatus"},{"name":"type","kind":"enum","type":"PersonalEntryType"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceRmb","kind":"scalar","type":"Decimal"},{"name":"shippingCharge","kind":"scalar","type":"Decimal"},{"name":"paidReceivedBy","kind":"scalar","type":"String"},{"name":"platform","kind":"scalar","type":"String"},{"name":"clearanceStatus","kind":"enum","type":"ClearanceStatus"},{"name":"accountType","kind":"enum","type":"AccountType"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"personal_entries"},"Shipment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"ShipmentStatus"},{"name":"productName","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"shippingCompany","kind":"scalar","type":"String"},{"name":"weight","kind":"scalar","type":"Decimal"},{"name":"perKgRate","kind":"scalar","type":"Decimal"},{"name":"shippingCharge","kind":"scalar","type":"Decimal"},{"name":"billingStatus","kind":"enum","type":"ShipmentStatus"},{"name":"shippingStatus","kind":"enum","type":"ShippingStatus"},{"name":"receivingDate","kind":"scalar","type":"DateTime"},{"name":"investorName","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shipment-records"},"SteadfastWithdrawal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"SteadfastWithdrawalStatus"},{"name":"withdrawBy","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"clearanceStatus","kind":"enum","type":"SteadfastWithdrawalClearanceStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"steadfast_withdrawals"},"Wholesale":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"WholesaleStatus"},{"name":"productName","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceRmb","kind":"scalar","type":"Decimal"},{"name":"priceTaka","kind":"scalar","type":"Decimal"},{"name":"weight","kind":"scalar","type":"Decimal"},{"name":"costPerKg","kind":"scalar","type":"Decimal"},{"name":"shipping","kind":"scalar","type":"Decimal"},{"name":"courierChina","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"onePairPrice","kind":"scalar","type":"Decimal"},{"name":"salePrice","kind":"scalar","type":"Decimal"},{"name":"loss","kind":"scalar","type":"Decimal"},{"name":"profit","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"wholesale-records"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"CartToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Hero":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"offer","kind":"scalar","type":"Json"},{"name":"banner","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"total","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"isInsideDhaka","kind":"scalar","type":"Boolean"},{"name":"shippingFee","kind":"scalar","type":"Float"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"discount","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"brand","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"reviewCount","kind":"scalar","type":"Int"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToProduct"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"ProductToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"STATUS"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"lastLogin","kind":"scalar","type":"DateTime"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"provider","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"UserToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToWishlist"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","InvestorPayment.findUnique","InvestorPayment.findUniqueOrThrow","orderBy","cursor","InvestorPayment.findFirst","InvestorPayment.findFirstOrThrow","InvestorPayment.findMany","data","InvestorPayment.createOne","InvestorPayment.createMany","InvestorPayment.createManyAndReturn","InvestorPayment.updateOne","InvestorPayment.updateMany","InvestorPayment.updateManyAndReturn","create","update","InvestorPayment.upsertOne","InvestorPayment.deleteOne","InvestorPayment.deleteMany","having","_count","_avg","_sum","_min","_max","InvestorPayment.groupBy","InvestorPayment.aggregate","FixedMonthlyCost.findUnique","FixedMonthlyCost.findUniqueOrThrow","FixedMonthlyCost.findFirst","FixedMonthlyCost.findFirstOrThrow","FixedMonthlyCost.findMany","FixedMonthlyCost.createOne","FixedMonthlyCost.createMany","FixedMonthlyCost.createManyAndReturn","FixedMonthlyCost.updateOne","FixedMonthlyCost.updateMany","FixedMonthlyCost.updateManyAndReturn","FixedMonthlyCost.upsertOne","FixedMonthlyCost.deleteOne","FixedMonthlyCost.deleteMany","FixedMonthlyCost.groupBy","FixedMonthlyCost.aggregate","PersonalEntry.findUnique","PersonalEntry.findUniqueOrThrow","PersonalEntry.findFirst","PersonalEntry.findFirstOrThrow","PersonalEntry.findMany","PersonalEntry.createOne","PersonalEntry.createMany","PersonalEntry.createManyAndReturn","PersonalEntry.updateOne","PersonalEntry.updateMany","PersonalEntry.updateManyAndReturn","PersonalEntry.upsertOne","PersonalEntry.deleteOne","PersonalEntry.deleteMany","PersonalEntry.groupBy","PersonalEntry.aggregate","Shipment.findUnique","Shipment.findUniqueOrThrow","Shipment.findFirst","Shipment.findFirstOrThrow","Shipment.findMany","Shipment.createOne","Shipment.createMany","Shipment.createManyAndReturn","Shipment.updateOne","Shipment.updateMany","Shipment.updateManyAndReturn","Shipment.upsertOne","Shipment.deleteOne","Shipment.deleteMany","Shipment.groupBy","Shipment.aggregate","SteadfastWithdrawal.findUnique","SteadfastWithdrawal.findUniqueOrThrow","SteadfastWithdrawal.findFirst","SteadfastWithdrawal.findFirstOrThrow","SteadfastWithdrawal.findMany","SteadfastWithdrawal.createOne","SteadfastWithdrawal.createMany","SteadfastWithdrawal.createManyAndReturn","SteadfastWithdrawal.updateOne","SteadfastWithdrawal.updateMany","SteadfastWithdrawal.updateManyAndReturn","SteadfastWithdrawal.upsertOne","SteadfastWithdrawal.deleteOne","SteadfastWithdrawal.deleteMany","SteadfastWithdrawal.groupBy","SteadfastWithdrawal.aggregate","Wholesale.findUnique","Wholesale.findUniqueOrThrow","Wholesale.findFirst","Wholesale.findFirstOrThrow","Wholesale.findMany","Wholesale.createOne","Wholesale.createMany","Wholesale.createManyAndReturn","Wholesale.updateOne","Wholesale.updateMany","Wholesale.updateManyAndReturn","Wholesale.upsertOne","Wholesale.deleteOne","Wholesale.deleteMany","Wholesale.groupBy","Wholesale.aggregate","user","order","products","category","orderItems","carts","product","wishlist","items","orders","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Hero.findUnique","Hero.findUniqueOrThrow","Hero.findFirst","Hero.findFirstOrThrow","Hero.findMany","Hero.createOne","Hero.createMany","Hero.createManyAndReturn","Hero.updateOne","Hero.updateMany","Hero.updateManyAndReturn","Hero.upsertOne","Hero.deleteOne","Hero.deleteMany","Hero.groupBy","Hero.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Wishlist.findUnique","Wishlist.findUniqueOrThrow","Wishlist.findFirst","Wishlist.findFirstOrThrow","Wishlist.findMany","Wishlist.createOne","Wishlist.createMany","Wishlist.createManyAndReturn","Wishlist.updateOne","Wishlist.updateMany","Wishlist.updateManyAndReturn","Wishlist.upsertOne","Wishlist.deleteOne","Wishlist.deleteMany","Wishlist.groupBy","Wishlist.aggregate","AND","OR","NOT","id","userId","productId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","email","password","phone","avatar","Role","role","STATUS","status","address","city","country","lastLogin","emailVerified","provider","updatedAt","every","some","none","slug","description","price","discount","stock","thumbnail","images","brand","categoryId","rating","reviewCount","isFeatured","isPublished","has","hasEvery","hasSome","orderId","quantity","total","OrderStatus","isInsideDhaka","shippingFee","offer","banner","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","image","isActive","userId_productId","date","amount","WholesaleStatus","productName","priceRmb","priceTaka","weight","costPerKg","shipping","courierChina","note","onePairPrice","salePrice","loss","profit","SteadfastWithdrawalStatus","withdrawBy","paymentMethod","SteadfastWithdrawalClearanceStatus","clearanceStatus","ShipmentStatus","shippingCompany","perKgRate","shippingCharge","billingStatus","ShippingStatus","shippingStatus","receivingDate","investorName","PersonalEntryStatus","PersonalEntryType","type","paidReceivedBy","platform","ClearanceStatus","AccountType","accountType","FixedMonthlyCostStatus","InvestorPaymentStatus","investedAmount","receivedAmount","paymentBy","referenceBy","InvestmentStatus","investmentStatus","monthsPaid","buyProducts","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "jwaJAeABE_YBAACCBAAw9wEAAAQAEPgBAACCBAAw-QEBAAAAAfwBQACSAwAhkAIAAIME4wIilwJAAJIDACGcAgEAjAMAIbwCQACSAwAhvQIQAMYDACHYAgEAjAMAId0CAQCMAwAh4wIQAMYDACHkAhAAxgMAIeUCAQCMAwAh5gIBAIwDACHoAgAAhAToAiLpAgIAswMAIeoCAQCNAwAhAQAAAAEAIAEAAAABACAT9gEAAIIEADD3AQAABAAQ-AEAAIIEADD5AQEAjAMAIfwBQACSAwAhkAIAAIME4wIilwJAAJIDACGcAgEAjAMAIbwCQACSAwAhvQIQAMYDACHYAgEAjAMAId0CAQCMAwAh4wIQAMYDACHkAhAAxgMAIeUCAQCMAwAh5gIBAIwDACHoAgAAhAToAiLpAgIAswMAIeoCAQCNAwAhAeoCAACOBAAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACADAAAABAAgAwAABQAwBAAAAQAgEPkBAQAAAAH8AUAAAAABkAIAAADjAgKXAkAAAAABnAIBAAAAAbwCQAAAAAG9AhAAAAAB2AIBAAAAAd0CAQAAAAHjAhAAAAAB5AIQAAAAAeUCAQAAAAHmAgEAAAAB6AIAAADoAgLpAgIAAAAB6gIBAAAAAQEIAAAJACAQ-QEBAAAAAfwBQAAAAAGQAgAAAOMCApcCQAAAAAGcAgEAAAABvAJAAAAAAb0CEAAAAAHYAgEAAAAB3QIBAAAAAeMCEAAAAAHkAhAAAAAB5QIBAAAAAeYCAQAAAAHoAgAAAOgCAukCAgAAAAHqAgEAAAABAQgAAAsAMAEIAAALADAQ-QEBAIgEACH8AUAAiQQAIZACAADeBeMCIpcCQACJBAAhnAIBAIgEACG8AkAAiQQAIb0CEAC4BQAh2AIBAIgEACHdAgEAiAQAIeMCEAC4BQAh5AIQALgFACHlAgEAiAQAIeYCAQCIBAAh6AIAAN8F6AIi6QICALAEACHqAgEAkgQAIQIAAAABACAIAAAOACAQ-QEBAIgEACH8AUAAiQQAIZACAADeBeMCIpcCQACJBAAhnAIBAIgEACG8AkAAiQQAIb0CEAC4BQAh2AIBAIgEACHdAgEAiAQAIeMCEAC4BQAh5AIQALgFACHlAgEAiAQAIeYCAQCIBAAh6AIAAN8F6AIi6QICALAEACHqAgEAkgQAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAANkFACAWAADaBQAgFwAA3QUAIBgAANwFACAZAADbBQAg6gIAAI4EACAT9gEAAPsDADD3AQAAFwAQ-AEAAPsDADD5AQEA8wIAIfwBQAD0AgAhkAIAAPwD4wIilwJAAPQCACGcAgEA8wIAIbwCQAD0AgAhvQIQAL8DACHYAgEA8wIAId0CAQDzAgAh4wIQAL8DACHkAhAAvwMAIeUCAQDzAgAh5gIBAPMCACHoAgAA_QPoAiLpAgIAmQMAIeoCAQD7AgAhAwAAAAQAIAMAABYAMBQAABcAIAMAAAAEACADAAAFADAEAAABACAK9gEAAPkDADD3AQAAHQAQ-AEAAPkDADD5AQEAAAAB_AFAAJIDACGQAgAA-gPiAiKXAkAAkgMAIZwCAQCMAwAhvAJAAJIDACG9AhAAxgMAIQEAAAAaACABAAAAGgAgCvYBAAD5AwAw9wEAAB0AEPgBAAD5AwAw-QEBAIwDACH8AUAAkgMAIZACAAD6A-ICIpcCQACSAwAhnAIBAIwDACG8AkAAkgMAIb0CEADGAwAhAAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgAwAAAB0AIAMAAB4AMAQAABoAIAf5AQEAAAAB_AFAAAAAAZACAAAA4gIClwJAAAAAAZwCAQAAAAG8AkAAAAABvQIQAAAAAQEIAAAiACAH-QEBAAAAAfwBQAAAAAGQAgAAAOICApcCQAAAAAGcAgEAAAABvAJAAAAAAb0CEAAAAAEBCAAAJAAwAQgAACQAMAf5AQEAiAQAIfwBQACJBAAhkAIAANgF4gIilwJAAIkEACGcAgEAiAQAIbwCQACJBAAhvQIQALgFACECAAAAGgAgCAAAJwAgB_kBAQCIBAAh_AFAAIkEACGQAgAA2AXiAiKXAkAAiQQAIZwCAQCIBAAhvAJAAIkEACG9AhAAuAUAIQIAAAAdACAIAAApACACAAAAHQAgCAAAKQAgAwAAABoAIA8AACIAIBAAACcAIAEAAAAaACABAAAAHQAgBRUAANMFACAWAADUBQAgFwAA1wUAIBgAANYFACAZAADVBQAgCvYBAAD1AwAw9wEAADAAEPgBAAD1AwAw-QEBAPMCACH8AUAA9AIAIZACAAD2A-ICIpcCQAD0AgAhnAIBAPMCACG8AkAA9AIAIb0CEAC_AwAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAS9gEAAO4DADD3AQAANgAQ-AEAAO4DADD5AQEAAAAB_AFAAJIDACGQAgAA7wPaAiKXAkAAkgMAIZwCAQCMAwAhrAICAPEDACG8AkAAkgMAIb0CEADGAwAhwAIQAPIDACHPAgAA8wPfAiLTAhAA8gMAIdsCAADwA9sCItwCAQCNAwAh3QIBAI0DACHgAgAA9APgAiIBAAAAMwAgAQAAADMAIBL2AQAA7gMAMPcBAAA2ABD4AQAA7gMAMPkBAQCMAwAh_AFAAJIDACGQAgAA7wPaAiKXAkAAkgMAIZwCAQCMAwAhrAICAPEDACG8AkAAkgMAIb0CEADGAwAhwAIQAPIDACHPAgAA8wPfAiLTAhAA8gMAIdsCAADwA9sCItwCAQCNAwAh3QIBAI0DACHgAgAA9APgAiIFrAIAAI4EACDAAgAAjgQAINMCAACOBAAg3AIAAI4EACDdAgAAjgQAIAMAAAA2ACADAAA3ADAEAAAzACADAAAANgAgAwAANwAwBAAAMwAgAwAAADYAIAMAADcAMAQAADMAIA_5AQEAAAAB_AFAAAAAAZACAAAA2gIClwJAAAAAAZwCAQAAAAGsAgIAAAABvAJAAAAAAb0CEAAAAAHAAhAAAAABzwIAAADfAgLTAhAAAAAB2wIAAADbAgLcAgEAAAAB3QIBAAAAAeACAAAA4AICAQgAADsAIA_5AQEAAAAB_AFAAAAAAZACAAAA2gIClwJAAAAAAZwCAQAAAAGsAgIAAAABvAJAAAAAAb0CEAAAAAHAAhAAAAABzwIAAADfAgLTAhAAAAAB2wIAAADbAgLcAgEAAAAB3QIBAAAAAeACAAAA4AICAQgAAD0AMAEIAAA9ADAP-QEBAIgEACH8AUAAiQQAIZACAADNBdoCIpcCQACJBAAhnAIBAIgEACGsAgIAzwUAIbwCQACJBAAhvQIQALgFACHAAhAA0AUAIc8CAADRBd8CItMCEADQBQAh2wIAAM4F2wIi3AIBAJIEACHdAgEAkgQAIeACAADSBeACIgIAAAAzACAIAABAACAP-QEBAIgEACH8AUAAiQQAIZACAADNBdoCIpcCQACJBAAhnAIBAIgEACGsAgIAzwUAIbwCQACJBAAhvQIQALgFACHAAhAA0AUAIc8CAADRBd8CItMCEADQBQAh2wIAAM4F2wIi3AIBAJIEACHdAgEAkgQAIeACAADSBeACIgIAAAA2ACAIAABCACACAAAANgAgCAAAQgAgAwAAADMAIA8AADsAIBAAAEAAIAEAAAAzACABAAAANgAgChUAAMgFACAWAADJBQAgFwAAzAUAIBgAAMsFACAZAADKBQAgrAIAAI4EACDAAgAAjgQAINMCAACOBAAg3AIAAI4EACDdAgAAjgQAIBL2AQAA3AMAMPcBAABJABD4AQAA3AMAMPkBAQDzAgAh_AFAAPQCACGQAgAA3QPaAiKXAkAA9AIAIZwCAQDzAgAhrAICAN8DACG8AkAA9AIAIb0CEAC_AwAhwAIQAOADACHPAgAA4QPfAiLTAhAA4AMAIdsCAADeA9sCItwCAQD7AgAh3QIBAPsCACHgAgAA4gPgAiIDAAAANgAgAwAASAAwFAAASQAgAwAAADYAIAMAADcAMAQAADMAIBT2AQAA2QMAMPcBAABPABD4AQAA2QMAMPkBAQAAAAH8AUAAkgMAIZACAADaA9ECIpcCQACSAwAhnAIBAI0DACGsAgIAswMAIbwCQACSAwAhvQIQAMYDACG_AgEAjAMAIcICEADGAwAh0QIBAIwDACHSAhAAxgMAIdMCEADGAwAh1AIAANoD0QIi1gIAANsD1gIi1wJAAJADACHYAgEAjQMAIQEAAABMACABAAAATAAgFPYBAADZAwAw9wEAAE8AEPgBAADZAwAw-QEBAIwDACH8AUAAkgMAIZACAADaA9ECIpcCQACSAwAhnAIBAI0DACGsAgIAswMAIbwCQACSAwAhvQIQAMYDACG_AgEAjAMAIcICEADGAwAh0QIBAIwDACHSAhAAxgMAIdMCEADGAwAh1AIAANoD0QIi1gIAANsD1gIi1wJAAJADACHYAgEAjQMAIQOcAgAAjgQAINcCAACOBAAg2AIAAI4EACADAAAATwAgAwAAUAAwBAAATAAgAwAAAE8AIAMAAFAAMAQAAEwAIAMAAABPACADAABQADAEAABMACAR-QEBAAAAAfwBQAAAAAGQAgAAANECApcCQAAAAAGcAgEAAAABrAICAAAAAbwCQAAAAAG9AhAAAAABvwIBAAAAAcICEAAAAAHRAgEAAAAB0gIQAAAAAdMCEAAAAAHUAgAAANECAtYCAAAA1gIC1wJAAAAAAdgCAQAAAAEBCAAAVAAgEfkBAQAAAAH8AUAAAAABkAIAAADRAgKXAkAAAAABnAIBAAAAAawCAgAAAAG8AkAAAAABvQIQAAAAAb8CAQAAAAHCAhAAAAAB0QIBAAAAAdICEAAAAAHTAhAAAAAB1AIAAADRAgLWAgAAANYCAtcCQAAAAAHYAgEAAAABAQgAAFYAMAEIAABWADAR-QEBAIgEACH8AUAAiQQAIZACAADGBdECIpcCQACJBAAhnAIBAJIEACGsAgIAsAQAIbwCQACJBAAhvQIQALgFACG_AgEAiAQAIcICEAC4BQAh0QIBAIgEACHSAhAAuAUAIdMCEAC4BQAh1AIAAMYF0QIi1gIAAMcF1gIi1wJAAJUEACHYAgEAkgQAIQIAAABMACAIAABZACAR-QEBAIgEACH8AUAAiQQAIZACAADGBdECIpcCQACJBAAhnAIBAJIEACGsAgIAsAQAIbwCQACJBAAhvQIQALgFACG_AgEAiAQAIcICEAC4BQAh0QIBAIgEACHSAhAAuAUAIdMCEAC4BQAh1AIAAMYF0QIi1gIAAMcF1gIi1wJAAJUEACHYAgEAkgQAIQIAAABPACAIAABbACACAAAATwAgCAAAWwAgAwAAAEwAIA8AAFQAIBAAAFkAIAEAAABMACABAAAATwAgCBUAAMEFACAWAADCBQAgFwAAxQUAIBgAAMQFACAZAADDBQAgnAIAAI4EACDXAgAAjgQAINgCAACOBAAgFPYBAADSAwAw9wEAAGIAEPgBAADSAwAw-QEBAPMCACH8AUAA9AIAIZACAADTA9ECIpcCQAD0AgAhnAIBAPsCACGsAgIAmQMAIbwCQAD0AgAhvQIQAL8DACG_AgEA8wIAIcICEAC_AwAh0QIBAPMCACHSAhAAvwMAIdMCEAC_AwAh1AIAANMD0QIi1gIAANQD1gIi1wJAAP4CACHYAgEA-wIAIQMAAABPACADAABhADAUAABiACADAAAATwAgAwAAUAAwBAAATAAgDfYBAADPAwAw9wEAAGgAEPgBAADPAwAw-QEBAAAAAfwBQACSAwAhkAIAANADzAIilwJAAJIDACGcAgEAjAMAIbwCQACSAwAhvQIQAMYDACHMAgEAjAMAIc0CAQCMAwAhzwIAANEDzwIiAQAAAGUAIAEAAABlACAN9gEAAM8DADD3AQAAaAAQ-AEAAM8DADD5AQEAjAMAIfwBQACSAwAhkAIAANADzAIilwJAAJIDACGcAgEAjAMAIbwCQACSAwAhvQIQAMYDACHMAgEAjAMAIc0CAQCMAwAhzwIAANEDzwIiAAMAAABoACADAABpADAEAABlACADAAAAaAAgAwAAaQAwBAAAZQAgAwAAAGgAIAMAAGkAMAQAAGUAIAr5AQEAAAAB_AFAAAAAAZACAAAAzAIClwJAAAAAAZwCAQAAAAG8AkAAAAABvQIQAAAAAcwCAQAAAAHNAgEAAAABzwIAAADPAgIBCAAAbQAgCvkBAQAAAAH8AUAAAAABkAIAAADMAgKXAkAAAAABnAIBAAAAAbwCQAAAAAG9AhAAAAABzAIBAAAAAc0CAQAAAAHPAgAAAM8CAgEIAABvADABCAAAbwAwCvkBAQCIBAAh_AFAAIkEACGQAgAAvwXMAiKXAkAAiQQAIZwCAQCIBAAhvAJAAIkEACG9AhAAuAUAIcwCAQCIBAAhzQIBAIgEACHPAgAAwAXPAiICAAAAZQAgCAAAcgAgCvkBAQCIBAAh_AFAAIkEACGQAgAAvwXMAiKXAkAAiQQAIZwCAQCIBAAhvAJAAIkEACG9AhAAuAUAIcwCAQCIBAAhzQIBAIgEACHPAgAAwAXPAiICAAAAaAAgCAAAdAAgAgAAAGgAIAgAAHQAIAMAAABlACAPAABtACAQAAByACABAAAAZQAgAQAAAGgAIAUVAAC6BQAgFgAAuwUAIBcAAL4FACAYAAC9BQAgGQAAvAUAIA32AQAAyAMAMPcBAAB7ABD4AQAAyAMAMPkBAQDzAgAh_AFAAPQCACGQAgAAyQPMAiKXAkAA9AIAIZwCAQDzAgAhvAJAAPQCACG9AhAAvwMAIcwCAQDzAgAhzQIBAPMCACHPAgAAygPPAiIDAAAAaAAgAwAAegAwFAAAewAgAwAAAGgAIAMAAGkAMAQAAGUAIBf2AQAAxQMAMPcBAACBAQAQ-AEAAMUDADD5AQEAAAAB_AFAAJIDACGQAgAAxwO_AiKXAkAAkgMAIZwCAQCNAwAhrAICALMDACG8AkAAkgMAIb0CEADGAwAhvwIBAIwDACHAAhAAxgMAIcECEADGAwAhwgIQAMYDACHDAhAAxgMAIcQCEADGAwAhxQIBAI0DACHGAgEAjQMAIccCEADGAwAhyAIQAMYDACHJAhAAxgMAIcoCEADGAwAhAQAAAH4AIAEAAAB-ACAX9gEAAMUDADD3AQAAgQEAEPgBAADFAwAw-QEBAIwDACH8AUAAkgMAIZACAADHA78CIpcCQACSAwAhnAIBAI0DACGsAgIAswMAIbwCQACSAwAhvQIQAMYDACG_AgEAjAMAIcACEADGAwAhwQIQAMYDACHCAhAAxgMAIcMCEADGAwAhxAIQAMYDACHFAgEAjQMAIcYCAQCNAwAhxwIQAMYDACHIAhAAxgMAIckCEADGAwAhygIQAMYDACEDnAIAAI4EACDFAgAAjgQAIMYCAACOBAAgAwAAAIEBACADAACCAQAwBAAAfgAgAwAAAIEBACADAACCAQAwBAAAfgAgAwAAAIEBACADAACCAQAwBAAAfgAgFPkBAQAAAAH8AUAAAAABkAIAAAC_AgKXAkAAAAABnAIBAAAAAawCAgAAAAG8AkAAAAABvQIQAAAAAb8CAQAAAAHAAhAAAAABwQIQAAAAAcICEAAAAAHDAhAAAAABxAIQAAAAAcUCAQAAAAHGAgEAAAABxwIQAAAAAcgCEAAAAAHJAhAAAAABygIQAAAAAQEIAACGAQAgFPkBAQAAAAH8AUAAAAABkAIAAAC_AgKXAkAAAAABnAIBAAAAAawCAgAAAAG8AkAAAAABvQIQAAAAAb8CAQAAAAHAAhAAAAABwQIQAAAAAcICEAAAAAHDAhAAAAABxAIQAAAAAcUCAQAAAAHGAgEAAAABxwIQAAAAAcgCEAAAAAHJAhAAAAABygIQAAAAAQEIAACIAQAwAQgAAIgBADAU-QEBAIgEACH8AUAAiQQAIZACAAC5Bb8CIpcCQACJBAAhnAIBAJIEACGsAgIAsAQAIbwCQACJBAAhvQIQALgFACG_AgEAiAQAIcACEAC4BQAhwQIQALgFACHCAhAAuAUAIcMCEAC4BQAhxAIQALgFACHFAgEAkgQAIcYCAQCSBAAhxwIQALgFACHIAhAAuAUAIckCEAC4BQAhygIQALgFACECAAAAfgAgCAAAiwEAIBT5AQEAiAQAIfwBQACJBAAhkAIAALkFvwIilwJAAIkEACGcAgEAkgQAIawCAgCwBAAhvAJAAIkEACG9AhAAuAUAIb8CAQCIBAAhwAIQALgFACHBAhAAuAUAIcICEAC4BQAhwwIQALgFACHEAhAAuAUAIcUCAQCSBAAhxgIBAJIEACHHAhAAuAUAIcgCEAC4BQAhyQIQALgFACHKAhAAuAUAIQIAAACBAQAgCAAAjQEAIAIAAACBAQAgCAAAjQEAIAMAAAB-ACAPAACGAQAgEAAAiwEAIAEAAAB-ACABAAAAgQEAIAgVAACzBQAgFgAAtAUAIBcAALcFACAYAAC2BQAgGQAAtQUAIJwCAACOBAAgxQIAAI4EACDGAgAAjgQAIBf2AQAAvgMAMPcBAACUAQAQ-AEAAL4DADD5AQEA8wIAIfwBQAD0AgAhkAIAAMADvwIilwJAAPQCACGcAgEA-wIAIawCAgCZAwAhvAJAAPQCACG9AhAAvwMAIb8CAQDzAgAhwAIQAL8DACHBAhAAvwMAIcICEAC_AwAhwwIQAL8DACHEAhAAvwMAIcUCAQD7AgAhxgIBAPsCACHHAhAAvwMAIcgCEAC_AwAhyQIQAL8DACHKAhAAvwMAIQMAAACBAQAgAwAAkwEAMBQAAJQBACADAAAAgQEAIAMAAIIBADAEAAB-ACAMbAAAsAMAIHIAALEDACD2AQAAsgMAMPcBAACpAQAQ-AEAALIDADD5AQEAAAAB-gEBAIwDACH7AQEAjAMAIfwBQACSAwAhlwJAAJIDACGsAgIAswMAIbsCAAC9AwAgAQAAAJcBACAQbAAAsAMAIHQAALgDACD2AQAAuwMAMPcBAACZAQAQ-AEAALsDADD5AQEAjAMAIfoBAQCMAwAh_AFAAJIDACGIAgEAjAMAIYsCAQCMAwAhkAIAALwDrwIikQIBAIwDACGXAkAAkgMAIa0CCAC1AwAhrwIgAJEDACGwAggAtQMAIQJsAACuBQAgdAAAsQUAIBBsAACwAwAgdAAAuAMAIPYBAAC7AwAw9wEAAJkBABD4AQAAuwMAMPkBAQAAAAH6AQEAjAMAIfwBQACSAwAhiAIBAIwDACGLAgEAjAMAIZACAAC8A68CIpECAQCMAwAhlwJAAJIDACGtAggAtQMAIa8CIACRAwAhsAIIALUDACEDAAAAmQEAIAMAAJoBADAEAACbAQAgDW0AALoDACByAACxAwAg9gEAALkDADD3AQAAnQEAEPgBAAC5AwAw-QEBAIwDACH7AQEAjAMAIfwBQACSAwAhiAIBAIwDACGXAkAAkgMAIZ0CCAC1AwAhqwIBAIwDACGsAgIAswMAIQJtAACyBQAgcgAArwUAIA1tAAC6AwAgcgAAsQMAIPYBAAC5AwAw9wEAAJ0BABD4AQAAuQMAMPkBAQAAAAH7AQEAjAMAIfwBQACSAwAhiAIBAIwDACGXAkAAkgMAIZ0CCAC1AwAhqwIBAIwDACGsAgIAswMAIQMAAACdAQAgAwAAngEAMAQAAJ8BACAMbgAArAMAIPYBAACrAwAw9wEAAKEBABD4AQAAqwMAMPkBAQCMAwAh_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhmwIBAIwDACGcAgEAjQMAIbkCAQCNAwAhugIgAJEDACEBAAAAoQEAIBhvAAC3AwAgcAAAuAMAIHEAAJQDACBzAACVAwAg9gEAALQDADD3AQAAowEAEPgBAAC0AwAw-QEBAIwDACH8AUAAkgMAIYgCAQCMAwAhlwJAAJIDACGbAgEAjAMAIZwCAQCNAwAhnQIIALUDACGeAggAtgMAIZ8CAgCzAwAhoAIBAIwDACGhAgAAmgMAIKICAQCNAwAhowIBAI0DACGkAggAtQMAIaUCAgCzAwAhpgIgAJEDACGnAiAAkQMAIQhvAACwBQAgcAAAsQUAIHEAANcEACBzAADYBAAgnAIAAI4EACCeAgAAjgQAIKICAACOBAAgowIAAI4EACAYbwAAtwMAIHAAALgDACBxAACUAwAgcwAAlQMAIPYBAAC0AwAw9wEAAKMBABD4AQAAtAMAMPkBAQAAAAH8AUAAkgMAIYgCAQCMAwAhlwJAAJIDACGbAgEAAAABnAIBAI0DACGdAggAtQMAIZ4CCAC2AwAhnwICALMDACGgAgEAjAMAIaECAACaAwAgogIBAI0DACGjAgEAjQMAIaQCCAC1AwAhpQICALMDACGmAiAAkQMAIacCIACRAwAhAwAAAKMBACADAACkAQAwBAAApQEAIAEAAACjAQAgAwAAAJ0BACADAACeAQAwBAAAnwEAIAtsAACwAwAgcgAAsQMAIPYBAACyAwAw9wEAAKkBABD4AQAAsgMAMPkBAQCMAwAh-gEBAIwDACH7AQEAjAMAIfwBQACSAwAhlwJAAJIDACGsAgIAswMAIQJsAACuBQAgcgAArwUAIAMAAACpAQAgAwAAqgEAMAQAAJcBACAJbAAAsAMAIHIAALEDACD2AQAArwMAMPcBAACsAQAQ-AEAAK8DADD5AQEAjAMAIfoBAQCMAwAh-wEBAIwDACH8AUAAkgMAIQJsAACuBQAgcgAArwUAIApsAACwAwAgcgAAsQMAIPYBAACvAwAw9wEAAKwBABD4AQAArwMAMPkBAQAAAAH6AQEAjAMAIfsBAQCMAwAh_AFAAJIDACG7AgAArgMAIAMAAACsAQAgAwAArQEAMAQAAK4BACABAAAAnQEAIAEAAACpAQAgAQAAAKwBACABAAAAnQEAIAMAAACpAQAgAwAAqgEAMAQAAJcBACADAAAArAEAIAMAAK0BADAEAACuAQAgAQAAAJkBACABAAAAqQEAIAEAAACsAQAgAQAAAJcBACADAAAAqQEAIAMAAKoBADAEAACXAQAgAwAAAKkBACADAACqAQAwBAAAlwEAIAMAAACpAQAgAwAAqgEAMAQAAJcBACAIbAAA9wQAIHIAALQEACD5AQEAAAAB-gEBAAAAAfsBAQAAAAH8AUAAAAABlwJAAAAAAawCAgAAAAEBCAAAvQEAIAb5AQEAAAAB-gEBAAAAAfsBAQAAAAH8AUAAAAABlwJAAAAAAawCAgAAAAEBCAAAvwEAMAEIAAC_AQAwCGwAAPUEACByAACyBAAg-QEBAIgEACH6AQEAiAQAIfsBAQCIBAAh_AFAAIkEACGXAkAAiQQAIawCAgCwBAAhAgAAAJcBACAIAADCAQAgBvkBAQCIBAAh-gEBAIgEACH7AQEAiAQAIfwBQACJBAAhlwJAAIkEACGsAgIAsAQAIQIAAACpAQAgCAAAxAEAIAIAAACpAQAgCAAAxAEAIAMAAACXAQAgDwAAvQEAIBAAAMIBACABAAAAlwEAIAEAAACpAQAgBRUAAKkFACAWAACqBQAgFwAArQUAIBgAAKwFACAZAACrBQAgCfYBAACtAwAw9wEAAMsBABD4AQAArQMAMPkBAQDzAgAh-gEBAPMCACH7AQEA8wIAIfwBQAD0AgAhlwJAAPQCACGsAgIAmQMAIQMAAACpAQAgAwAAygEAMBQAAMsBACADAAAAqQEAIAMAAKoBADAEAACXAQAgDG4AAKwDACD2AQAAqwMAMPcBAAChAQAQ-AEAAKsDADD5AQEAAAAB_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhmwIBAAAAAZwCAQCNAwAhuQIBAI0DACG6AiAAkQMAIQEAAADOAQAgAQAAAM4BACADbgAAqAUAIJwCAACOBAAguQIAAI4EACADAAAAoQEAIAMAANEBADAEAADOAQAgAwAAAKEBACADAADRAQAwBAAAzgEAIAMAAAChAQAgAwAA0QEAMAQAAM4BACAJbgAApwUAIPkBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGbAgEAAAABnAIBAAAAAbkCAQAAAAG6AiAAAAABAQgAANUBACAI-QEBAAAAAfwBQAAAAAGIAgEAAAABlwJAAAAAAZsCAQAAAAGcAgEAAAABuQIBAAAAAboCIAAAAAEBCAAA1wEAMAEIAADXAQAwCW4AAJoFACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZsCAQCIBAAhnAIBAJIEACG5AgEAkgQAIboCIACWBAAhAgAAAM4BACAIAADaAQAgCPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIZcCQACJBAAhmwIBAIgEACGcAgEAkgQAIbkCAQCSBAAhugIgAJYEACECAAAAoQEAIAgAANwBACACAAAAoQEAIAgAANwBACADAAAAzgEAIA8AANUBACAQAADaAQAgAQAAAM4BACABAAAAoQEAIAUVAACXBQAgGAAAmQUAIBkAAJgFACCcAgAAjgQAILkCAACOBAAgC_YBAACqAwAw9wEAAOMBABD4AQAAqgMAMPkBAQDzAgAh_AFAAPQCACGIAgEA8wIAIZcCQAD0AgAhmwIBAPMCACGcAgEA-wIAIbkCAQD7AgAhugIgAP8CACEDAAAAoQEAIAMAAOIBADAUAADjAQAgAwAAAKEBACADAADRAQAwBAAAzgEAIAj2AQAAqAMAMPcBAADpAQAQ-AEAAKgDADD5AQEAAAAB_AFAAJIDACGXAkAAkgMAIbECAACpAwAgsgIAAKkDACABAAAA5gEAIAEAAADmAQAgCPYBAACoAwAw9wEAAOkBABD4AQAAqAMAMPkBAQCMAwAh_AFAAJIDACGXAkAAkgMAIbECAACpAwAgsgIAAKkDACAAAwAAAOkBACADAADqAQAwBAAA5gEAIAMAAADpAQAgAwAA6gEAMAQAAOYBACADAAAA6QEAIAMAAOoBADAEAADmAQAgBfkBAQAAAAH8AUAAAAABlwJAAAAAAbECgAAAAAGyAoAAAAABAQgAAO4BACAF-QEBAAAAAfwBQAAAAAGXAkAAAAABsQKAAAAAAbICgAAAAAEBCAAA8AEAMAEIAADwAQAwBfkBAQCIBAAh_AFAAIkEACGXAkAAiQQAIbECgAAAAAGyAoAAAAABAgAAAOYBACAIAADzAQAgBfkBAQCIBAAh_AFAAIkEACGXAkAAiQQAIbECgAAAAAGyAoAAAAABAgAAAOkBACAIAAD1AQAgAgAAAOkBACAIAAD1AQAgAwAAAOYBACAPAADuAQAgEAAA8wEAIAEAAADmAQAgAQAAAOkBACADFQAAlAUAIBgAAJYFACAZAACVBQAgCPYBAAClAwAw9wEAAPwBABD4AQAApQMAMPkBAQDzAgAh_AFAAPQCACGXAkAA9AIAIbECAACmAwAgsgIAAKYDACADAAAA6QEAIAMAAPsBADAUAAD8AQAgAwAAAOkBACADAADqAQAwBAAA5gEAIAEAAACbAQAgAQAAAJsBACADAAAAmQEAIAMAAJoBADAEAACbAQAgAwAAAJkBACADAACaAQAwBAAAmwEAIAMAAACZAQAgAwAAmgEAMAQAAJsBACANbAAAkwUAIHQAANIEACD5AQEAAAAB-gEBAAAAAfwBQAAAAAGIAgEAAAABiwIBAAAAAZACAAAArwICkQIBAAAAAZcCQAAAAAGtAggAAAABrwIgAAAAAbACCAAAAAEBCAAAhAIAIAv5AQEAAAAB-gEBAAAAAfwBQAAAAAGIAgEAAAABiwIBAAAAAZACAAAArwICkQIBAAAAAZcCQAAAAAGtAggAAAABrwIgAAAAAbACCAAAAAEBCAAAhgIAMAEIAACGAgAwDWwAAJIFACB0AADCBAAg-QEBAIgEACH6AQEAiAQAIfwBQACJBAAhiAIBAIgEACGLAgEAiAQAIZACAADABK8CIpECAQCIBAAhlwJAAIkEACGtAggAvwQAIa8CIACWBAAhsAIIAL8EACECAAAAmwEAIAgAAIkCACAL-QEBAIgEACH6AQEAiAQAIfwBQACJBAAhiAIBAIgEACGLAgEAiAQAIZACAADABK8CIpECAQCIBAAhlwJAAIkEACGtAggAvwQAIa8CIACWBAAhsAIIAL8EACECAAAAmQEAIAgAAIsCACACAAAAmQEAIAgAAIsCACADAAAAmwEAIA8AAIQCACAQAACJAgAgAQAAAJsBACABAAAAmQEAIAUVAACNBQAgFgAAjgUAIBcAAJEFACAYAACQBQAgGQAAjwUAIA72AQAAoQMAMPcBAACSAgAQ-AEAAKEDADD5AQEA8wIAIfoBAQDzAgAh_AFAAPQCACGIAgEA8wIAIYsCAQDzAgAhkAIAAKIDrwIikQIBAPMCACGXAkAA9AIAIa0CCACXAwAhrwIgAP8CACGwAggAlwMAIQMAAACZAQAgAwAAkQIAMBQAAJICACADAAAAmQEAIAMAAJoBADAEAACbAQAgAQAAAJ8BACABAAAAnwEAIAMAAACdAQAgAwAAngEAMAQAAJ8BACADAAAAnQEAIAMAAJ4BADAEAACfAQAgAwAAAJ0BACADAACeAQAwBAAAnwEAIAptAACCBQAgcgAA0AQAIPkBAQAAAAH7AQEAAAAB_AFAAAAAAYgCAQAAAAGXAkAAAAABnQIIAAAAAasCAQAAAAGsAgIAAAABAQgAAJoCACAI-QEBAAAAAfsBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGdAggAAAABqwIBAAAAAawCAgAAAAEBCAAAnAIAMAEIAACcAgAwCm0AAIAFACByAADOBAAg-QEBAIgEACH7AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZ0CCAC_BAAhqwIBAIgEACGsAgIAsAQAIQIAAACfAQAgCAAAnwIAIAj5AQEAiAQAIfsBAQCIBAAh_AFAAIkEACGIAgEAiAQAIZcCQACJBAAhnQIIAL8EACGrAgEAiAQAIawCAgCwBAAhAgAAAJ0BACAIAAChAgAgAgAAAJ0BACAIAAChAgAgAwAAAJ8BACAPAACaAgAgEAAAnwIAIAEAAACfAQAgAQAAAJ0BACAFFQAAiAUAIBYAAIkFACAXAACMBQAgGAAAiwUAIBkAAIoFACAL9gEAAKADADD3AQAAqAIAEPgBAACgAwAw-QEBAPMCACH7AQEA8wIAIfwBQAD0AgAhiAIBAPMCACGXAkAA9AIAIZ0CCACXAwAhqwIBAPMCACGsAgIAmQMAIQMAAACdAQAgAwAApwIAMBQAAKgCACADAAAAnQEAIAMAAJ4BADAEAACfAQAgAQAAAKUBACABAAAApQEAIAMAAACjAQAgAwAApAEAMAQAAKUBACADAAAAowEAIAMAAKQBADAEAAClAQAgAwAAAKMBACADAACkAQAwBAAApQEAIBVvAACEBQAgcAAAhQUAIHEAAIYFACBzAACHBQAg-QEBAAAAAfwBQAAAAAGIAgEAAAABlwJAAAAAAZsCAQAAAAGcAgEAAAABnQIIAAAAAZ4CCAAAAAGfAgIAAAABoAIBAAAAAaECAACDBQAgogIBAAAAAaMCAQAAAAGkAggAAAABpQICAAAAAaYCIAAAAAGnAiAAAAABAQgAALACACAR-QEBAAAAAfwBQAAAAAGIAgEAAAABlwJAAAAAAZsCAQAAAAGcAgEAAAABnQIIAAAAAZ4CCAAAAAGfAgIAAAABoAIBAAAAAaECAACDBQAgogIBAAAAAaMCAQAAAAGkAggAAAABpQICAAAAAaYCIAAAAAGnAiAAAAABAQgAALICADABCAAAsgIAMAEAAAChAQAgFW8AAOAEACBwAADhBAAgcQAA4gQAIHMAAOMEACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZsCAQCIBAAhnAIBAJIEACGdAggAvwQAIZ4CCADeBAAhnwICALAEACGgAgEAiAQAIaECAADfBAAgogIBAJIEACGjAgEAkgQAIaQCCAC_BAAhpQICALAEACGmAiAAlgQAIacCIACWBAAhAgAAAKUBACAIAAC2AgAgEfkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIZcCQACJBAAhmwIBAIgEACGcAgEAkgQAIZ0CCAC_BAAhngIIAN4EACGfAgIAsAQAIaACAQCIBAAhoQIAAN8EACCiAgEAkgQAIaMCAQCSBAAhpAIIAL8EACGlAgIAsAQAIaYCIACWBAAhpwIgAJYEACECAAAAowEAIAgAALgCACACAAAAowEAIAgAALgCACABAAAAoQEAIAMAAAClAQAgDwAAsAIAIBAAALYCACABAAAApQEAIAEAAACjAQAgCRUAANkEACAWAADaBAAgFwAA3QQAIBgAANwEACAZAADbBAAgnAIAAI4EACCeAgAAjgQAIKICAACOBAAgowIAAI4EACAU9gEAAJYDADD3AQAAwAIAEPgBAACWAwAw-QEBAPMCACH8AUAA9AIAIYgCAQDzAgAhlwJAAPQCACGbAgEA8wIAIZwCAQD7AgAhnQIIAJcDACGeAggAmAMAIZ8CAgCZAwAhoAIBAPMCACGhAgAAmgMAIKICAQD7AgAhowIBAPsCACGkAggAlwMAIaUCAgCZAwAhpgIgAP8CACGnAiAA_wIAIQMAAACjAQAgAwAAvwIAMBQAAMACACADAAAAowEAIAMAAKQBADAEAAClAQAgFnEAAJQDACBzAACVAwAgdQAAkwMAIPYBAACLAwAw9wEAAMYCABD4AQAAiwMAMPkBAQAAAAH8AUAAkgMAIYgCAQCMAwAhiQIBAAAAAYoCAQCMAwAhiwIBAAAAAYwCAQCNAwAhjgIAAI4DjgIikAIAAI8DkAIikQIBAI0DACGSAgEAjQMAIZMCAQCNAwAhlAJAAJADACGVAiAAkQMAIZYCAQCNAwAhlwJAAJIDACEBAAAAwwIAIAEAAADDAgAgFnEAAJQDACBzAACVAwAgdQAAkwMAIPYBAACLAwAw9wEAAMYCABD4AQAAiwMAMPkBAQCMAwAh_AFAAJIDACGIAgEAjAMAIYkCAQCMAwAhigIBAIwDACGLAgEAjQMAIYwCAQCNAwAhjgIAAI4DjgIikAIAAI8DkAIikQIBAI0DACGSAgEAjQMAIZMCAQCNAwAhlAJAAJADACGVAiAAkQMAIZYCAQCNAwAhlwJAAJIDACEKcQAA1wQAIHMAANgEACB1AADWBAAgiwIAAI4EACCMAgAAjgQAIJECAACOBAAgkgIAAI4EACCTAgAAjgQAIJQCAACOBAAglgIAAI4EACADAAAAxgIAIAMAAMcCADAEAADDAgAgAwAAAMYCACADAADHAgAwBAAAwwIAIAMAAADGAgAgAwAAxwIAMAQAAMMCACATcQAA1AQAIHMAANUEACB1AADTBAAg-QEBAAAAAfwBQAAAAAGIAgEAAAABiQIBAAAAAYoCAQAAAAGLAgEAAAABjAIBAAAAAY4CAAAAjgICkAIAAACQAgKRAgEAAAABkgIBAAAAAZMCAQAAAAGUAkAAAAABlQIgAAAAAZYCAQAAAAGXAkAAAAABAQgAAMsCACAQ-QEBAAAAAfwBQAAAAAGIAgEAAAABiQIBAAAAAYoCAQAAAAGLAgEAAAABjAIBAAAAAY4CAAAAjgICkAIAAACQAgKRAgEAAAABkgIBAAAAAZMCAQAAAAGUAkAAAAABlQIgAAAAAZYCAQAAAAGXAkAAAAABAQgAAM0CADABCAAAzQIAMBNxAACYBAAgcwAAmQQAIHUAAJcEACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGJAgEAiAQAIYoCAQCIBAAhiwIBAJIEACGMAgEAkgQAIY4CAACTBI4CIpACAACUBJACIpECAQCSBAAhkgIBAJIEACGTAgEAkgQAIZQCQACVBAAhlQIgAJYEACGWAgEAkgQAIZcCQACJBAAhAgAAAMMCACAIAADQAgAgEPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIYkCAQCIBAAhigIBAIgEACGLAgEAkgQAIYwCAQCSBAAhjgIAAJMEjgIikAIAAJQEkAIikQIBAJIEACGSAgEAkgQAIZMCAQCSBAAhlAJAAJUEACGVAiAAlgQAIZYCAQCSBAAhlwJAAIkEACECAAAAxgIAIAgAANICACACAAAAxgIAIAgAANICACADAAAAwwIAIA8AAMsCACAQAADQAgAgAQAAAMMCACABAAAAxgIAIAoVAACPBAAgGAAAkQQAIBkAAJAEACCLAgAAjgQAIIwCAACOBAAgkQIAAI4EACCSAgAAjgQAIJMCAACOBAAglAIAAI4EACCWAgAAjgQAIBP2AQAA-gIAMPcBAADZAgAQ-AEAAPoCADD5AQEA8wIAIfwBQAD0AgAhiAIBAPMCACGJAgEA8wIAIYoCAQDzAgAhiwIBAPsCACGMAgEA-wIAIY4CAAD8Ao4CIpACAAD9ApACIpECAQD7AgAhkgIBAPsCACGTAgEA-wIAIZQCQAD-AgAhlQIgAP8CACGWAgEA-wIAIZcCQAD0AgAhAwAAAMYCACADAADYAgAwFAAA2QIAIAMAAADGAgAgAwAAxwIAMAQAAMMCACABAAAArgEAIAEAAACuAQAgAwAAAKwBACADAACtAQAwBAAArgEAIAMAAACsAQAgAwAArQEAMAQAAK4BACADAAAArAEAIAMAAK0BADAEAACuAQAgBmwAAIwEACByAACNBAAg-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AFAAAAAAQEIAADhAgAgBPkBAQAAAAH6AQEAAAAB-wEBAAAAAfwBQAAAAAEBCAAA4wIAMAEIAADjAgAwBmwAAIoEACByAACLBAAg-QEBAIgEACH6AQEAiAQAIfsBAQCIBAAh_AFAAIkEACECAAAArgEAIAgAAOYCACAE-QEBAIgEACH6AQEAiAQAIfsBAQCIBAAh_AFAAIkEACECAAAArAEAIAgAAOgCACACAAAArAEAIAgAAOgCACADAAAArgEAIA8AAOECACAQAADmAgAgAQAAAK4BACABAAAArAEAIAMVAACFBAAgGAAAhwQAIBkAAIYEACAH9gEAAPICADD3AQAA7wIAEPgBAADyAgAw-QEBAPMCACH6AQEA8wIAIfsBAQDzAgAh_AFAAPQCACEDAAAArAEAIAMAAO4CADAUAADvAgAgAwAAAKwBACADAACtAQAwBAAArgEAIAf2AQAA8gIAMPcBAADvAgAQ-AEAAPICADD5AQEA8wIAIfoBAQDzAgAh-wEBAPMCACH8AUAA9AIAIQ4VAAD2AgAgGAAA-QIAIBkAAPkCACD9AQEAAAAB_gEBAAAABP8BAQAAAASAAgEAAAABgQIBAAAAAYICAQAAAAGDAgEAAAABhAIBAPgCACGFAgEAAAABhgIBAAAAAYcCAQAAAAELFQAA9gIAIBgAAPcCACAZAAD3AgAg_QFAAAAAAf4BQAAAAAT_AUAAAAAEgAJAAAAAAYECQAAAAAGCAkAAAAABgwJAAAAAAYQCQAD1AgAhCxUAAPYCACAYAAD3AgAgGQAA9wIAIP0BQAAAAAH-AUAAAAAE_wFAAAAABIACQAAAAAGBAkAAAAABggJAAAAAAYMCQAAAAAGEAkAA9QIAIQj9AQIAAAAB_gECAAAABP8BAgAAAASAAgIAAAABgQICAAAAAYICAgAAAAGDAgIAAAABhAICAPYCACEI_QFAAAAAAf4BQAAAAAT_AUAAAAAEgAJAAAAAAYECQAAAAAGCAkAAAAABgwJAAAAAAYQCQAD3AgAhDhUAAPYCACAYAAD5AgAgGQAA-QIAIP0BAQAAAAH-AQEAAAAE_wEBAAAABIACAQAAAAGBAgEAAAABggIBAAAAAYMCAQAAAAGEAgEA-AIAIYUCAQAAAAGGAgEAAAABhwIBAAAAAQv9AQEAAAAB_gEBAAAABP8BAQAAAASAAgEAAAABgQIBAAAAAYICAQAAAAGDAgEAAAABhAIBAPkCACGFAgEAAAABhgIBAAAAAYcCAQAAAAET9gEAAPoCADD3AQAA2QIAEPgBAAD6AgAw-QEBAPMCACH8AUAA9AIAIYgCAQDzAgAhiQIBAPMCACGKAgEA8wIAIYsCAQD7AgAhjAIBAPsCACGOAgAA_AKOAiKQAgAA_QKQAiKRAgEA-wIAIZICAQD7AgAhkwIBAPsCACGUAkAA_gIAIZUCIAD_AgAhlgIBAPsCACGXAkAA9AIAIQ4VAACDAwAgGAAAigMAIBkAAIoDACD9AQEAAAAB_gEBAAAABf8BAQAAAAWAAgEAAAABgQIBAAAAAYICAQAAAAGDAgEAAAABhAIBAIkDACGFAgEAAAABhgIBAAAAAYcCAQAAAAEHFQAA9gIAIBgAAIgDACAZAACIAwAg_QEAAACOAgL-AQAAAI4CCP8BAAAAjgIIhAIAAIcDjgIiBxUAAPYCACAYAACGAwAgGQAAhgMAIP0BAAAAkAIC_gEAAACQAgj_AQAAAJACCIQCAACFA5ACIgsVAACDAwAgGAAAhAMAIBkAAIQDACD9AUAAAAAB_gFAAAAABf8BQAAAAAWAAkAAAAABgQJAAAAAAYICQAAAAAGDAkAAAAABhAJAAIIDACEFFQAA9gIAIBgAAIEDACAZAACBAwAg_QEgAAAAAYQCIACAAwAhBRUAAPYCACAYAACBAwAgGQAAgQMAIP0BIAAAAAGEAiAAgAMAIQL9ASAAAAABhAIgAIEDACELFQAAgwMAIBgAAIQDACAZAACEAwAg_QFAAAAAAf4BQAAAAAX_AUAAAAAFgAJAAAAAAYECQAAAAAGCAkAAAAABgwJAAAAAAYQCQACCAwAhCP0BAgAAAAH-AQIAAAAF_wECAAAABYACAgAAAAGBAgIAAAABggICAAAAAYMCAgAAAAGEAgIAgwMAIQj9AUAAAAAB_gFAAAAABf8BQAAAAAWAAkAAAAABgQJAAAAAAYICQAAAAAGDAkAAAAABhAJAAIQDACEHFQAA9gIAIBgAAIYDACAZAACGAwAg_QEAAACQAgL-AQAAAJACCP8BAAAAkAIIhAIAAIUDkAIiBP0BAAAAkAIC_gEAAACQAgj_AQAAAJACCIQCAACGA5ACIgcVAAD2AgAgGAAAiAMAIBkAAIgDACD9AQAAAI4CAv4BAAAAjgII_wEAAACOAgiEAgAAhwOOAiIE_QEAAACOAgL-AQAAAI4CCP8BAAAAjgIIhAIAAIgDjgIiDhUAAIMDACAYAACKAwAgGQAAigMAIP0BAQAAAAH-AQEAAAAF_wEBAAAABYACAQAAAAGBAgEAAAABggIBAAAAAYMCAQAAAAGEAgEAiQMAIYUCAQAAAAGGAgEAAAABhwIBAAAAAQv9AQEAAAAB_gEBAAAABf8BAQAAAAWAAgEAAAABgQIBAAAAAYICAQAAAAGDAgEAAAABhAIBAIoDACGFAgEAAAABhgIBAAAAAYcCAQAAAAEWcQAAlAMAIHMAAJUDACB1AACTAwAg9gEAAIsDADD3AQAAxgIAEPgBAACLAwAw-QEBAIwDACH8AUAAkgMAIYgCAQCMAwAhiQIBAIwDACGKAgEAjAMAIYsCAQCNAwAhjAIBAI0DACGOAgAAjgOOAiKQAgAAjwOQAiKRAgEAjQMAIZICAQCNAwAhkwIBAI0DACGUAkAAkAMAIZUCIACRAwAhlgIBAI0DACGXAkAAkgMAIQv9AQEAAAAB_gEBAAAABP8BAQAAAASAAgEAAAABgQIBAAAAAYICAQAAAAGDAgEAAAABhAIBAPkCACGFAgEAAAABhgIBAAAAAYcCAQAAAAEL_QEBAAAAAf4BAQAAAAX_AQEAAAAFgAIBAAAAAYECAQAAAAGCAgEAAAABgwIBAAAAAYQCAQCKAwAhhQIBAAAAAYYCAQAAAAGHAgEAAAABBP0BAAAAjgIC_gEAAACOAgj_AQAAAI4CCIQCAACIA44CIgT9AQAAAJACAv4BAAAAkAII_wEAAACQAgiEAgAAhgOQAiII_QFAAAAAAf4BQAAAAAX_AUAAAAAFgAJAAAAAAYECQAAAAAGCAkAAAAABgwJAAAAAAYQCQACEAwAhAv0BIAAAAAGEAiAAgQMAIQj9AUAAAAAB_gFAAAAABP8BQAAAAASAAkAAAAABgQJAAAAAAYICQAAAAAGDAkAAAAABhAJAAPcCACEDmAIAAJkBACCZAgAAmQEAIJoCAACZAQAgA5gCAACpAQAgmQIAAKkBACCaAgAAqQEAIAOYAgAArAEAIJkCAACsAQAgmgIAAKwBACAU9gEAAJYDADD3AQAAwAIAEPgBAACWAwAw-QEBAPMCACH8AUAA9AIAIYgCAQDzAgAhlwJAAPQCACGbAgEA8wIAIZwCAQD7AgAhnQIIAJcDACGeAggAmAMAIZ8CAgCZAwAhoAIBAPMCACGhAgAAmgMAIKICAQD7AgAhowIBAPsCACGkAggAlwMAIaUCAgCZAwAhpgIgAP8CACGnAiAA_wIAIQ0VAAD2AgAgFgAAnAMAIBcAAJwDACAYAACcAwAgGQAAnAMAIP0BCAAAAAH-AQgAAAAE_wEIAAAABIACCAAAAAGBAggAAAABggIIAAAAAYMCCAAAAAGEAggAnwMAIQ0VAACDAwAgFgAAngMAIBcAAJ4DACAYAACeAwAgGQAAngMAIP0BCAAAAAH-AQgAAAAF_wEIAAAABYACCAAAAAGBAggAAAABggIIAAAAAYMCCAAAAAGEAggAnQMAIQ0VAAD2AgAgFgAAnAMAIBcAAPYCACAYAAD2AgAgGQAA9gIAIP0BAgAAAAH-AQIAAAAE_wECAAAABIACAgAAAAGBAgIAAAABggICAAAAAYMCAgAAAAGEAgIAmwMAIQT9AQEAAAAFqAIBAAAAAakCAQAAAASqAgEAAAAEDRUAAPYCACAWAACcAwAgFwAA9gIAIBgAAPYCACAZAAD2AgAg_QECAAAAAf4BAgAAAAT_AQIAAAAEgAICAAAAAYECAgAAAAGCAgIAAAABgwICAAAAAYQCAgCbAwAhCP0BCAAAAAH-AQgAAAAE_wEIAAAABIACCAAAAAGBAggAAAABggIIAAAAAYMCCAAAAAGEAggAnAMAIQ0VAACDAwAgFgAAngMAIBcAAJ4DACAYAACeAwAgGQAAngMAIP0BCAAAAAH-AQgAAAAF_wEIAAAABYACCAAAAAGBAggAAAABggIIAAAAAYMCCAAAAAGEAggAnQMAIQj9AQgAAAAB_gEIAAAABf8BCAAAAAWAAggAAAABgQIIAAAAAYICCAAAAAGDAggAAAABhAIIAJ4DACENFQAA9gIAIBYAAJwDACAXAACcAwAgGAAAnAMAIBkAAJwDACD9AQgAAAAB_gEIAAAABP8BCAAAAASAAggAAAABgQIIAAAAAYICCAAAAAGDAggAAAABhAIIAJ8DACEL9gEAAKADADD3AQAAqAIAEPgBAACgAwAw-QEBAPMCACH7AQEA8wIAIfwBQAD0AgAhiAIBAPMCACGXAkAA9AIAIZ0CCACXAwAhqwIBAPMCACGsAgIAmQMAIQ72AQAAoQMAMPcBAACSAgAQ-AEAAKEDADD5AQEA8wIAIfoBAQDzAgAh_AFAAPQCACGIAgEA8wIAIYsCAQDzAgAhkAIAAKIDrwIikQIBAPMCACGXAkAA9AIAIa0CCACXAwAhrwIgAP8CACGwAggAlwMAIQcVAAD2AgAgGAAApAMAIBkAAKQDACD9AQAAAK8CAv4BAAAArwII_wEAAACvAgiEAgAAowOvAiIHFQAA9gIAIBgAAKQDACAZAACkAwAg_QEAAACvAgL-AQAAAK8CCP8BAAAArwIIhAIAAKMDrwIiBP0BAAAArwIC_gEAAACvAgj_AQAAAK8CCIQCAACkA68CIgj2AQAApQMAMPcBAAD8AQAQ-AEAAKUDADD5AQEA8wIAIfwBQAD0AgAhlwJAAPQCACGxAgAApgMAILICAACmAwAgDxUAAPYCACAYAACnAwAgGQAApwMAIP0BgAAAAAGAAoAAAAABgQKAAAAAAYICgAAAAAGDAoAAAAABhAKAAAAAAbMCAQAAAAG0AgEAAAABtQIBAAAAAbYCgAAAAAG3AoAAAAABuAKAAAAAAQz9AYAAAAABgAKAAAAAAYECgAAAAAGCAoAAAAABgwKAAAAAAYQCgAAAAAGzAgEAAAABtAIBAAAAAbUCAQAAAAG2AoAAAAABtwKAAAAAAbgCgAAAAAEI9gEAAKgDADD3AQAA6QEAEPgBAACoAwAw-QEBAIwDACH8AUAAkgMAIZcCQACSAwAhsQIAAKkDACCyAgAAqQMAIAz9AYAAAAABgAKAAAAAAYECgAAAAAGCAoAAAAABgwKAAAAAAYQCgAAAAAGzAgEAAAABtAIBAAAAAbUCAQAAAAG2AoAAAAABtwKAAAAAAbgCgAAAAAEL9gEAAKoDADD3AQAA4wEAEPgBAACqAwAw-QEBAPMCACH8AUAA9AIAIYgCAQDzAgAhlwJAAPQCACGbAgEA8wIAIZwCAQD7AgAhuQIBAPsCACG6AiAA_wIAIQxuAACsAwAg9gEAAKsDADD3AQAAoQEAEPgBAACrAwAw-QEBAIwDACH8AUAAkgMAIYgCAQCMAwAhlwJAAJIDACGbAgEAjAMAIZwCAQCNAwAhuQIBAI0DACG6AiAAkQMAIQOYAgAAowEAIJkCAACjAQAgmgIAAKMBACAJ9gEAAK0DADD3AQAAywEAEPgBAACtAwAw-QEBAPMCACH6AQEA8wIAIfsBAQDzAgAh_AFAAPQCACGXAkAA9AIAIawCAgCZAwAhAvoBAQAAAAH7AQEAAAABCWwAALADACByAACxAwAg9gEAAK8DADD3AQAArAEAEPgBAACvAwAw-QEBAIwDACH6AQEAjAMAIfsBAQCMAwAh_AFAAJIDACEYcQAAlAMAIHMAAJUDACB1AACTAwAg9gEAAIsDADD3AQAAxgIAEPgBAACLAwAw-QEBAIwDACH8AUAAkgMAIYgCAQCMAwAhiQIBAIwDACGKAgEAjAMAIYsCAQCNAwAhjAIBAI0DACGOAgAAjgOOAiKQAgAAjwOQAiKRAgEAjQMAIZICAQCNAwAhkwIBAI0DACGUAkAAkAMAIZUCIACRAwAhlgIBAI0DACGXAkAAkgMAIesCAADGAgAg7AIAAMYCACAabwAAtwMAIHAAALgDACBxAACUAwAgcwAAlQMAIPYBAAC0AwAw9wEAAKMBABD4AQAAtAMAMPkBAQCMAwAh_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhmwIBAIwDACGcAgEAjQMAIZ0CCAC1AwAhngIIALYDACGfAgIAswMAIaACAQCMAwAhoQIAAJoDACCiAgEAjQMAIaMCAQCNAwAhpAIIALUDACGlAgIAswMAIaYCIACRAwAhpwIgAJEDACHrAgAAowEAIOwCAACjAQAgC2wAALADACByAACxAwAg9gEAALIDADD3AQAAqQEAEPgBAACyAwAw-QEBAIwDACH6AQEAjAMAIfsBAQCMAwAh_AFAAJIDACGXAkAAkgMAIawCAgCzAwAhCP0BAgAAAAH-AQIAAAAE_wECAAAABIACAgAAAAGBAgIAAAABggICAAAAAYMCAgAAAAGEAgIA9gIAIRhvAAC3AwAgcAAAuAMAIHEAAJQDACBzAACVAwAg9gEAALQDADD3AQAAowEAEPgBAAC0AwAw-QEBAIwDACH8AUAAkgMAIYgCAQCMAwAhlwJAAJIDACGbAgEAjAMAIZwCAQCNAwAhnQIIALUDACGeAggAtgMAIZ8CAgCzAwAhoAIBAIwDACGhAgAAmgMAIKICAQCNAwAhowIBAI0DACGkAggAtQMAIaUCAgCzAwAhpgIgAJEDACGnAiAAkQMAIQj9AQgAAAAB_gEIAAAABP8BCAAAAASAAggAAAABgQIIAAAAAYICCAAAAAGDAggAAAABhAIIAJwDACEI_QEIAAAAAf4BCAAAAAX_AQgAAAAFgAIIAAAAAYECCAAAAAGCAggAAAABgwIIAAAAAYQCCACeAwAhDm4AAKwDACD2AQAAqwMAMPcBAAChAQAQ-AEAAKsDADD5AQEAjAMAIfwBQACSAwAhiAIBAIwDACGXAkAAkgMAIZsCAQCMAwAhnAIBAI0DACG5AgEAjQMAIboCIACRAwAh6wIAAKEBACDsAgAAoQEAIAOYAgAAnQEAIJkCAACdAQAgmgIAAJ0BACANbQAAugMAIHIAALEDACD2AQAAuQMAMPcBAACdAQAQ-AEAALkDADD5AQEAjAMAIfsBAQCMAwAh_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhnQIIALUDACGrAgEAjAMAIawCAgCzAwAhEmwAALADACB0AAC4AwAg9gEAALsDADD3AQAAmQEAEPgBAAC7AwAw-QEBAIwDACH6AQEAjAMAIfwBQACSAwAhiAIBAIwDACGLAgEAjAMAIZACAAC8A68CIpECAQCMAwAhlwJAAJIDACGtAggAtQMAIa8CIACRAwAhsAIIALUDACHrAgAAmQEAIOwCAACZAQAgEGwAALADACB0AAC4AwAg9gEAALsDADD3AQAAmQEAEPgBAAC7AwAw-QEBAIwDACH6AQEAjAMAIfwBQACSAwAhiAIBAIwDACGLAgEAjAMAIZACAAC8A68CIpECAQCMAwAhlwJAAJIDACGtAggAtQMAIa8CIACRAwAhsAIIALUDACEE_QEAAACvAgL-AQAAAK8CCP8BAAAArwIIhAIAAKQDrwIiAvoBAQAAAAH7AQEAAAABF_YBAAC-AwAw9wEAAJQBABD4AQAAvgMAMPkBAQDzAgAh_AFAAPQCACGQAgAAwAO_AiKXAkAA9AIAIZwCAQD7AgAhrAICAJkDACG8AkAA9AIAIb0CEAC_AwAhvwIBAPMCACHAAhAAvwMAIcECEAC_AwAhwgIQAL8DACHDAhAAvwMAIcQCEAC_AwAhxQIBAPsCACHGAgEA-wIAIccCEAC_AwAhyAIQAL8DACHJAhAAvwMAIcoCEAC_AwAhDRUAAPYCACAWAADEAwAgFwAAxAMAIBgAAMQDACAZAADEAwAg_QEQAAAAAf4BEAAAAAT_ARAAAAAEgAIQAAAAAYECEAAAAAGCAhAAAAABgwIQAAAAAYQCEADDAwAhBxUAAPYCACAYAADCAwAgGQAAwgMAIP0BAAAAvwIC_gEAAAC_Agj_AQAAAL8CCIQCAADBA78CIgcVAAD2AgAgGAAAwgMAIBkAAMIDACD9AQAAAL8CAv4BAAAAvwII_wEAAAC_AgiEAgAAwQO_AiIE_QEAAAC_AgL-AQAAAL8CCP8BAAAAvwIIhAIAAMIDvwIiDRUAAPYCACAWAADEAwAgFwAAxAMAIBgAAMQDACAZAADEAwAg_QEQAAAAAf4BEAAAAAT_ARAAAAAEgAIQAAAAAYECEAAAAAGCAhAAAAABgwIQAAAAAYQCEADDAwAhCP0BEAAAAAH-ARAAAAAE_wEQAAAABIACEAAAAAGBAhAAAAABggIQAAAAAYMCEAAAAAGEAhAAxAMAIRf2AQAAxQMAMPcBAACBAQAQ-AEAAMUDADD5AQEAjAMAIfwBQACSAwAhkAIAAMcDvwIilwJAAJIDACGcAgEAjQMAIawCAgCzAwAhvAJAAJIDACG9AhAAxgMAIb8CAQCMAwAhwAIQAMYDACHBAhAAxgMAIcICEADGAwAhwwIQAMYDACHEAhAAxgMAIcUCAQCNAwAhxgIBAI0DACHHAhAAxgMAIcgCEADGAwAhyQIQAMYDACHKAhAAxgMAIQj9ARAAAAAB_gEQAAAABP8BEAAAAASAAhAAAAABgQIQAAAAAYICEAAAAAGDAhAAAAABhAIQAMQDACEE_QEAAAC_AgL-AQAAAL8CCP8BAAAAvwIIhAIAAMIDvwIiDfYBAADIAwAw9wEAAHsAEPgBAADIAwAw-QEBAPMCACH8AUAA9AIAIZACAADJA8wCIpcCQAD0AgAhnAIBAPMCACG8AkAA9AIAIb0CEAC_AwAhzAIBAPMCACHNAgEA8wIAIc8CAADKA88CIgcVAAD2AgAgGAAAzgMAIBkAAM4DACD9AQAAAMwCAv4BAAAAzAII_wEAAADMAgiEAgAAzQPMAiIHFQAA9gIAIBgAAMwDACAZAADMAwAg_QEAAADPAgL-AQAAAM8CCP8BAAAAzwIIhAIAAMsDzwIiBxUAAPYCACAYAADMAwAgGQAAzAMAIP0BAAAAzwIC_gEAAADPAgj_AQAAAM8CCIQCAADLA88CIgT9AQAAAM8CAv4BAAAAzwII_wEAAADPAgiEAgAAzAPPAiIHFQAA9gIAIBgAAM4DACAZAADOAwAg_QEAAADMAgL-AQAAAMwCCP8BAAAAzAIIhAIAAM0DzAIiBP0BAAAAzAIC_gEAAADMAgj_AQAAAMwCCIQCAADOA8wCIg32AQAAzwMAMPcBAABoABD4AQAAzwMAMPkBAQCMAwAh_AFAAJIDACGQAgAA0APMAiKXAkAAkgMAIZwCAQCMAwAhvAJAAJIDACG9AhAAxgMAIcwCAQCMAwAhzQIBAIwDACHPAgAA0QPPAiIE_QEAAADMAgL-AQAAAMwCCP8BAAAAzAIIhAIAAM4DzAIiBP0BAAAAzwIC_gEAAADPAgj_AQAAAM8CCIQCAADMA88CIhT2AQAA0gMAMPcBAABiABD4AQAA0gMAMPkBAQDzAgAh_AFAAPQCACGQAgAA0wPRAiKXAkAA9AIAIZwCAQD7AgAhrAICAJkDACG8AkAA9AIAIb0CEAC_AwAhvwIBAPMCACHCAhAAvwMAIdECAQDzAgAh0gIQAL8DACHTAhAAvwMAIdQCAADTA9ECItYCAADUA9YCItcCQAD-AgAh2AIBAPsCACEHFQAA9gIAIBgAANgDACAZAADYAwAg_QEAAADRAgL-AQAAANECCP8BAAAA0QIIhAIAANcD0QIiBxUAAPYCACAYAADWAwAgGQAA1gMAIP0BAAAA1gIC_gEAAADWAgj_AQAAANYCCIQCAADVA9YCIgcVAAD2AgAgGAAA1gMAIBkAANYDACD9AQAAANYCAv4BAAAA1gII_wEAAADWAgiEAgAA1QPWAiIE_QEAAADWAgL-AQAAANYCCP8BAAAA1gIIhAIAANYD1gIiBxUAAPYCACAYAADYAwAgGQAA2AMAIP0BAAAA0QIC_gEAAADRAgj_AQAAANECCIQCAADXA9ECIgT9AQAAANECAv4BAAAA0QII_wEAAADRAgiEAgAA2APRAiIU9gEAANkDADD3AQAATwAQ-AEAANkDADD5AQEAjAMAIfwBQACSAwAhkAIAANoD0QIilwJAAJIDACGcAgEAjQMAIawCAgCzAwAhvAJAAJIDACG9AhAAxgMAIb8CAQCMAwAhwgIQAMYDACHRAgEAjAMAIdICEADGAwAh0wIQAMYDACHUAgAA2gPRAiLWAgAA2wPWAiLXAkAAkAMAIdgCAQCNAwAhBP0BAAAA0QIC_gEAAADRAgj_AQAAANECCIQCAADYA9ECIgT9AQAAANYCAv4BAAAA1gII_wEAAADWAgiEAgAA1gPWAiIS9gEAANwDADD3AQAASQAQ-AEAANwDADD5AQEA8wIAIfwBQAD0AgAhkAIAAN0D2gIilwJAAPQCACGcAgEA8wIAIawCAgDfAwAhvAJAAPQCACG9AhAAvwMAIcACEADgAwAhzwIAAOED3wIi0wIQAOADACHbAgAA3gPbAiLcAgEA-wIAId0CAQD7AgAh4AIAAOID4AIiBxUAAPYCACAYAADtAwAgGQAA7QMAIP0BAAAA2gIC_gEAAADaAgj_AQAAANoCCIQCAADsA9oCIgcVAAD2AgAgGAAA6wMAIBkAAOsDACD9AQAAANsCAv4BAAAA2wII_wEAAADbAgiEAgAA6gPbAiINFQAAgwMAIBYAAJ4DACAXAACDAwAgGAAAgwMAIBkAAIMDACD9AQIAAAAB_gECAAAABf8BAgAAAAWAAgIAAAABgQICAAAAAYICAgAAAAGDAgIAAAABhAICAOkDACENFQAAgwMAIBYAAOgDACAXAADoAwAgGAAA6AMAIBkAAOgDACD9ARAAAAAB_gEQAAAABf8BEAAAAAWAAhAAAAABgQIQAAAAAYICEAAAAAGDAhAAAAABhAIQAOcDACEHFQAA9gIAIBgAAOYDACAZAADmAwAg_QEAAADfAgL-AQAAAN8CCP8BAAAA3wIIhAIAAOUD3wIiBxUAAPYCACAYAADkAwAgGQAA5AMAIP0BAAAA4AIC_gEAAADgAgj_AQAAAOACCIQCAADjA-ACIgcVAAD2AgAgGAAA5AMAIBkAAOQDACD9AQAAAOACAv4BAAAA4AII_wEAAADgAgiEAgAA4wPgAiIE_QEAAADgAgL-AQAAAOACCP8BAAAA4AIIhAIAAOQD4AIiBxUAAPYCACAYAADmAwAgGQAA5gMAIP0BAAAA3wIC_gEAAADfAgj_AQAAAN8CCIQCAADlA98CIgT9AQAAAN8CAv4BAAAA3wII_wEAAADfAgiEAgAA5gPfAiINFQAAgwMAIBYAAOgDACAXAADoAwAgGAAA6AMAIBkAAOgDACD9ARAAAAAB_gEQAAAABf8BEAAAAAWAAhAAAAABgQIQAAAAAYICEAAAAAGDAhAAAAABhAIQAOcDACEI_QEQAAAAAf4BEAAAAAX_ARAAAAAFgAIQAAAAAYECEAAAAAGCAhAAAAABgwIQAAAAAYQCEADoAwAhDRUAAIMDACAWAACeAwAgFwAAgwMAIBgAAIMDACAZAACDAwAg_QECAAAAAf4BAgAAAAX_AQIAAAAFgAICAAAAAYECAgAAAAGCAgIAAAABgwICAAAAAYQCAgDpAwAhBxUAAPYCACAYAADrAwAgGQAA6wMAIP0BAAAA2wIC_gEAAADbAgj_AQAAANsCCIQCAADqA9sCIgT9AQAAANsCAv4BAAAA2wII_wEAAADbAgiEAgAA6wPbAiIHFQAA9gIAIBgAAO0DACAZAADtAwAg_QEAAADaAgL-AQAAANoCCP8BAAAA2gIIhAIAAOwD2gIiBP0BAAAA2gIC_gEAAADaAgj_AQAAANoCCIQCAADtA9oCIhL2AQAA7gMAMPcBAAA2ABD4AQAA7gMAMPkBAQCMAwAh_AFAAJIDACGQAgAA7wPaAiKXAkAAkgMAIZwCAQCMAwAhrAICAPEDACG8AkAAkgMAIb0CEADGAwAhwAIQAPIDACHPAgAA8wPfAiLTAhAA8gMAIdsCAADwA9sCItwCAQCNAwAh3QIBAI0DACHgAgAA9APgAiIE_QEAAADaAgL-AQAAANoCCP8BAAAA2gIIhAIAAO0D2gIiBP0BAAAA2wIC_gEAAADbAgj_AQAAANsCCIQCAADrA9sCIgj9AQIAAAAB_gECAAAABf8BAgAAAAWAAgIAAAABgQICAAAAAYICAgAAAAGDAgIAAAABhAICAIMDACEI_QEQAAAAAf4BEAAAAAX_ARAAAAAFgAIQAAAAAYECEAAAAAGCAhAAAAABgwIQAAAAAYQCEADoAwAhBP0BAAAA3wIC_gEAAADfAgj_AQAAAN8CCIQCAADmA98CIgT9AQAAAOACAv4BAAAA4AII_wEAAADgAgiEAgAA5APgAiIK9gEAAPUDADD3AQAAMAAQ-AEAAPUDADD5AQEA8wIAIfwBQAD0AgAhkAIAAPYD4gIilwJAAPQCACGcAgEA8wIAIbwCQAD0AgAhvQIQAL8DACEHFQAA9gIAIBgAAPgDACAZAAD4AwAg_QEAAADiAgL-AQAAAOICCP8BAAAA4gIIhAIAAPcD4gIiBxUAAPYCACAYAAD4AwAgGQAA-AMAIP0BAAAA4gIC_gEAAADiAgj_AQAAAOICCIQCAAD3A-ICIgT9AQAAAOICAv4BAAAA4gII_wEAAADiAgiEAgAA-APiAiIK9gEAAPkDADD3AQAAHQAQ-AEAAPkDADD5AQEAjAMAIfwBQACSAwAhkAIAAPoD4gIilwJAAJIDACGcAgEAjAMAIbwCQACSAwAhvQIQAMYDACEE_QEAAADiAgL-AQAAAOICCP8BAAAA4gIIhAIAAPgD4gIiE_YBAAD7AwAw9wEAABcAEPgBAAD7AwAw-QEBAPMCACH8AUAA9AIAIZACAAD8A-MCIpcCQAD0AgAhnAIBAPMCACG8AkAA9AIAIb0CEAC_AwAh2AIBAPMCACHdAgEA8wIAIeMCEAC_AwAh5AIQAL8DACHlAgEA8wIAIeYCAQDzAgAh6AIAAP0D6AIi6QICAJkDACHqAgEA-wIAIQcVAAD2AgAgGAAAgQQAIBkAAIEEACD9AQAAAOMCAv4BAAAA4wII_wEAAADjAgiEAgAAgATjAiIHFQAA9gIAIBgAAP8DACAZAAD_AwAg_QEAAADoAgL-AQAAAOgCCP8BAAAA6AIIhAIAAP4D6AIiBxUAAPYCACAYAAD_AwAgGQAA_wMAIP0BAAAA6AIC_gEAAADoAgj_AQAAAOgCCIQCAAD-A-gCIgT9AQAAAOgCAv4BAAAA6AII_wEAAADoAgiEAgAA_wPoAiIHFQAA9gIAIBgAAIEEACAZAACBBAAg_QEAAADjAgL-AQAAAOMCCP8BAAAA4wIIhAIAAIAE4wIiBP0BAAAA4wIC_gEAAADjAgj_AQAAAOMCCIQCAACBBOMCIhP2AQAAggQAMPcBAAAEABD4AQAAggQAMPkBAQCMAwAh_AFAAJIDACGQAgAAgwTjAiKXAkAAkgMAIZwCAQCMAwAhvAJAAJIDACG9AhAAxgMAIdgCAQCMAwAh3QIBAIwDACHjAhAAxgMAIeQCEADGAwAh5QIBAIwDACHmAgEAjAMAIegCAACEBOgCIukCAgCzAwAh6gIBAI0DACEE_QEAAADjAgL-AQAAAOMCCP8BAAAA4wIIhAIAAIEE4wIiBP0BAAAA6AIC_gEAAADoAgj_AQAAAOgCCIQCAAD_A-gCIgAAAAHwAgEAAAABAfACQAAAAAEFDwAAiAYAIBAAAI4GACDtAgAAiQYAIO4CAACNBgAg8wIAAMMCACAFDwAAhgYAIBAAAIsGACDtAgAAhwYAIO4CAACKBgAg8wIAAKUBACADDwAAiAYAIO0CAACJBgAg8wIAAMMCACADDwAAhgYAIO0CAACHBgAg8wIAAKUBACAAAAAAAfACAQAAAAEB8AIAAACOAgIB8AIAAACQAgIB8AJAAAAAAQHwAiAAAAABCw8AALUEADAQAAC6BAAw7QIAALYEADDuAgAAtwQAMO8CAAC4BAAg8AIAALkEADDxAgAAuQQAMPICAAC5BAAw8wIAALkEADD0AgAAuwQAMPUCAAC8BAAwCw8AAKYEADAQAACrBAAw7QIAAKcEADDuAgAAqAQAMO8CAACpBAAg8AIAAKoEADDxAgAAqgQAMPICAACqBAAw8wIAAKoEADD0AgAArAQAMPUCAACtBAAwCw8AAJoEADAQAACfBAAw7QIAAJsEADDuAgAAnAQAMO8CAACdBAAg8AIAAJ4EADDxAgAAngQAMPICAACeBAAw8wIAAJ4EADD0AgAAoAQAMPUCAAChBAAwBHIAAI0EACD5AQEAAAAB-wEBAAAAAfwBQAAAAAECAAAArgEAIA8AAKUEACADAAAArgEAIA8AAKUEACAQAACkBAAgAQgAAIUGADAKbAAAsAMAIHIAALEDACD2AQAArwMAMPcBAACsAQAQ-AEAAK8DADD5AQEAAAAB-gEBAIwDACH7AQEAjAMAIfwBQACSAwAhuwIAAK4DACACAAAArgEAIAgAAKQEACACAAAAogQAIAgAAKMEACAH9gEAAKEEADD3AQAAogQAEPgBAAChBAAw-QEBAIwDACH6AQEAjAMAIfsBAQCMAwAh_AFAAJIDACEH9gEAAKEEADD3AQAAogQAEPgBAAChBAAw-QEBAIwDACH6AQEAjAMAIfsBAQCMAwAh_AFAAJIDACED-QEBAIgEACH7AQEAiAQAIfwBQACJBAAhBHIAAIsEACD5AQEAiAQAIfsBAQCIBAAh_AFAAIkEACEEcgAAjQQAIPkBAQAAAAH7AQEAAAAB_AFAAAAAAQZyAAC0BAAg-QEBAAAAAfsBAQAAAAH8AUAAAAABlwJAAAAAAawCAgAAAAECAAAAlwEAIA8AALMEACADAAAAlwEAIA8AALMEACAQAACxBAAgAQgAAIQGADAMbAAAsAMAIHIAALEDACD2AQAAsgMAMPcBAACpAQAQ-AEAALIDADD5AQEAAAAB-gEBAIwDACH7AQEAjAMAIfwBQACSAwAhlwJAAJIDACGsAgIAswMAIbsCAAC9AwAgAgAAAJcBACAIAACxBAAgAgAAAK4EACAIAACvBAAgCfYBAACtBAAw9wEAAK4EABD4AQAArQQAMPkBAQCMAwAh-gEBAIwDACH7AQEAjAMAIfwBQACSAwAhlwJAAJIDACGsAgIAswMAIQn2AQAArQQAMPcBAACuBAAQ-AEAAK0EADD5AQEAjAMAIfoBAQCMAwAh-wEBAIwDACH8AUAAkgMAIZcCQACSAwAhrAICALMDACEF-QEBAIgEACH7AQEAiAQAIfwBQACJBAAhlwJAAIkEACGsAgIAsAQAIQXwAgIAAAAB9gICAAAAAfcCAgAAAAH4AgIAAAAB-QICAAAAAQZyAACyBAAg-QEBAIgEACH7AQEAiAQAIfwBQACJBAAhlwJAAIkEACGsAgIAsAQAIQUPAAD_BQAgEAAAggYAIO0CAACABgAg7gIAAIEGACDzAgAApQEAIAZyAAC0BAAg-QEBAAAAAfsBAQAAAAH8AUAAAAABlwJAAAAAAawCAgAAAAEDDwAA_wUAIO0CAACABgAg8wIAAKUBACALdAAA0gQAIPkBAQAAAAH8AUAAAAABiAIBAAAAAYsCAQAAAAGQAgAAAK8CApECAQAAAAGXAkAAAAABrQIIAAAAAa8CIAAAAAGwAggAAAABAgAAAJsBACAPAADRBAAgAwAAAJsBACAPAADRBAAgEAAAwQQAIAEIAAD-BQAwEGwAALADACB0AAC4AwAg9gEAALsDADD3AQAAmQEAEPgBAAC7AwAw-QEBAAAAAfoBAQCMAwAh_AFAAJIDACGIAgEAjAMAIYsCAQCMAwAhkAIAALwDrwIikQIBAIwDACGXAkAAkgMAIa0CCAC1AwAhrwIgAJEDACGwAggAtQMAIQIAAACbAQAgCAAAwQQAIAIAAAC9BAAgCAAAvgQAIA72AQAAvAQAMPcBAAC9BAAQ-AEAALwEADD5AQEAjAMAIfoBAQCMAwAh_AFAAJIDACGIAgEAjAMAIYsCAQCMAwAhkAIAALwDrwIikQIBAIwDACGXAkAAkgMAIa0CCAC1AwAhrwIgAJEDACGwAggAtQMAIQ72AQAAvAQAMPcBAAC9BAAQ-AEAALwEADD5AQEAjAMAIfoBAQCMAwAh_AFAAJIDACGIAgEAjAMAIYsCAQCMAwAhkAIAALwDrwIikQIBAIwDACGXAkAAkgMAIa0CCAC1AwAhrwIgAJEDACGwAggAtQMAIQr5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGLAgEAiAQAIZACAADABK8CIpECAQCIBAAhlwJAAIkEACGtAggAvwQAIa8CIACWBAAhsAIIAL8EACEF8AIIAAAAAfYCCAAAAAH3AggAAAAB-AIIAAAAAfkCCAAAAAEB8AIAAACvAgILdAAAwgQAIPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIYsCAQCIBAAhkAIAAMAErwIikQIBAIgEACGXAkAAiQQAIa0CCAC_BAAhrwIgAJYEACGwAggAvwQAIQsPAADDBAAwEAAAyAQAMO0CAADEBAAw7gIAAMUEADDvAgAAxgQAIPACAADHBAAw8QIAAMcEADDyAgAAxwQAMPMCAADHBAAw9AIAAMkEADD1AgAAygQAMAhyAADQBAAg-QEBAAAAAfsBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGdAggAAAABrAICAAAAAQIAAACfAQAgDwAAzwQAIAMAAACfAQAgDwAAzwQAIBAAAM0EACABCAAA_QUAMA1tAAC6AwAgcgAAsQMAIPYBAAC5AwAw9wEAAJ0BABD4AQAAuQMAMPkBAQAAAAH7AQEAjAMAIfwBQACSAwAhiAIBAIwDACGXAkAAkgMAIZ0CCAC1AwAhqwIBAIwDACGsAgIAswMAIQIAAACfAQAgCAAAzQQAIAIAAADLBAAgCAAAzAQAIAv2AQAAygQAMPcBAADLBAAQ-AEAAMoEADD5AQEAjAMAIfsBAQCMAwAh_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhnQIIALUDACGrAgEAjAMAIawCAgCzAwAhC_YBAADKBAAw9wEAAMsEABD4AQAAygQAMPkBAQCMAwAh-wEBAIwDACH8AUAAkgMAIYgCAQCMAwAhlwJAAJIDACGdAggAtQMAIasCAQCMAwAhrAICALMDACEH-QEBAIgEACH7AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZ0CCAC_BAAhrAICALAEACEIcgAAzgQAIPkBAQCIBAAh-wEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGdAggAvwQAIawCAgCwBAAhBQ8AAPgFACAQAAD7BQAg7QIAAPkFACDuAgAA-gUAIPMCAAClAQAgCHIAANAEACD5AQEAAAAB-wEBAAAAAfwBQAAAAAGIAgEAAAABlwJAAAAAAZ0CCAAAAAGsAgIAAAABAw8AAPgFACDtAgAA-QUAIPMCAAClAQAgC3QAANIEACD5AQEAAAAB_AFAAAAAAYgCAQAAAAGLAgEAAAABkAIAAACvAgKRAgEAAAABlwJAAAAAAa0CCAAAAAGvAiAAAAABsAIIAAAAAQQPAADDBAAw7QIAAMQEADDvAgAAxgQAIPMCAADHBAAwBA8AALUEADDtAgAAtgQAMO8CAAC4BAAg8wIAALkEADAEDwAApgQAMO0CAACnBAAw7wIAAKkEACDzAgAAqgQAMAQPAACaBAAw7QIAAJsEADDvAgAAnQQAIPMCAACeBAAwAAAAAAAAAAAF8AIIAAAAAfYCCAAAAAH3AggAAAAB-AIIAAAAAfkCCAAAAAEC8AIBAAAABPoCAQAAAAUHDwAA5gUAIBAAAPYFACDtAgAA5wUAIO4CAAD1BQAg8QIAAKEBACDyAgAAoQEAIPMCAADOAQAgCw8AAPgEADAQAAD8BAAw7QIAAPkEADDuAgAA-gQAMO8CAAD7BAAg8AIAAMcEADDxAgAAxwQAMPICAADHBAAw8wIAAMcEADD0AgAA_QQAMPUCAADKBAAwCw8AAO0EADAQAADxBAAw7QIAAO4EADDuAgAA7wQAMO8CAADwBAAg8AIAAKoEADDxAgAAqgQAMPICAACqBAAw8wIAAKoEADD0AgAA8gQAMPUCAACtBAAwCw8AAOQEADAQAADoBAAw7QIAAOUEADDuAgAA5gQAMO8CAADnBAAg8AIAAJ4EADDxAgAAngQAMPICAACeBAAw8wIAAJ4EADD0AgAA6QQAMPUCAAChBAAwBGwAAIwEACD5AQEAAAAB-gEBAAAAAfwBQAAAAAECAAAArgEAIA8AAOwEACADAAAArgEAIA8AAOwEACAQAADrBAAgAQgAAPQFADACAAAArgEAIAgAAOsEACACAAAAogQAIAgAAOoEACAD-QEBAIgEACH6AQEAiAQAIfwBQACJBAAhBGwAAIoEACD5AQEAiAQAIfoBAQCIBAAh_AFAAIkEACEEbAAAjAQAIPkBAQAAAAH6AQEAAAAB_AFAAAAAAQZsAAD3BAAg-QEBAAAAAfoBAQAAAAH8AUAAAAABlwJAAAAAAawCAgAAAAECAAAAlwEAIA8AAPYEACADAAAAlwEAIA8AAPYEACAQAAD0BAAgAQgAAPMFADACAAAAlwEAIAgAAPQEACACAAAArgQAIAgAAPMEACAF-QEBAIgEACH6AQEAiAQAIfwBQACJBAAhlwJAAIkEACGsAgIAsAQAIQZsAAD1BAAg-QEBAIgEACH6AQEAiAQAIfwBQACJBAAhlwJAAIkEACGsAgIAsAQAIQUPAADuBQAgEAAA8QUAIO0CAADvBQAg7gIAAPAFACDzAgAAwwIAIAZsAAD3BAAg-QEBAAAAAfoBAQAAAAH8AUAAAAABlwJAAAAAAawCAgAAAAEDDwAA7gUAIO0CAADvBQAg8wIAAMMCACAIbQAAggUAIPkBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGdAggAAAABqwIBAAAAAawCAgAAAAECAAAAnwEAIA8AAIEFACADAAAAnwEAIA8AAIEFACAQAAD_BAAgAQgAAO0FADACAAAAnwEAIAgAAP8EACACAAAAywQAIAgAAP4EACAH-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGdAggAvwQAIasCAQCIBAAhrAICALAEACEIbQAAgAUAIPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIZcCQACJBAAhnQIIAL8EACGrAgEAiAQAIawCAgCwBAAhBQ8AAOgFACAQAADrBQAg7QIAAOkFACDuAgAA6gUAIPMCAACbAQAgCG0AAIIFACD5AQEAAAAB_AFAAAAAAYgCAQAAAAGXAkAAAAABnQIIAAAAAasCAQAAAAGsAgIAAAABAw8AAOgFACDtAgAA6QUAIPMCAACbAQAgAfACAQAAAAQDDwAA5gUAIO0CAADnBQAg8wIAAM4BACAEDwAA-AQAMO0CAAD5BAAw7wIAAPsEACDzAgAAxwQAMAQPAADtBAAw7QIAAO4EADDvAgAA8AQAIPMCAACqBAAwBA8AAOQEADDtAgAA5QQAMO8CAADnBAAg8wIAAJ4EADAAAAAAAAAAAAAABQ8AAOEFACAQAADkBQAg7QIAAOIFACDuAgAA4wUAIPMCAADDAgAgAw8AAOEFACDtAgAA4gUAIPMCAADDAgAgAAAAAAAACw8AAJsFADAQAACgBQAw7QIAAJwFADDuAgAAnQUAMO8CAACeBQAg8AIAAJ8FADDxAgAAnwUAMPICAACfBQAw8wIAAJ8FADD0AgAAoQUAMPUCAACiBQAwE3AAAIUFACBxAACGBQAgcwAAhwUAIPkBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGbAgEAAAABnAIBAAAAAZ0CCAAAAAGeAggAAAABnwICAAAAAaACAQAAAAGhAgAAgwUAIKICAQAAAAGkAggAAAABpQICAAAAAaYCIAAAAAGnAiAAAAABAgAAAKUBACAPAACmBQAgAwAAAKUBACAPAACmBQAgEAAApQUAIAEIAADgBQAwGG8AALcDACBwAAC4AwAgcQAAlAMAIHMAAJUDACD2AQAAtAMAMPcBAACjAQAQ-AEAALQDADD5AQEAAAAB_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhmwIBAAAAAZwCAQCNAwAhnQIIALUDACGeAggAtgMAIZ8CAgCzAwAhoAIBAIwDACGhAgAAmgMAIKICAQCNAwAhowIBAI0DACGkAggAtQMAIaUCAgCzAwAhpgIgAJEDACGnAiAAkQMAIQIAAAClAQAgCAAApQUAIAIAAACjBQAgCAAApAUAIBT2AQAAogUAMPcBAACjBQAQ-AEAAKIFADD5AQEAjAMAIfwBQACSAwAhiAIBAIwDACGXAkAAkgMAIZsCAQCMAwAhnAIBAI0DACGdAggAtQMAIZ4CCAC2AwAhnwICALMDACGgAgEAjAMAIaECAACaAwAgogIBAI0DACGjAgEAjQMAIaQCCAC1AwAhpQICALMDACGmAiAAkQMAIacCIACRAwAhFPYBAACiBQAw9wEAAKMFABD4AQAAogUAMPkBAQCMAwAh_AFAAJIDACGIAgEAjAMAIZcCQACSAwAhmwIBAIwDACGcAgEAjQMAIZ0CCAC1AwAhngIIALYDACGfAgIAswMAIaACAQCMAwAhoQIAAJoDACCiAgEAjQMAIaMCAQCNAwAhpAIIALUDACGlAgIAswMAIaYCIACRAwAhpwIgAJEDACEQ-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGbAgEAiAQAIZwCAQCSBAAhnQIIAL8EACGeAggA3gQAIZ8CAgCwBAAhoAIBAIgEACGhAgAA3wQAIKICAQCSBAAhpAIIAL8EACGlAgIAsAQAIaYCIACWBAAhpwIgAJYEACETcAAA4QQAIHEAAOIEACBzAADjBAAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGbAgEAiAQAIZwCAQCSBAAhnQIIAL8EACGeAggA3gQAIZ8CAgCwBAAhoAIBAIgEACGhAgAA3wQAIKICAQCSBAAhpAIIAL8EACGlAgIAsAQAIaYCIACWBAAhpwIgAJYEACETcAAAhQUAIHEAAIYFACBzAACHBQAg-QEBAAAAAfwBQAAAAAGIAgEAAAABlwJAAAAAAZsCAQAAAAGcAgEAAAABnQIIAAAAAZ4CCAAAAAGfAgIAAAABoAIBAAAAAaECAACDBQAgogIBAAAAAaQCCAAAAAGlAgIAAAABpgIgAAAAAacCIAAAAAEEDwAAmwUAMO0CAACcBQAw7wIAAJ4FACDzAgAAnwUAMAAAAAAAAApxAADXBAAgcwAA2AQAIHUAANYEACCLAgAAjgQAIIwCAACOBAAgkQIAAI4EACCSAgAAjgQAIJMCAACOBAAglAIAAI4EACCWAgAAjgQAIAhvAACwBQAgcAAAsQUAIHEAANcEACBzAADYBAAgnAIAAI4EACCeAgAAjgQAIKICAACOBAAgowIAAI4EACADbgAAqAUAIJwCAACOBAAguQIAAI4EACAAAmwAAK4FACB0AACxBQAgAAAAAAAF8AIQAAAAAfYCEAAAAAH3AhAAAAAB-AIQAAAAAfkCEAAAAAEB8AIAAAC_AgIAAAAAAAHwAgAAAMwCAgHwAgAAAM8CAgAAAAAAAfACAAAA0QICAfACAAAA1gICAAAAAAAB8AIAAADaAgIB8AIAAADbAgIF8AICAAAAAfYCAgAAAAH3AgIAAAAB-AICAAAAAfkCAgAAAAEF8AIQAAAAAfYCEAAAAAH3AhAAAAAB-AIQAAAAAfkCEAAAAAEB8AIAAADfAgIB8AIAAADgAgIAAAAAAAHwAgAAAOICAgAAAAAAAfACAAAA4wICAfACAAAA6AICEPkBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGbAgEAAAABnAIBAAAAAZ0CCAAAAAGeAggAAAABnwICAAAAAaACAQAAAAGhAgAAgwUAIKICAQAAAAGkAggAAAABpQICAAAAAaYCIAAAAAGnAiAAAAABEnEAANQEACBzAADVBAAg-QEBAAAAAfwBQAAAAAGIAgEAAAABiQIBAAAAAYoCAQAAAAGLAgEAAAABjAIBAAAAAY4CAAAAjgICkAIAAACQAgKRAgEAAAABkgIBAAAAAZMCAQAAAAGUAkAAAAABlQIgAAAAAZYCAQAAAAGXAkAAAAABAgAAAMMCACAPAADhBQAgAwAAAMYCACAPAADhBQAgEAAA5QUAIBQAAADGAgAgCAAA5QUAIHEAAJgEACBzAACZBAAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhiQIBAIgEACGKAgEAiAQAIYsCAQCSBAAhjAIBAJIEACGOAgAAkwSOAiKQAgAAlASQAiKRAgEAkgQAIZICAQCSBAAhkwIBAJIEACGUAkAAlQQAIZUCIACWBAAhlgIBAJIEACGXAkAAiQQAIRJxAACYBAAgcwAAmQQAIPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIYkCAQCIBAAhigIBAIgEACGLAgEAkgQAIYwCAQCSBAAhjgIAAJMEjgIikAIAAJQEkAIikQIBAJIEACGSAgEAkgQAIZMCAQCSBAAhlAJAAJUEACGVAiAAlgQAIZYCAQCSBAAhlwJAAIkEACEI-QEBAAAAAfwBQAAAAAGIAgEAAAABlwJAAAAAAZsCAQAAAAGcAgEAAAABuQIBAAAAAboCIAAAAAECAAAAzgEAIA8AAOYFACAMbAAAkwUAIPkBAQAAAAH6AQEAAAAB_AFAAAAAAYgCAQAAAAGLAgEAAAABkAIAAACvAgKRAgEAAAABlwJAAAAAAa0CCAAAAAGvAiAAAAABsAIIAAAAAQIAAACbAQAgDwAA6AUAIAMAAACZAQAgDwAA6AUAIBAAAOwFACAOAAAAmQEAIAgAAOwFACBsAACSBQAg-QEBAIgEACH6AQEAiAQAIfwBQACJBAAhiAIBAIgEACGLAgEAiAQAIZACAADABK8CIpECAQCIBAAhlwJAAIkEACGtAggAvwQAIa8CIACWBAAhsAIIAL8EACEMbAAAkgUAIPkBAQCIBAAh-gEBAIgEACH8AUAAiQQAIYgCAQCIBAAhiwIBAIgEACGQAgAAwASvAiKRAgEAiAQAIZcCQACJBAAhrQIIAL8EACGvAiAAlgQAIbACCAC_BAAhB_kBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGdAggAAAABqwIBAAAAAawCAgAAAAEScwAA1QQAIHUAANMEACD5AQEAAAAB_AFAAAAAAYgCAQAAAAGJAgEAAAABigIBAAAAAYsCAQAAAAGMAgEAAAABjgIAAACOAgKQAgAAAJACApECAQAAAAGSAgEAAAABkwIBAAAAAZQCQAAAAAGVAiAAAAABlgIBAAAAAZcCQAAAAAECAAAAwwIAIA8AAO4FACADAAAAxgIAIA8AAO4FACAQAADyBQAgFAAAAMYCACAIAADyBQAgcwAAmQQAIHUAAJcEACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGJAgEAiAQAIYoCAQCIBAAhiwIBAJIEACGMAgEAkgQAIY4CAACTBI4CIpACAACUBJACIpECAQCSBAAhkgIBAJIEACGTAgEAkgQAIZQCQACVBAAhlQIgAJYEACGWAgEAkgQAIZcCQACJBAAhEnMAAJkEACB1AACXBAAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhiQIBAIgEACGKAgEAiAQAIYsCAQCSBAAhjAIBAJIEACGOAgAAkwSOAiKQAgAAlASQAiKRAgEAkgQAIZICAQCSBAAhkwIBAJIEACGUAkAAlQQAIZUCIACWBAAhlgIBAJIEACGXAkAAiQQAIQX5AQEAAAAB-gEBAAAAAfwBQAAAAAGXAkAAAAABrAICAAAAAQP5AQEAAAAB-gEBAAAAAfwBQAAAAAEDAAAAoQEAIA8AAOYFACAQAAD3BQAgCgAAAKEBACAIAAD3BQAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGbAgEAiAQAIZwCAQCSBAAhuQIBAJIEACG6AiAAlgQAIQj5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZsCAQCIBAAhnAIBAJIEACG5AgEAkgQAIboCIACWBAAhFG8AAIQFACBxAACGBQAgcwAAhwUAIPkBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGbAgEAAAABnAIBAAAAAZ0CCAAAAAGeAggAAAABnwICAAAAAaACAQAAAAGhAgAAgwUAIKICAQAAAAGjAgEAAAABpAIIAAAAAaUCAgAAAAGmAiAAAAABpwIgAAAAAQIAAAClAQAgDwAA-AUAIAMAAACjAQAgDwAA-AUAIBAAAPwFACAWAAAAowEAIAgAAPwFACBvAADgBAAgcQAA4gQAIHMAAOMEACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZsCAQCIBAAhnAIBAJIEACGdAggAvwQAIZ4CCADeBAAhnwICALAEACGgAgEAiAQAIaECAADfBAAgogIBAJIEACGjAgEAkgQAIaQCCAC_BAAhpQICALAEACGmAiAAlgQAIacCIACWBAAhFG8AAOAEACBxAADiBAAgcwAA4wQAIPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIZcCQACJBAAhmwIBAIgEACGcAgEAkgQAIZ0CCAC_BAAhngIIAN4EACGfAgIAsAQAIaACAQCIBAAhoQIAAN8EACCiAgEAkgQAIaMCAQCSBAAhpAIIAL8EACGlAgIAsAQAIaYCIACWBAAhpwIgAJYEACEH-QEBAAAAAfsBAQAAAAH8AUAAAAABiAIBAAAAAZcCQAAAAAGdAggAAAABrAICAAAAAQr5AQEAAAAB_AFAAAAAAYgCAQAAAAGLAgEAAAABkAIAAACvAgKRAgEAAAABlwJAAAAAAa0CCAAAAAGvAiAAAAABsAIIAAAAARRvAACEBQAgcAAAhQUAIHMAAIcFACD5AQEAAAAB_AFAAAAAAYgCAQAAAAGXAkAAAAABmwIBAAAAAZwCAQAAAAGdAggAAAABngIIAAAAAZ8CAgAAAAGgAgEAAAABoQIAAIMFACCiAgEAAAABowIBAAAAAaQCCAAAAAGlAgIAAAABpgIgAAAAAacCIAAAAAECAAAApQEAIA8AAP8FACADAAAAowEAIA8AAP8FACAQAACDBgAgFgAAAKMBACAIAACDBgAgbwAA4AQAIHAAAOEEACBzAADjBAAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGbAgEAiAQAIZwCAQCSBAAhnQIIAL8EACGeAggA3gQAIZ8CAgCwBAAhoAIBAIgEACGhAgAA3wQAIKICAQCSBAAhowIBAJIEACGkAggAvwQAIaUCAgCwBAAhpgIgAJYEACGnAiAAlgQAIRRvAADgBAAgcAAA4QQAIHMAAOMEACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZsCAQCIBAAhnAIBAJIEACGdAggAvwQAIZ4CCADeBAAhnwICALAEACGgAgEAiAQAIaECAADfBAAgogIBAJIEACGjAgEAkgQAIaQCCAC_BAAhpQICALAEACGmAiAAlgQAIacCIACWBAAhBfkBAQAAAAH7AQEAAAAB_AFAAAAAAZcCQAAAAAGsAgIAAAABA_kBAQAAAAH7AQEAAAAB_AFAAAAAARRvAACEBQAgcAAAhQUAIHEAAIYFACD5AQEAAAAB_AFAAAAAAYgCAQAAAAGXAkAAAAABmwIBAAAAAZwCAQAAAAGdAggAAAABngIIAAAAAZ8CAgAAAAGgAgEAAAABoQIAAIMFACCiAgEAAAABowIBAAAAAaQCCAAAAAGlAgIAAAABpgIgAAAAAacCIAAAAAECAAAApQEAIA8AAIYGACAScQAA1AQAIHUAANMEACD5AQEAAAAB_AFAAAAAAYgCAQAAAAGJAgEAAAABigIBAAAAAYsCAQAAAAGMAgEAAAABjgIAAACOAgKQAgAAAJACApECAQAAAAGSAgEAAAABkwIBAAAAAZQCQAAAAAGVAiAAAAABlgIBAAAAAZcCQAAAAAECAAAAwwIAIA8AAIgGACADAAAAowEAIA8AAIYGACAQAACMBgAgFgAAAKMBACAIAACMBgAgbwAA4AQAIHAAAOEEACBxAADiBAAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhlwJAAIkEACGbAgEAiAQAIZwCAQCSBAAhnQIIAL8EACGeAggA3gQAIZ8CAgCwBAAhoAIBAIgEACGhAgAA3wQAIKICAQCSBAAhowIBAJIEACGkAggAvwQAIaUCAgCwBAAhpgIgAJYEACGnAiAAlgQAIRRvAADgBAAgcAAA4QQAIHEAAOIEACD5AQEAiAQAIfwBQACJBAAhiAIBAIgEACGXAkAAiQQAIZsCAQCIBAAhnAIBAJIEACGdAggAvwQAIZ4CCADeBAAhnwICALAEACGgAgEAiAQAIaECAADfBAAgogIBAJIEACGjAgEAkgQAIaQCCAC_BAAhpQICALAEACGmAiAAlgQAIacCIACWBAAhAwAAAMYCACAPAACIBgAgEAAAjwYAIBQAAADGAgAgCAAAjwYAIHEAAJgEACB1AACXBAAg-QEBAIgEACH8AUAAiQQAIYgCAQCIBAAhiQIBAIgEACGKAgEAiAQAIYsCAQCSBAAhjAIBAJIEACGOAgAAkwSOAiKQAgAAlASQAiKRAgEAkgQAIZICAQCSBAAhkwIBAJIEACGUAkAAlQQAIZUCIACWBAAhlgIBAJIEACGXAkAAiQQAIRJxAACYBAAgdQAAlwQAIPkBAQCIBAAh_AFAAIkEACGIAgEAiAQAIYkCAQCIBAAhigIBAIgEACGLAgEAkgQAIYwCAQCSBAAhjgIAAJMEjgIikAIAAJQEkAIikQIBAJIEACGSAgEAkgQAIZMCAQCSBAAhlAJAAJUEACGVAiAAlgQAIZYCAQCSBAAhlwJAAIkEACEAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgAAAAUVABAWABEXABIYABMZABQAAAAAAAUVABAWABEXABIYABMZABQAAAAFFQAaFgAbFwAcGAAdGQAeAAAAAAAFFQAaFgAbFwAcGAAdGQAeAAAABRUAJBYAJRcAJhgAJxkAKAAAAAAABRUAJBYAJRcAJhgAJxkAKAAAAAUVAC4WAC8XADAYADEZADIAAAAAAAUVAC4WAC8XADAYADEZADIAAAAFFQA4FgA5FwA6GAA7GQA8AAAAAAAFFQA4FgA5FwA6GAA7GQA8AmwAP3IAQgQVAEhxtAE-c7UBRXWcAUADFQBHbAA_dKABQQJtAEByAEIFFQBGb6IBQ3CoAUFxqwE-c68BRQIVAERupgFCAW6nAQACbAA_cgBCA3CwAQBxsQEAc7IBAAF0swEAA3G3AQBzuAEAdbYBAAJsAD9yAEICbAA_cgBCBRUATBYATRcAThgATxkAUAAAAAAABRUATBYATRcAThgATxkAUAAAAxUAVRgAVhkAVwAAAAMVAFUYAFYZAFcAAAADFQBdGABeGQBfAAAAAxUAXRgAXhkAXwFsAD8BbAA_BRUAZBYAZRcAZhgAZxkAaAAAAAAABRUAZBYAZRcAZhgAZxkAaAJtAEByAEICbQBAcgBCBRUAbRYAbhcAbxgAcBkAcQAAAAAABRUAbRYAbhcAbxgAcBkAcQFvtQJDAW-7AkMFFQB2FgB3FwB4GAB5GQB6AAAAAAAFFQB2FgB3FwB4GAB5GQB6AAADFQB_GACAARkAgQEAAAADFQB_GACAARkAgQECbAA_cgBCAmwAP3IAQgMVAIYBGACHARkAiAEAAAADFQCGARgAhwEZAIgBAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkLHBsMHRwMHh8MHyAMICEMISMMIiUCIyYNJCgMJSoCJisOJywMKC0MKS4CKjEPKzIVLDQWLTUWLjgWLzkWMDoWMTwWMj4CMz8XNEEWNUMCNkQYN0UWOEYWOUcCOkoZO0sfPE0gPU4gPlEgP1IgQFMgQVUgQlcCQ1ghRFogRVwCRl0iR14gSF8gSWACSmMjS2QpTGYqTWcqTmoqT2sqUGwqUW4qUnACU3ErVHMqVXUCVnYsV3cqWHgqWXkCWnwtW30zXH80XYABNF6DATRfhAE0YIUBNGGHATRiiQECY4oBNWSMATRljgECZo8BNmeQATRokQE0aZIBAmqVATdrlgE9dpgBPne5AT54ugE-ebsBPnq8AT57vgE-fMABAn3BAUl-wwE-f8UBAoABxgFKgQHHAT6CAcgBPoMByQEChAHMAUuFAc0BUYYBzwFDhwHQAUOIAdIBQ4kB0wFDigHUAUOLAdYBQ4wB2AECjQHZAVKOAdsBQ48B3QECkAHeAVORAd8BQ5IB4AFDkwHhAQKUAeQBVJUB5QFYlgHnAVmXAegBWZgB6wFZmQHsAVmaAe0BWZsB7wFZnAHxAQKdAfIBWp4B9AFZnwH2AQKgAfcBW6EB-AFZogH5AVmjAfoBAqQB_QFcpQH-AWCmAf8BQKcBgAJAqAGBAkCpAYICQKoBgwJAqwGFAkCsAYcCAq0BiAJhrgGKAkCvAYwCArABjQJisQGOAkCyAY8CQLMBkAICtAGTAmO1AZQCabYBlQJBtwGWAkG4AZcCQbkBmAJBugGZAkG7AZsCQbwBnQICvQGeAmq-AaACQb8BogICwAGjAmvBAaQCQcIBpQJBwwGmAgLEAakCbMUBqgJyxgGrAkLHAawCQsgBrQJCyQGuAkLKAa8CQssBsQJCzAGzAgLNAbQCc84BtwJCzwG5AgLQAboCdNEBvAJC0gG9AkLTAb4CAtQBwQJ11QHCAnvWAcQCP9cBxQI_2AHIAj_ZAckCP9oBygI_2wHMAj_cAc4CAt0BzwJ83gHRAj_fAdMCAuAB1AJ94QHVAj_iAdYCP-MB1wIC5AHaAn7lAdsCggHmAdwCRecB3QJF6AHeAkXpAd8CReoB4AJF6wHiAkXsAeQCAu0B5QKDAe4B5wJF7wHpAgLwAeoChAHxAesCRfIB7AJF8wHtAgL0AfAChQH1AfECiQE"
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
    const { category, ...rest } = payload;
    const result = await prisma.product.create({
      data: {
        ...rest,
        ...category ? {
          category: {
            connect: {
              id: category
            }
          }
        } : {}
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
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
    const { category, ...rest } = payload;
    const result = await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...category ? {
          category: {
            connect: {
              id: category
            }
          }
        } : {}
      }
    });
    return result;
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
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

// src/app/modules/accounts/steadfast-withdrawal/steadfast-withdrawal.route.ts
import { Router as Router7 } from "express";

// src/app/modules/accounts/steadfast-withdrawal/steadfast-withdrawal.service.ts
var createWithdrawal = async (payload) => {
  try {
    const result = await prisma.steadfastWithdrawal.create({
      data: {
        date: new Date(payload.date),
        description: payload.description,
        amount: payload.amount,
        status: payload.status,
        withdrawBy: payload.withdrawBy,
        paymentMethod: payload.paymentMethod,
        clearanceStatus: payload.clearanceStatus
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE STEADFAST WITHDRAWAL ERROR:", error);
    throw new Error("Failed to create Steadfast withdrawal");
  }
};
var getAllWithdrawals = async (query) => {
  try {
    const {
      search,
      status: status3,
      clearanceStatus,
      withdrawBy,
      page = 1,
      limit = 10
    } = query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);
    const skip = (currentPage - 1) * currentLimit;
    const where = {};
    if (search) {
      where.OR = [
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          paymentMethod: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          withdrawBy: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
    if (status3) {
      where.status = status3;
    }
    if (clearanceStatus) {
      where.clearanceStatus = clearanceStatus;
    }
    if (withdrawBy) {
      where.withdrawBy = {
        contains: withdrawBy,
        mode: "insensitive"
      };
    }
    const [data, total, paid, unpaid, totalAmount] = await Promise.all([
      // Paginated data
      prisma.steadfastWithdrawal.findMany({
        where,
        orderBy: {
          date: "desc"
        },
        skip,
        take: currentLimit
      }),
      // Total entries
      prisma.steadfastWithdrawal.count({
        where
      }),
      // Paid entries
      prisma.steadfastWithdrawal.count({
        where: {
          ...where,
          status: "PAID"
        }
      }),
      // Unpaid entries
      prisma.steadfastWithdrawal.count({
        where: {
          ...where,
          status: "UNPAID"
        }
      }),
      // Total amount
      prisma.steadfastWithdrawal.aggregate({
        where,
        _sum: {
          amount: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / currentLimit);
    return {
      data,
      meta: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        totalWithdrawals: total,
        paid,
        unpaid,
        totalAmount: totalAmount._sum.amount ?? 0
      }
    };
  } catch (error) {
    console.error("GET STEADFAST WITHDRAWALS ERROR:", error);
    throw new Error("Failed to fetch Steadfast withdrawals");
  }
};
var getSingleWithdrawal = async (id) => {
  try {
    const result = await prisma.steadfastWithdrawal.findUnique({
      where: { id }
    });
    if (!result) {
      throw new Error("Steadfast withdrawal not found");
    }
    return result;
  } catch (error) {
    console.error("GET SINGLE STEADFAST WITHDRAWAL ERROR:", error);
    throw new Error("Failed to fetch Steadfast withdrawal");
  }
};
var updateWithdrawal = async (id, payload) => {
  try {
    const data = {
      ...payload
    };
    if (payload.date) {
      data.date = new Date(payload.date);
    }
    const result = await prisma.steadfastWithdrawal.update({
      where: { id },
      data
    });
    return result;
  } catch (error) {
    console.error("UPDATE STEADFAST WITHDRAWAL ERROR:", error);
    throw new Error("Failed to update Steadfast withdrawal");
  }
};
var deleteWithdrawal = async (id) => {
  try {
    const result = await prisma.steadfastWithdrawal.delete({
      where: { id }
    });
    return result;
  } catch (error) {
    console.error("DELETE STEADFAST WITHDRAWAL ERROR:", error);
    throw new Error("Failed to delete Steadfast withdrawal");
  }
};
var SteadfastWithdrawalService = {
  createWithdrawal,
  getAllWithdrawals,
  getSingleWithdrawal,
  updateWithdrawal,
  deleteWithdrawal
};

// src/app/modules/accounts/steadfast-withdrawal/steadfast-withdrawal.controller.ts
var createWithdrawal2 = catchAsync(async (req, res) => {
  const result = await SteadfastWithdrawalService.createWithdrawal(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Steadfast withdrawal created successfully",
    data: result
  });
});
var getAllWithdrawals2 = catchAsync(async (req, res) => {
  const result = await SteadfastWithdrawalService.getAllWithdrawals({
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    search: req.query.search,
    status: req.query.status,
    clearanceStatus: req.query.clearanceStatus,
    withdrawBy: req.query.withdrawBy
  });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Steadfast withdrawals retrieved successfully",
    data: result
  });
});
var getSingleWithdrawal2 = catchAsync(async (req, res) => {
  const result = await SteadfastWithdrawalService.getSingleWithdrawal(
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Steadfast withdrawal retrieved successfully",
    data: result
  });
});
var updateWithdrawal2 = catchAsync(async (req, res) => {
  const result = await SteadfastWithdrawalService.updateWithdrawal(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Steadfast withdrawal updated successfully",
    data: result
  });
});
var deleteWithdrawal2 = catchAsync(async (req, res) => {
  const result = await SteadfastWithdrawalService.deleteWithdrawal(
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Steadfast withdrawal deleted successfully",
    data: result
  });
});
var SteadfastWithdrawalController = {
  createWithdrawal: createWithdrawal2,
  getAllWithdrawals: getAllWithdrawals2,
  getSingleWithdrawal: getSingleWithdrawal2,
  updateWithdrawal: updateWithdrawal2,
  deleteWithdrawal: deleteWithdrawal2
};

// src/app/modules/accounts/steadfast-withdrawal/steadfast-withdrawal.route.ts
var router10 = Router7();
router10.post(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.createWithdrawal
);
router10.get(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.getAllWithdrawals
);
router10.get(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.getSingleWithdrawal
);
router10.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.updateWithdrawal
);
router10.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.deleteWithdrawal
);
var SteadfastWithdrawalRoutes = router10;

// src/app/modules/accounts/investor-payment/investor-payment.route.ts
import { Router as Router8 } from "express";

// src/app/modules/accounts/investor-payment/investor-payment.service.ts
var createInvestorPayment = async (payload) => {
  try {
    const result = await prisma.investorPayment.create({
      data: {
        date: new Date(payload.date),
        description: payload.description,
        amount: payload.amount,
        status: payload.status ?? "PAID",
        investorName: payload.investorName,
        investedAmount: payload.investedAmount,
        receivedAmount: payload.receivedAmount,
        paymentBy: payload.paymentBy,
        referenceBy: payload.referenceBy,
        platform: payload.platform,
        investmentStatus: payload.investmentStatus ?? "RUNNING",
        monthsPaid: payload.monthsPaid ?? 0,
        buyProducts: payload.buyProducts || null
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE INVESTOR PAYMENT ERROR:", error);
    throw new Error("Failed to create investor payment");
  }
};
var getAllInvestorPayments = async (query) => {
  try {
    const {
      search,
      status: status3,
      investmentStatus,
      investorName,
      platform,
      page = "1",
      limit = "10"
    } = query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);
    const skip = (currentPage - 1) * currentLimit;
    const where = {};
    if (search) {
      where.OR = [
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          investorName: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          paymentBy: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          referenceBy: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          platform: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
    if (status3) {
      where.status = status3;
    }
    if (investmentStatus) {
      where.investmentStatus = investmentStatus;
    }
    if (investorName) {
      where.investorName = {
        contains: investorName,
        mode: "insensitive"
      };
    }
    if (platform) {
      where.platform = {
        contains: platform,
        mode: "insensitive"
      };
    }
    const [data, total] = await Promise.all([
      prisma.investorPayment.findMany({
        where,
        orderBy: {
          date: "desc"
        },
        skip,
        take: currentLimit
      }),
      prisma.investorPayment.count({
        where
      })
    ]);
    const [
      totalPayments,
      paid,
      unpaid,
      amountSummary,
      investedSummary,
      receivedSummary,
      monthsSummary
    ] = await Promise.all([
      prisma.investorPayment.count(),
      prisma.investorPayment.count({
        where: {
          status: "PAID"
        }
      }),
      prisma.investorPayment.count({
        where: {
          status: "UNPAID"
        }
      }),
      prisma.investorPayment.aggregate({
        _sum: {
          amount: true
        }
      }),
      prisma.investorPayment.aggregate({
        _sum: {
          investedAmount: true
        }
      }),
      prisma.investorPayment.aggregate({
        _sum: {
          receivedAmount: true
        }
      }),
      prisma.investorPayment.aggregate({
        _sum: {
          monthsPaid: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / currentLimit);
    return {
      data,
      meta: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        totalPayments,
        paid,
        unpaid,
        totalAmount: Number(amountSummary._sum.amount ?? 0),
        totalInvestedAmount: Number(investedSummary._sum.investedAmount ?? 0),
        totalReceivedAmount: Number(receivedSummary._sum.receivedAmount ?? 0),
        totalMonthsPaid: Number(monthsSummary._sum.monthsPaid ?? 0)
      }
    };
  } catch (error) {
    console.error("GET INVESTOR PAYMENTS ERROR:", error);
    throw new Error("Failed to fetch investor payments");
  }
};
var getSingleInvestorPayment = async (id) => {
  try {
    const result = await prisma.investorPayment.findUnique({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("GET SINGLE INVESTOR PAYMENT ERROR:", error);
    throw new Error("Failed to fetch investor payment");
  }
};
var updateInvestorPayment = async (id, payload) => {
  try {
    const data = {
      ...payload
    };
    if (payload.date) {
      data.date = new Date(payload.date);
    }
    const result = await prisma.investorPayment.update({
      where: {
        id
      },
      data
    });
    return result;
  } catch (error) {
    console.error("UPDATE INVESTOR PAYMENT ERROR:", error);
    throw new Error("Failed to update investor payment");
  }
};
var deleteInvestorPayment = async (id) => {
  try {
    const result = await prisma.investorPayment.delete({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("DELETE INVESTOR PAYMENT ERROR:", error);
    throw new Error("Failed to delete investor payment");
  }
};
var investorPaymentService = {
  createInvestorPayment,
  getAllInvestorPayments,
  getSingleInvestorPayment,
  updateInvestorPayment,
  deleteInvestorPayment
};

// src/app/modules/accounts/investor-payment/investor-payment.controller.ts
var createInvestorPayment2 = catchAsync(
  async (req, res) => {
    const result = await investorPaymentService.createInvestorPayment(req.body);
    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "Investor payment created successfully",
      data: result
    });
  }
);
var getAllInvestorPayments2 = catchAsync(
  async (req, res) => {
    const result = await investorPaymentService.getAllInvestorPayments({
      search: req.query.search,
      status: req.query.status,
      investmentStatus: req.query.investmentStatus,
      investorName: req.query.investorName,
      platform: req.query.platform,
      page: req.query.page,
      limit: req.query.limit
    });
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Investor payments retrieved successfully",
      data: result
    });
  }
);
var getSingleInvestorPayment2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await investorPaymentService.getSingleInvestorPayment(
      id
    );
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Investor payment retrieved successfully",
      data: result
    });
  }
);
var updateInvestorPayment2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await investorPaymentService.updateInvestorPayment(
      id,
      req.body
    );
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Investor payment updated successfully",
      data: result
    });
  }
);
var deleteInvestorPayment2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await investorPaymentService.deleteInvestorPayment(
      id
    );
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Investor payment deleted successfully",
      data: result
    });
  }
);
var investorPaymentController = {
  createInvestorPayment: createInvestorPayment2,
  getAllInvestorPayments: getAllInvestorPayments2,
  getSingleInvestorPayment: getSingleInvestorPayment2,
  updateInvestorPayment: updateInvestorPayment2,
  deleteInvestorPayment: deleteInvestorPayment2
};

// src/app/modules/accounts/investor-payment/investor-payment.route.ts
var router11 = Router8();
router11.post(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.createInvestorPayment
);
router11.get(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.getAllInvestorPayments
);
router11.get(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.getSingleInvestorPayment
);
router11.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.updateInvestorPayment
);
router11.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.deleteInvestorPayment
);
var InvestorPaymentRoutes = router11;

// src/app/modules/accounts/shipment/shipment.route.ts
import { Router as Router9 } from "express";

// src/app/modules/accounts/shipment/shipment.service.ts
var createShipment = async (payload) => {
  try {
    const result = await prisma.shipment.create({
      data: {
        date: new Date(payload.date),
        description: payload.description,
        amount: payload.amount,
        status: payload.status,
        productName: payload.productName,
        quantity: payload.quantity,
        shippingCompany: payload.shippingCompany,
        weight: payload.weight,
        perKgRate: payload.perKgRate,
        shippingCharge: payload.shippingCharge,
        billingStatus: payload.billingStatus,
        shippingStatus: payload.shippingStatus,
        receivingDate: payload.receivingDate ? new Date(payload.receivingDate) : null,
        investorName: payload.investorName
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE SHIPMENT ERROR:", error);
    throw new Error("Failed to create shipment");
  }
};
var getAllShipments = async (query) => {
  try {
    const {
      search,
      status: status3,
      billingStatus,
      shippingStatus,
      investorName,
      shippingCompany,
      page = "1",
      limit = "10"
    } = query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);
    const skip = (currentPage - 1) * currentLimit;
    const where = {};
    if (search) {
      where.OR = [
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          productName: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          shippingCompany: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          investorName: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
    if (status3) {
      where.status = status3;
    }
    if (billingStatus) {
      where.billingStatus = billingStatus;
    }
    if (shippingStatus) {
      where.shippingStatus = shippingStatus;
    }
    if (investorName) {
      where.investorName = {
        contains: investorName,
        mode: "insensitive"
      };
    }
    if (shippingCompany) {
      where.shippingCompany = {
        contains: shippingCompany,
        mode: "insensitive"
      };
    }
    const [data, total] = await Promise.all([
      prisma.shipment.findMany({
        where,
        orderBy: {
          date: "desc"
        },
        skip,
        take: currentLimit
      }),
      prisma.shipment.count({
        where
      })
    ]);
    const [
      totalShipments,
      paid,
      unpaid,
      processing,
      completed,
      amountSummary,
      shippingChargeSummary,
      totalQuantity,
      weightSummary
    ] = await Promise.all([
      prisma.shipment.count(),
      prisma.shipment.count({
        where: {
          billingStatus: "PAID"
        }
      }),
      prisma.shipment.count({
        where: {
          billingStatus: "UNPAID"
        }
      }),
      prisma.shipment.count({
        where: {
          shippingStatus: "PROCESSING"
        }
      }),
      prisma.shipment.count({
        where: {
          shippingStatus: "COMPLETED"
        }
      }),
      prisma.shipment.aggregate({
        _sum: {
          amount: true
        }
      }),
      prisma.shipment.aggregate({
        _sum: {
          shippingCharge: true
        }
      }),
      prisma.shipment.aggregate({
        _sum: {
          quantity: true
        }
      }),
      prisma.shipment.aggregate({
        _sum: {
          weight: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / currentLimit);
    return {
      data,
      meta: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        totalShipments,
        paid,
        unpaid,
        processing,
        completed,
        totalAmount: Number(amountSummary._sum.amount ?? 0),
        totalShippingCharge: Number(
          shippingChargeSummary._sum.shippingCharge ?? 0
        ),
        totalQuantity: totalQuantity._sum.quantity ?? 0,
        totalWeight: Number(weightSummary._sum.weight ?? 0)
      }
    };
  } catch (error) {
    console.error("GET SHIPMENTS ERROR:", error);
    throw new Error("Failed to fetch shipments");
  }
};
var getSingleShipment = async (id) => {
  try {
    const result = await prisma.shipment.findUnique({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("GET SINGLE SHIPMENT ERROR:", error);
    throw new Error("Failed to fetch shipment");
  }
};
var updateShipment = async (id, payload) => {
  try {
    const data = {
      ...payload
    };
    if (payload.date) {
      data.date = new Date(payload.date);
    }
    if (payload.receivingDate) {
      data.receivingDate = new Date(payload.receivingDate);
    }
    const result = await prisma.shipment.update({
      where: {
        id
      },
      data
    });
    return result;
  } catch (error) {
    console.error("UPDATE SHIPMENT ERROR:", error);
    throw new Error("Failed to update shipment");
  }
};
var deleteShipment = async (id) => {
  try {
    const result = await prisma.shipment.delete({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("DELETE SHIPMENT ERROR:", error);
    throw new Error("Failed to delete shipment");
  }
};
var shipmentService = {
  createShipment,
  getAllShipments,
  getSingleShipment,
  updateShipment,
  deleteShipment
};

// src/app/modules/accounts/shipment/shipment.controller.ts
var createShipment2 = catchAsync(async (req, res) => {
  const result = await shipmentService.createShipment(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Shipment created successfully",
    data: result
  });
});
var getAllShipments2 = catchAsync(async (req, res) => {
  const result = await shipmentService.getAllShipments({
    search: req.query.search,
    status: req.query.status,
    billingStatus: req.query.billingStatus,
    shippingStatus: req.query.shippingStatus,
    investorName: req.query.investorName,
    shippingCompany: req.query.shippingCompany,
    page: req.query.page,
    limit: req.query.limit
  });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Shipments retrieved successfully",
    data: result
  });
});
var getSingleShipment2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shipmentService.getSingleShipment(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Shipment retrieved successfully",
    data: result
  });
});
var updateShipment2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shipmentService.updateShipment(id, req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Shipment updated successfully",
    data: result
  });
});
var deleteShipment2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shipmentService.deleteShipment(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Shipment deleted successfully",
    data: result
  });
});
var shipmentController = {
  createShipment: createShipment2,
  getAllShipments: getAllShipments2,
  getSingleShipment: getSingleShipment2,
  updateShipment: updateShipment2,
  deleteShipment: deleteShipment2
};

// src/app/modules/accounts/shipment/shipment.route.ts
var router12 = Router9();
router12.post(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  shipmentController.createShipment
);
router12.get("/", shipmentController.getAllShipments);
router12.get("/:id", shipmentController.getSingleShipment);
router12.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  shipmentController.updateShipment
);
router12.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  shipmentController.deleteShipment
);
var ShipmentRoutes = router12;

// src/app/modules/accounts/wholesale/wholesale.route.ts
import { Router as Router10 } from "express";

// src/app/modules/accounts/wholesale/wholesale.service.ts
var createWholesale = async (payload) => {
  try {
    const result = await prisma.wholesale.create({
      data: {
        date: new Date(payload.date),
        description: payload.description,
        amount: payload.amount,
        status: payload.status ?? "UNPAID",
        productName: payload.productName,
        quantity: payload.quantity,
        priceRmb: payload.priceRmb,
        priceTaka: payload.priceTaka,
        weight: payload.weight,
        costPerKg: payload.costPerKg,
        shipping: payload.shipping,
        courierChina: payload.courierChina,
        note: payload.note,
        onePairPrice: payload.onePairPrice,
        salePrice: payload.salePrice,
        loss: payload.loss ?? 0,
        profit: payload.profit ?? 0
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE WHOLESALE ERROR:", error);
    throw new Error("Failed to create wholesale");
  }
};
var getAllWholesales = async (query) => {
  try {
    const {
      search,
      status: status3,
      productName,
      courierChina,
      page = "1",
      limit = "10"
    } = query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);
    const skip = (currentPage - 1) * currentLimit;
    const where = {};
    if (search) {
      where.OR = [
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          productName: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          courierChina: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          note: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
    if (status3) {
      where.status = status3;
    }
    if (productName) {
      where.productName = {
        contains: productName,
        mode: "insensitive"
      };
    }
    if (courierChina) {
      where.courierChina = {
        contains: courierChina,
        mode: "insensitive"
      };
    }
    const [data, total] = await Promise.all([
      prisma.wholesale.findMany({
        where,
        orderBy: {
          date: "desc"
        },
        skip,
        take: currentLimit
      }),
      prisma.wholesale.count({
        where
      })
    ]);
    const [
      totalWholesales,
      paid,
      unpaid,
      amountSummary,
      shippingSummary,
      quantitySummary,
      weightSummary,
      profitSummary,
      lossSummary
    ] = await Promise.all([
      prisma.wholesale.count(),
      prisma.wholesale.count({
        where: {
          status: "PAID"
        }
      }),
      prisma.wholesale.count({
        where: {
          status: "UNPAID"
        }
      }),
      prisma.wholesale.aggregate({
        _sum: {
          amount: true
        }
      }),
      prisma.wholesale.aggregate({
        _sum: {
          shipping: true
        }
      }),
      prisma.wholesale.aggregate({
        _sum: {
          quantity: true
        }
      }),
      prisma.wholesale.aggregate({
        _sum: {
          weight: true
        }
      }),
      prisma.wholesale.aggregate({
        _sum: {
          profit: true
        }
      }),
      prisma.wholesale.aggregate({
        _sum: {
          loss: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / currentLimit);
    return {
      data,
      meta: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        totalWholesales,
        paid,
        unpaid,
        totalAmount: Number(amountSummary._sum.amount ?? 0),
        totalShipping: Number(shippingSummary._sum.shipping ?? 0),
        totalQuantity: quantitySummary._sum.quantity ?? 0,
        totalWeight: Number(weightSummary._sum.weight ?? 0),
        totalProfit: Number(profitSummary._sum.profit ?? 0),
        totalLoss: Number(lossSummary._sum.loss ?? 0)
      }
    };
  } catch (error) {
    console.error("GET WHOLESALES ERROR:", error);
    throw new Error("Failed to fetch wholesales");
  }
};
var getSingleWholesale = async (id) => {
  try {
    const result = await prisma.wholesale.findUnique({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("GET SINGLE WHOLESALE ERROR:", error);
    throw new Error("Failed to fetch wholesale");
  }
};
var updateWholesale = async (id, payload) => {
  try {
    const data = {
      ...payload
    };
    if (payload.date) {
      data.date = new Date(payload.date);
    }
    const result = await prisma.wholesale.update({
      where: {
        id
      },
      data
    });
    return result;
  } catch (error) {
    console.error("UPDATE WHOLESALE ERROR:", error);
    throw new Error("Failed to update wholesale");
  }
};
var deleteWholesale = async (id) => {
  try {
    const result = await prisma.wholesale.delete({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("DELETE WHOLESALE ERROR:", error);
    throw new Error("Failed to delete wholesale");
  }
};
var wholesaleService = {
  createWholesale,
  getAllWholesales,
  getSingleWholesale,
  updateWholesale,
  deleteWholesale
};

// src/app/modules/accounts/wholesale/wholesale.controller.ts
var createWholesale2 = catchAsync(async (req, res) => {
  const result = await wholesaleService.createWholesale(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Wholesale created successfully",
    data: result
  });
});
var getAllWholesales2 = catchAsync(async (req, res) => {
  const result = await wholesaleService.getAllWholesales({
    search: req.query.search,
    status: req.query.status,
    productName: req.query.productName,
    courierChina: req.query.courierChina,
    page: req.query.page,
    limit: req.query.limit
  });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Wholesales retrieved successfully",
    data: result
  });
});
var getSingleWholesale2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await wholesaleService.getSingleWholesale(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Wholesale retrieved successfully",
    data: result
  });
});
var updateWholesale2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await wholesaleService.updateWholesale(id, req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Wholesale updated successfully",
    data: result
  });
});
var deleteWholesale2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await wholesaleService.deleteWholesale(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Wholesale deleted successfully",
    data: result
  });
});
var wholesaleController = {
  createWholesale: createWholesale2,
  getAllWholesales: getAllWholesales2,
  getSingleWholesale: getSingleWholesale2,
  updateWholesale: updateWholesale2,
  deleteWholesale: deleteWholesale2
};

// src/app/modules/accounts/wholesale/wholesale.route.ts
var router13 = Router10();
router13.post(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.createWholesale
);
router13.get(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.getAllWholesales
);
router13.get(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.getSingleWholesale
);
router13.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.updateWholesale
);
router13.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.deleteWholesale
);
var WholesaleRoutes = router13;

// src/app/modules/accounts/monthly-cost/monthly-cost.route.ts
import { Router as Router11 } from "express";

// src/app/modules/accounts/monthly-cost/monthly-cost.service.ts
var createMonthlyCost = async (payload) => {
  try {
    const result = await prisma.fixedMonthlyCost.create({
      data: {
        date: new Date(payload.date),
        description: payload.description,
        amount: payload.amount,
        status: payload.status ?? "UNPAID"
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE FIXED MONTHLY COST ERROR:", error);
    throw new Error("Failed to create fixed monthly cost");
  }
};
var getAllMonthlyCosts = async (query) => {
  try {
    const { search, status: status3, page = "1", limit = "10" } = query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);
    const skip = (currentPage - 1) * currentLimit;
    const where = {};
    if (search) {
      where.description = {
        contains: search,
        mode: "insensitive"
      };
    }
    if (status3) {
      where.status = status3;
    }
    const [data, total] = await Promise.all([
      prisma.fixedMonthlyCost.findMany({
        where,
        orderBy: {
          date: "desc"
        },
        skip,
        take: currentLimit
      }),
      prisma.fixedMonthlyCost.count({
        where
      })
    ]);
    const [totalCosts, paid, unpaid, amountSummary] = await Promise.all([
      prisma.fixedMonthlyCost.count(),
      prisma.fixedMonthlyCost.count({
        where: {
          status: "PAID"
        }
      }),
      prisma.fixedMonthlyCost.count({
        where: {
          status: "UNPAID"
        }
      }),
      prisma.fixedMonthlyCost.aggregate({
        _sum: {
          amount: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / currentLimit);
    return {
      data,
      meta: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        totalCosts,
        paid,
        unpaid,
        totalAmount: Number(amountSummary._sum.amount ?? 0)
      }
    };
  } catch (error) {
    console.error("GET FIXED MONTHLY COSTS ERROR:", error);
    throw new Error("Failed to fetch fixed monthly costs");
  }
};
var getSingleMonthlyCost = async (id) => {
  try {
    const result = await prisma.fixedMonthlyCost.findUnique({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("GET SINGLE FIXED MONTHLY COST ERROR:", error);
    throw new Error("Failed to fetch fixed monthly cost");
  }
};
var updateMonthlyCost = async (id, payload) => {
  try {
    const data = {
      ...payload
    };
    if (payload.date) {
      data.date = new Date(payload.date);
    }
    const result = await prisma.fixedMonthlyCost.update({
      where: {
        id
      },
      data
    });
    return result;
  } catch (error) {
    console.error("UPDATE FIXED MONTHLY COST ERROR:", error);
    throw new Error("Failed to update fixed monthly cost");
  }
};
var deleteMonthlyCost = async (id) => {
  try {
    const result = await prisma.fixedMonthlyCost.delete({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("DELETE FIXED MONTHLY COST ERROR:", error);
    throw new Error("Failed to delete fixed monthly cost");
  }
};
var monthlyCostService = {
  createMonthlyCost,
  getAllMonthlyCosts,
  getSingleMonthlyCost,
  updateMonthlyCost,
  deleteMonthlyCost
};

// src/app/modules/accounts/monthly-cost/monthly-cost.controller.ts
var createMonthlyCost2 = catchAsync(async (req, res) => {
  const result = await monthlyCostService.createMonthlyCost(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: " monthly cost created successfully",
    data: result
  });
});
var getAllMonthlyCosts2 = catchAsync(async (req, res) => {
  const result = await monthlyCostService.getAllMonthlyCosts({
    search: req.query.search,
    status: req.query.status,
    page: req.query.page,
    limit: req.query.limit
  });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: " monthly costs retrieved successfully",
    data: result
  });
});
var getSingleMonthlyCost2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await monthlyCostService.getSingleMonthlyCost(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: " monthly cost retrieved successfully",
    data: result
  });
});
var updateMonthlyCost2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await monthlyCostService.updateMonthlyCost(
    id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: " monthly cost updated successfully",
    data: result
  });
});
var deleteMonthlyCost2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await monthlyCostService.deleteMonthlyCost(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: " monthly cost deleted successfully",
    data: result
  });
});
var MonthlyCostController = {
  createMonthlyCost: createMonthlyCost2,
  getAllMonthlyCosts: getAllMonthlyCosts2,
  getSingleMonthlyCost: getSingleMonthlyCost2,
  updateMonthlyCost: updateMonthlyCost2,
  deleteMonthlyCost: deleteMonthlyCost2
};

// src/app/modules/accounts/monthly-cost/monthly-cost.route.ts
var router14 = Router11();
router14.post(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.createMonthlyCost
);
router14.get(
  "/",
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.getAllMonthlyCosts
);
router14.get(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.getSingleMonthlyCost
);
router14.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.updateMonthlyCost
);
router14.delete(
  "/:id",
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.deleteMonthlyCost
);
var MonthlyCostRoutes = router14;

// src/app/routes/index.ts
var router15 = Router12();
router15.use("/users", UserRoute);
router15.use("/products", ProductRoutes);
router15.use("/orders", OrderRoutes);
router15.use("/cart", CartRoute);
router15.use("/chatbot", ChatbotRoutes);
router15.use("/wishlist", WishlistRoutes);
router15.use("/categories", categoryRoutes);
router15.use("/heroes", HeroRoutes);
router15.use("/personal-entries", PersonalEntryRoutes);
router15.use("/steadfast-withdrawals", SteadfastWithdrawalRoutes);
router15.use("/investor-payments", InvestorPaymentRoutes);
router15.use("/shipments", ShipmentRoutes);
router15.use("/wholesales", WholesaleRoutes);
router15.use("/monthly-costs", MonthlyCostRoutes);
var routes_default = router15;

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
    "https://www.seraplace.com",
    "www.seraplace.com",
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
