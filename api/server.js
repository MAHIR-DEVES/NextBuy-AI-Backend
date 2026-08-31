var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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
import { Router as Router15 } from "express";

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
  "inlineSchema": 'model InvestorPayment {\n  id String @id @default(cuid())\n\n  date        DateTime\n  description String\n\n  amount Decimal @db.Decimal(12, 2)\n\n  status InvestorPaymentStatus @default(PAID)\n\n  investorName String\n\n  investedAmount Decimal @db.Decimal(12, 2)\n  receivedAmount Decimal @db.Decimal(12, 2)\n\n  paymentBy   String\n  referenceBy String\n  platform    String\n\n  investmentStatus InvestmentStatus @default(RUNNING)\n\n  monthsPaid Int @default(0)\n\n  buyProducts String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("investor_payments")\n}\n\n// account\nenum PersonalEntryStatus {\n  PAID\n  UNPAID\n  RECEIVED\n}\n\nenum PersonalEntryType {\n  COST\n  RECEIVED\n}\n\nenum ClearanceStatus {\n  COMPLETED\n  PENDING\n}\n\nenum AccountType {\n  PERSONAL\n  CENTRAL\n}\n\nenum SteadfastWithdrawalStatus {\n  PAID\n  UNPAID\n}\n\nenum SteadfastWithdrawalClearanceStatus {\n  COMPLETED\n  PENDING\n}\n\nenum InvestorPaymentStatus {\n  PAID\n  UNPAID\n}\n\nenum InvestmentStatus {\n  RUNNING\n  COMPLETED\n}\n\nenum WholesaleStatus {\n  PAID\n  UNPAID\n}\n\nenum FixedMonthlyCostStatus {\n  PAID\n  UNPAID\n}\n\nmodel FixedMonthlyCost {\n  id          String                 @id @default(uuid())\n  date        DateTime\n  description String\n  amount      Decimal                @db.Decimal(12, 2)\n  status      FixedMonthlyCostStatus @default(UNPAID)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("fixed_monthly_costs")\n}\n\nmodel PersonalEntry {\n  id String @id @default(cuid())\n\n  date        DateTime\n  description String\n  amount      Decimal  @db.Decimal(12, 2)\n\n  status PersonalEntryStatus\n  type   PersonalEntryType\n\n  quantity       Int?\n  priceRmb       Decimal? @db.Decimal(12, 2)\n  shippingCharge Decimal? @db.Decimal(12, 2)\n\n  paidReceivedBy String?\n  platform       String?\n\n  clearanceStatus ClearanceStatus @default(PENDING)\n\n  accountType AccountType @default(PERSONAL)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("personal_entries")\n}\n\nenum ShipmentStatus {\n  PAID\n  UNPAID\n}\n\nenum ShippingStatus {\n  PROCESSING\n  COMPLETED\n}\n\nmodel Shipment {\n  id String @id @default(uuid())\n\n  date        DateTime\n  description String?\n  amount      Decimal        @db.Decimal(12, 2)\n  status      ShipmentStatus\n\n  productName String\n  quantity    Int\n\n  shippingCompany String\n  weight          Decimal @db.Decimal(10, 2)\n  perKgRate       Decimal @db.Decimal(10, 2)\n  shippingCharge  Decimal @db.Decimal(12, 2)\n\n  billingStatus  ShipmentStatus\n  shippingStatus ShippingStatus\n\n  receivingDate DateTime?\n\n  investorName String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("shipment-records")\n}\n\nmodel SteadfastWithdrawal {\n  id              String                             @id @default(cuid())\n  date            DateTime\n  description     String\n  amount          Decimal                            @db.Decimal(12, 2)\n  status          SteadfastWithdrawalStatus          @default(PAID)\n  withdrawBy      String\n  paymentMethod   String\n  clearanceStatus SteadfastWithdrawalClearanceStatus @default(PENDING)\n  createdAt       DateTime                           @default(now())\n  updatedAt       DateTime                           @updatedAt\n\n  @@map("steadfast_withdrawals")\n}\n\nmodel Wholesale {\n  id String @id @default(uuid())\n\n  date        DateTime\n  description String?\n  amount      Decimal         @db.Decimal(12, 2)\n  status      WholesaleStatus @default(UNPAID)\n\n  productName String\n  quantity    Int\n\n  priceRmb  Decimal @db.Decimal(12, 2)\n  priceTaka Decimal @db.Decimal(12, 2)\n\n  weight    Decimal @db.Decimal(12, 2)\n  costPerKg Decimal @db.Decimal(12, 2)\n\n  shipping     Decimal @db.Decimal(12, 2)\n  courierChina String?\n\n  note String?\n\n  onePairPrice Decimal @db.Decimal(12, 2)\n  salePrice    Decimal @db.Decimal(12, 2)\n\n  loss   Decimal @default(0) @db.Decimal(12, 2)\n  profit Decimal @default(0) @db.Decimal(12, 2)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("wholesale-records")\n}\n\nmodel Cart {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  quantity Int @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([userId, productId]) // same product duplicate \u09A8\u09BE \u09B9\u09DF\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String\n  slug        String  @unique\n  description String?\n  image       String?\n\n  isActive Boolean @default(true)\n\n  products Product[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  CUSTOMER\n  ADMIN\n  SELLER\n  SUPER_ADMIN\n}\n\nenum STATUS {\n  ACTIVE\n  INACTIVE\n  BLOCKED\n}\n\nenum OrderStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  PARTIAL\n}\n\nmodel Hero {\n  id String @id @default(uuid())\n\n  offer  Json\n  banner Json\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Order {\n  id String @id @default(uuid())\n\n  userId String?\n  user   User?   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  total  Float\n  status OrderStatus @default(PENDING)\n\n  // Customer Information\n  name     String\n  phone    String\n  district String\n  thana    String\n  address  String\n  note     String?\n\n  // Shipping\n  isInsideDhaka Boolean\n  shippingFee   Float   @default(0)\n\n  // Relations\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id String @id @default(uuid())\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  name     String // snapshot\n  price    Float // snapshot\n  quantity Int\n\n  size  String?\n  color String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Product {\n  id          String  @id @default(uuid())\n  name        String\n  slug        String  @unique\n  description String?\n\n  // BASIC INFORMATION\n\n  brand      String?\n  categoryId String\n\n  category Category @relation(fields: [categoryId], references: [id])\n\n  tags String[] @default([])\n\n  // MEDIA\n\n  thumbnail String\n  images    String[] @default([])\n  videoUrl  String?\n\n  // SPECIFICATION\n\n  model    String?\n  material String?\n\n  // PRICING & STOCK\n\n  price        Float\n  specialPrice Float?\n  discount     Float?\n  stock        Int    @default(0)\n\n  // SHIPPING\n\n  weight Float?\n\n  // Example:\n  // {\n  //   "length": 30,\n  //   "width": 20,\n  //   "height": 10\n  // }\n  dimensions Json?\n\n  dangerousGoods Boolean @default(false)\n\n  // WARRANTY\n\n  warrantyType   String?\n  warrantyPeriod String?\n\n  // PRODUCT HIGHLIGHTS\n\n  highlights String[] @default([])\n\n  // PRODUCT RATING & REVIEWS\n  // Review data will be managed from Review module\n\n  rating      Float @default(0)\n  reviewCount Int   @default(0)\n\n  // PRODUCT ENGAGEMENT\n\n  viewCount Int @default(0)\n  likeCount Int @default(0)\n\n  // PRODUCT STATUS\n\n  isFeatured  Boolean @default(false)\n  isPublished Boolean @default(true)\n\n  // COLOR VARIANTS\n\n  colorVariants ProductColorVariant[]\n\n  // REVIEWS\n  // Relation with separate Review model/module\n\n  reviews Review[]\n\n  // EXISTING RELATIONS\n\n  orderItems OrderItem[]\n  carts      Cart[]\n  wishlist   Wishlist[]\n\n  // TIMESTAMPS\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel ProductColorVariant {\n  id        String @id @default(uuid())\n  productId String\n\n  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  // Example:\n  // Green\n  // Black\n  // Red\n\n  color String\n\n  // Color-specific image\n\n  image String?\n\n  // Sizes of this color\n\n  sizes ProductSizeVariant[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel ProductSizeVariant {\n  id             String @id @default(uuid())\n  colorVariantId String\n\n  colorVariant ProductColorVariant @relation(fields: [colorVariantId], references: [id], onDelete: Cascade)\n\n  // Example:\n  // 36\n  // 38\n  // 40\n  // XL\n  // XXL\n\n  size String\n\n  price        Float\n  specialPrice Float?\n  stock        Int    @default(0)\n\n  // Example:\n  // GREEN-36\n  // BLACK-40\n\n  sku String @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([colorVariantId, size])\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  // PRODUCT RELATION\n\n  productId String\n\n  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  // REVIEWER INFORMATION\n\n  userId String?\n\n  userName String?\n\n  userAvatar String?\n\n  // REVIEW CONTENT\n\n  rating  Int\n  comment String?\n\n  // REVIEW ENGAGEMENT\n\n  likeCount Int @default(0)\n\n  // REVIEW STATUS\n\n  isPublished Boolean @default(true)\n\n  // TIMESTAMPS\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // INDEXES\n\n  @@index([productId])\n  @@index([rating])\n  @@index([createdAt])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id       String  @id @default(uuid())\n  name     String\n  email    String  @unique\n  password String\n  phone    String? @unique\n  avatar   String?\n\n  role   Role   @default(CUSTOMER)\n  status STATUS @default(ACTIVE)\n\n  address String?\n  city    String?\n  country String?\n\n  lastLogin     DateTime?\n  emailVerified Boolean   @default(false)\n  provider      String? // google, email\n\n  // Relations\n  orders   Order[]\n  carts    Cart[]\n  wishlist Wishlist[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Wishlist {\n  id String @id @default(uuid())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, productId]) // duplicate wishlist prevent\n}\n',
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
config.runtimeDataModel = JSON.parse('{"models":{"InvestorPayment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"InvestorPaymentStatus"},{"name":"investorName","kind":"scalar","type":"String"},{"name":"investedAmount","kind":"scalar","type":"Decimal"},{"name":"receivedAmount","kind":"scalar","type":"Decimal"},{"name":"paymentBy","kind":"scalar","type":"String"},{"name":"referenceBy","kind":"scalar","type":"String"},{"name":"platform","kind":"scalar","type":"String"},{"name":"investmentStatus","kind":"enum","type":"InvestmentStatus"},{"name":"monthsPaid","kind":"scalar","type":"Int"},{"name":"buyProducts","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"investor_payments"},"FixedMonthlyCost":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"FixedMonthlyCostStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"fixed_monthly_costs"},"PersonalEntry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"PersonalEntryStatus"},{"name":"type","kind":"enum","type":"PersonalEntryType"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceRmb","kind":"scalar","type":"Decimal"},{"name":"shippingCharge","kind":"scalar","type":"Decimal"},{"name":"paidReceivedBy","kind":"scalar","type":"String"},{"name":"platform","kind":"scalar","type":"String"},{"name":"clearanceStatus","kind":"enum","type":"ClearanceStatus"},{"name":"accountType","kind":"enum","type":"AccountType"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"personal_entries"},"Shipment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"ShipmentStatus"},{"name":"productName","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"shippingCompany","kind":"scalar","type":"String"},{"name":"weight","kind":"scalar","type":"Decimal"},{"name":"perKgRate","kind":"scalar","type":"Decimal"},{"name":"shippingCharge","kind":"scalar","type":"Decimal"},{"name":"billingStatus","kind":"enum","type":"ShipmentStatus"},{"name":"shippingStatus","kind":"enum","type":"ShippingStatus"},{"name":"receivingDate","kind":"scalar","type":"DateTime"},{"name":"investorName","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shipment-records"},"SteadfastWithdrawal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"SteadfastWithdrawalStatus"},{"name":"withdrawBy","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"clearanceStatus","kind":"enum","type":"SteadfastWithdrawalClearanceStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"steadfast_withdrawals"},"Wholesale":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"WholesaleStatus"},{"name":"productName","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceRmb","kind":"scalar","type":"Decimal"},{"name":"priceTaka","kind":"scalar","type":"Decimal"},{"name":"weight","kind":"scalar","type":"Decimal"},{"name":"costPerKg","kind":"scalar","type":"Decimal"},{"name":"shipping","kind":"scalar","type":"Decimal"},{"name":"courierChina","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"onePairPrice","kind":"scalar","type":"Decimal"},{"name":"salePrice","kind":"scalar","type":"Decimal"},{"name":"loss","kind":"scalar","type":"Decimal"},{"name":"profit","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"wholesale-records"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"CartToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Hero":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"offer","kind":"scalar","type":"Json"},{"name":"banner","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"total","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"thana","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"isInsideDhaka","kind":"scalar","type":"Boolean"},{"name":"shippingFee","kind":"scalar","type":"Float"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"size","kind":"scalar","type":"String"},{"name":"color","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"brand","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"tags","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"videoUrl","kind":"scalar","type":"String"},{"name":"model","kind":"scalar","type":"String"},{"name":"material","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"specialPrice","kind":"scalar","type":"Float"},{"name":"discount","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"weight","kind":"scalar","type":"Float"},{"name":"dimensions","kind":"scalar","type":"Json"},{"name":"dangerousGoods","kind":"scalar","type":"Boolean"},{"name":"warrantyType","kind":"scalar","type":"String"},{"name":"warrantyPeriod","kind":"scalar","type":"String"},{"name":"highlights","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"reviewCount","kind":"scalar","type":"Int"},{"name":"viewCount","kind":"scalar","type":"Int"},{"name":"likeCount","kind":"scalar","type":"Int"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"colorVariants","kind":"object","type":"ProductColorVariant","relationName":"ProductToProductColorVariant"},{"name":"reviews","kind":"object","type":"Review","relationName":"ProductToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToProduct"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"ProductToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"ProductColorVariant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToProductColorVariant"},{"name":"color","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"sizes","kind":"object","type":"ProductSizeVariant","relationName":"ProductColorVariantToProductSizeVariant"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"ProductSizeVariant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"colorVariantId","kind":"scalar","type":"String"},{"name":"colorVariant","kind":"object","type":"ProductColorVariant","relationName":"ProductColorVariantToProductSizeVariant"},{"name":"size","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"specialPrice","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"sku","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToReview"},{"name":"userId","kind":"scalar","type":"String"},{"name":"userName","kind":"scalar","type":"String"},{"name":"userAvatar","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"likeCount","kind":"scalar","type":"Int"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"STATUS"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"lastLogin","kind":"scalar","type":"DateTime"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"provider","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"UserToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToWishlist"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToWishlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","InvestorPayment.findUnique","InvestorPayment.findUniqueOrThrow","orderBy","cursor","InvestorPayment.findFirst","InvestorPayment.findFirstOrThrow","InvestorPayment.findMany","data","InvestorPayment.createOne","InvestorPayment.createMany","InvestorPayment.createManyAndReturn","InvestorPayment.updateOne","InvestorPayment.updateMany","InvestorPayment.updateManyAndReturn","create","update","InvestorPayment.upsertOne","InvestorPayment.deleteOne","InvestorPayment.deleteMany","having","_count","_avg","_sum","_min","_max","InvestorPayment.groupBy","InvestorPayment.aggregate","FixedMonthlyCost.findUnique","FixedMonthlyCost.findUniqueOrThrow","FixedMonthlyCost.findFirst","FixedMonthlyCost.findFirstOrThrow","FixedMonthlyCost.findMany","FixedMonthlyCost.createOne","FixedMonthlyCost.createMany","FixedMonthlyCost.createManyAndReturn","FixedMonthlyCost.updateOne","FixedMonthlyCost.updateMany","FixedMonthlyCost.updateManyAndReturn","FixedMonthlyCost.upsertOne","FixedMonthlyCost.deleteOne","FixedMonthlyCost.deleteMany","FixedMonthlyCost.groupBy","FixedMonthlyCost.aggregate","PersonalEntry.findUnique","PersonalEntry.findUniqueOrThrow","PersonalEntry.findFirst","PersonalEntry.findFirstOrThrow","PersonalEntry.findMany","PersonalEntry.createOne","PersonalEntry.createMany","PersonalEntry.createManyAndReturn","PersonalEntry.updateOne","PersonalEntry.updateMany","PersonalEntry.updateManyAndReturn","PersonalEntry.upsertOne","PersonalEntry.deleteOne","PersonalEntry.deleteMany","PersonalEntry.groupBy","PersonalEntry.aggregate","Shipment.findUnique","Shipment.findUniqueOrThrow","Shipment.findFirst","Shipment.findFirstOrThrow","Shipment.findMany","Shipment.createOne","Shipment.createMany","Shipment.createManyAndReturn","Shipment.updateOne","Shipment.updateMany","Shipment.updateManyAndReturn","Shipment.upsertOne","Shipment.deleteOne","Shipment.deleteMany","Shipment.groupBy","Shipment.aggregate","SteadfastWithdrawal.findUnique","SteadfastWithdrawal.findUniqueOrThrow","SteadfastWithdrawal.findFirst","SteadfastWithdrawal.findFirstOrThrow","SteadfastWithdrawal.findMany","SteadfastWithdrawal.createOne","SteadfastWithdrawal.createMany","SteadfastWithdrawal.createManyAndReturn","SteadfastWithdrawal.updateOne","SteadfastWithdrawal.updateMany","SteadfastWithdrawal.updateManyAndReturn","SteadfastWithdrawal.upsertOne","SteadfastWithdrawal.deleteOne","SteadfastWithdrawal.deleteMany","SteadfastWithdrawal.groupBy","SteadfastWithdrawal.aggregate","Wholesale.findUnique","Wholesale.findUniqueOrThrow","Wholesale.findFirst","Wholesale.findFirstOrThrow","Wholesale.findMany","Wholesale.createOne","Wholesale.createMany","Wholesale.createManyAndReturn","Wholesale.updateOne","Wholesale.updateMany","Wholesale.updateManyAndReturn","Wholesale.upsertOne","Wholesale.deleteOne","Wholesale.deleteMany","Wholesale.groupBy","Wholesale.aggregate","user","order","products","category","product","colorVariant","sizes","colorVariants","reviews","orderItems","carts","wishlist","items","orders","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Hero.findUnique","Hero.findUniqueOrThrow","Hero.findFirst","Hero.findFirstOrThrow","Hero.findMany","Hero.createOne","Hero.createMany","Hero.createManyAndReturn","Hero.updateOne","Hero.updateMany","Hero.updateManyAndReturn","Hero.upsertOne","Hero.deleteOne","Hero.deleteMany","Hero.groupBy","Hero.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","ProductColorVariant.findUnique","ProductColorVariant.findUniqueOrThrow","ProductColorVariant.findFirst","ProductColorVariant.findFirstOrThrow","ProductColorVariant.findMany","ProductColorVariant.createOne","ProductColorVariant.createMany","ProductColorVariant.createManyAndReturn","ProductColorVariant.updateOne","ProductColorVariant.updateMany","ProductColorVariant.updateManyAndReturn","ProductColorVariant.upsertOne","ProductColorVariant.deleteOne","ProductColorVariant.deleteMany","ProductColorVariant.groupBy","ProductColorVariant.aggregate","ProductSizeVariant.findUnique","ProductSizeVariant.findUniqueOrThrow","ProductSizeVariant.findFirst","ProductSizeVariant.findFirstOrThrow","ProductSizeVariant.findMany","ProductSizeVariant.createOne","ProductSizeVariant.createMany","ProductSizeVariant.createManyAndReturn","ProductSizeVariant.updateOne","ProductSizeVariant.updateMany","ProductSizeVariant.updateManyAndReturn","ProductSizeVariant.upsertOne","ProductSizeVariant.deleteOne","ProductSizeVariant.deleteMany","ProductSizeVariant.groupBy","ProductSizeVariant.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Wishlist.findUnique","Wishlist.findUniqueOrThrow","Wishlist.findFirst","Wishlist.findFirstOrThrow","Wishlist.findMany","Wishlist.createOne","Wishlist.createMany","Wishlist.createManyAndReturn","Wishlist.updateOne","Wishlist.updateMany","Wishlist.updateManyAndReturn","Wishlist.upsertOne","Wishlist.deleteOne","Wishlist.deleteMany","Wishlist.groupBy","Wishlist.aggregate","AND","OR","NOT","id","userId","productId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","email","password","phone","avatar","Role","role","STATUS","status","address","city","country","lastLogin","emailVerified","provider","updatedAt","every","some","none","userName","userAvatar","rating","comment","likeCount","isPublished","colorVariantId","size","price","specialPrice","stock","sku","color","image","slug","description","brand","categoryId","tags","thumbnail","images","videoUrl","model","material","discount","weight","dimensions","dangerousGoods","warrantyType","warrantyPeriod","highlights","reviewCount","viewCount","isFeatured","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","has","hasEvery","hasSome","orderId","quantity","total","OrderStatus","district","thana","note","isInsideDhaka","shippingFee","offer","banner","isActive","userId_productId","colorVariantId_size","date","amount","WholesaleStatus","productName","priceRmb","priceTaka","costPerKg","shipping","courierChina","onePairPrice","salePrice","loss","profit","SteadfastWithdrawalStatus","withdrawBy","paymentMethod","SteadfastWithdrawalClearanceStatus","clearanceStatus","ShipmentStatus","shippingCompany","perKgRate","shippingCharge","billingStatus","ShippingStatus","shippingStatus","receivingDate","investorName","PersonalEntryStatus","PersonalEntryType","type","paidReceivedBy","platform","ClearanceStatus","AccountType","accountType","FixedMonthlyCostStatus","InvestorPaymentStatus","investedAmount","receivedAmount","paymentBy","referenceBy","InvestmentStatus","investmentStatus","monthsPaid","buyProducts","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "xgemAZACE6oCAADiBAAwqwIAAAQAEKwCAADiBAAwrQIBAAAAAbACQADjAwAhxAIAAOMErQMiywJAAOMDACHeAgEA3QMAIYgDQADjAwAhiQMQAKYEACGiAwEA3QMAIacDAQDdAwAhrQMQAKYEACGuAxAApgQAIa8DAQDdAwAhsAMBAN0DACGyAwAA5ASyAyKzAwIAiQQAIbQDAQDeAwAhAQAAAAEAIAEAAAABACATqgIAAOIEADCrAgAABAAQrAIAAOIEADCtAgEA3QMAIbACQADjAwAhxAIAAOMErQMiywJAAOMDACHeAgEA3QMAIYgDQADjAwAhiQMQAKYEACGiAwEA3QMAIacDAQDdAwAhrQMQAKYEACGuAxAApgQAIa8DAQDdAwAhsAMBAN0DACGyAwAA5ASyAyKzAwIAiQQAIbQDAQDeAwAhAbQDAADuBAAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACADAAAABAAgAwAABQAwBAAAAQAgEK0CAQAAAAGwAkAAAAABxAIAAACtAwLLAkAAAAAB3gIBAAAAAYgDQAAAAAGJAxAAAAABogMBAAAAAacDAQAAAAGtAxAAAAABrgMQAAAAAa8DAQAAAAGwAwEAAAABsgMAAACyAwKzAwIAAAABtAMBAAAAAQEIAAAJACAQrQIBAAAAAbACQAAAAAHEAgAAAK0DAssCQAAAAAHeAgEAAAABiANAAAAAAYkDEAAAAAGiAwEAAAABpwMBAAAAAa0DEAAAAAGuAxAAAAABrwMBAAAAAbADAQAAAAGyAwAAALIDArMDAgAAAAG0AwEAAAABAQgAAAsAMAEIAAALADAQrQIBAOgEACGwAkAA6QQAIcQCAACDB60DIssCQADpBAAh3gIBAOgEACGIA0AA6QQAIYkDEADdBgAhogMBAOgEACGnAwEA6AQAIa0DEADdBgAhrgMQAN0GACGvAwEA6AQAIbADAQDoBAAhsgMAAIQHsgMiswMCAJAFACG0AwEA8gQAIQIAAAABACAIAAAOACAQrQIBAOgEACGwAkAA6QQAIcQCAACDB60DIssCQADpBAAh3gIBAOgEACGIA0AA6QQAIYkDEADdBgAhogMBAOgEACGnAwEA6AQAIa0DEADdBgAhrgMQAN0GACGvAwEA6AQAIbADAQDoBAAhsgMAAIQHsgMiswMCAJAFACG0AwEA8gQAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAAP4GACAWAAD_BgAgFwAAggcAIBgAAIEHACAZAACABwAgtAMAAO4EACATqgIAANsEADCrAgAAFwAQrAIAANsEADCtAgEAxAMAIbACQADFAwAhxAIAANwErQMiywJAAMUDACHeAgEAxAMAIYgDQADFAwAhiQMQAJ8EACGiAwEAxAMAIacDAQDEAwAhrQMQAJ8EACGuAxAAnwQAIa8DAQDEAwAhsAMBAMQDACGyAwAA3QSyAyKzAwIA6AMAIbQDAQDMAwAhAwAAAAQAIAMAABYAMBQAABcAIAMAAAAEACADAAAFADAEAAABACAKqgIAANkEADCrAgAAHQAQrAIAANkEADCtAgEAAAABsAJAAOMDACHEAgAA2gSsAyLLAkAA4wMAId4CAQDdAwAhiANAAOMDACGJAxAApgQAIQEAAAAaACABAAAAGgAgCqoCAADZBAAwqwIAAB0AEKwCAADZBAAwrQIBAN0DACGwAkAA4wMAIcQCAADaBKwDIssCQADjAwAh3gIBAN0DACGIA0AA4wMAIYkDEACmBAAhAAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgAwAAAB0AIAMAAB4AMAQAABoAIAetAgEAAAABsAJAAAAAAcQCAAAArAMCywJAAAAAAd4CAQAAAAGIA0AAAAABiQMQAAAAAQEIAAAiACAHrQIBAAAAAbACQAAAAAHEAgAAAKwDAssCQAAAAAHeAgEAAAABiANAAAAAAYkDEAAAAAEBCAAAJAAwAQgAACQAMAetAgEA6AQAIbACQADpBAAhxAIAAP0GrAMiywJAAOkEACHeAgEA6AQAIYgDQADpBAAhiQMQAN0GACECAAAAGgAgCAAAJwAgB60CAQDoBAAhsAJAAOkEACHEAgAA_QasAyLLAkAA6QQAId4CAQDoBAAhiANAAOkEACGJAxAA3QYAIQIAAAAdACAIAAApACACAAAAHQAgCAAAKQAgAwAAABoAIA8AACIAIBAAACcAIAEAAAAaACABAAAAHQAgBRUAAPgGACAWAAD5BgAgFwAA_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-ACAPAACGAQAgEAAAiwEAIAEAAAB-ACABAAAAgQEAIAgVAADYBgAgFgAA2QYAIBcAANwGACAYAADbBgAgGQAA2gYAIN4CAADuBAAggAMAAO4EACCQAwAA7gQAIBeqAgAAngQAMKsCAACUAQAQrAIAAJ4EADCtAgEAxAMAIbACQADFAwAhxAIAAKAEiwMiywJAAMUDACHeAgEAzAMAIegCEACfBAAh-wICAOgDACGAAwEAzAMAIYgDQADFAwAhiQMQAJ8EACGLAwEAxAMAIYwDEACfBAAhjQMQAJ8EACGOAxAAnwQAIY8DEACfBAAhkAMBAMwDACGRAxAAnwQAIZIDEACfBAAhkwMQAJ8EACGUAxAAnwQAIQMAAACBAQAgAwAAkwEAMBQAAJQBACADAAAAgQEAIAMAAIIBADAEAAB-ACAMbAAAhgQAIHAAAIcEACCqAgAAiAQAMKsCAAC2AQAQrAIAAIgEADCtAgEAAAABrgIBAN0DACGvAgEA3QMAIbACQADjAwAhywJAAOMDACH7AgIAiQQAIYYDAACdBAAgAQAAAJcBACATbAAAnAQAIHgAAJcEACCqAgAAmgQAMKsCAACZAQAQrAIAAJoEADCtAgEA3QMAIa4CAQDeAwAhsAJAAOMDACG8AgEA3QMAIb8CAQDdAwAhxAIAAJsE_gIixQIBAN0DACHLAkAA4wMAIfwCCACNBAAh_gIBAN0DACH_AgEA3QMAIYADAQDeAwAhgQMgAOIDACGCAwgAjQQAIQRsAADPBgAgeAAA1gYAIK4CAADuBAAggAMAAO4EACATbAAAnAQAIHgAAJcEACCqAgAAmgQAMKsCAACZAQAQrAIAAJoEADCtAgEAAAABrgIBAN4DACGwAkAA4wMAIbwCAQDdAwAhvwIBAN0DACHEAgAAmwT-AiLFAgEA3QMAIcsCQADjAwAh_AIIAI0EACH-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_AUAIHAAAJQFACCtAgEAAAABrgIBAAAAAa8CAQAAAAGwAkAAAAABywJAAAAAAfsCAgAAAAEBCAAAzAEAIAatAgEAAAABrgIBAAAAAa8CAQAAAAGwAkAAAAABywJAAAAAAfsCAgAAAAEBCAAAzgEAMAEIAADOAQAwCGwAAPoFACBwAACSBQAgrQIBAOgEACGuAgEA6AQAIa8CAQDoBAAhsAJAAOkEACHLAkAA6QQAIfsCAgCQBQAhAgAAAJcBACAIAADRAQAgBq0CAQDoBAAhrgIBAOgEACGvAgEA6AQAIbACQADpBAAhywJAAOkEACH7AgIAkAUAIQIAAAC2AQAgCAAA0wEAIAIAAAC2AQAgCAAA0wEAIAMAAACXAQAgDwAAzAEAIBAAANEBACABAAAAlwEAIAEAAAC2AQAgBRUAAMoGACAWAADLBgAgFwAAzgYAIBgAAM0GACAZAADMBgAgCaoCAACDBAAwqwIAANoBABCsAgAAgwQAMK0CAQDEAwAhrgIBAMQDACGvAgEAxAMAIbACQADFAwAhywJAAMUDACH7AgIA6AMAIQMAAAC2AQAgAwAA2QEAMBQAANoBACADAAAAtgEAIAMAALcBADAEAACXAQAgDG4AAIIEACCqAgAAgQQAMKsCAADgAQAQrAIAAIEEADCtAgEAAAABsAJAAOMDACG8AgEA3QMAIcsCQADjAwAh3AIBAN4DACHdAgEAAAAB3gIBAN4DACGFAyAA4gMAIQEAAADdAQAgAQAAAN0BACAMbgAAggQAIKoCAACBBAAwqwIAAOABABCsAgAAgQQAMK0CAQDdAwAhsAJAAOMDACG8AgEA3QMAIcsCQADjAwAh3AIBAN4DACHdAgEA3QMAId4CAQDeAwAhhQMgAOIDACEDbgAAyQYAINwCAADuBAAg3gIAAO4EACADAAAA4AEAIAMAAOEBADAEAADdAQAgAwAAAOABACADAADhAQAwBAAA3QEAIAMAAADgAQAgAwAA4QEAMAQAAN0BACAJbgAAyAYAIK0CAQAAAAGwAkAAAAABvAIBAAAAAcsCQAAAAAHcAgEAAAAB3QIBAAAAAd4CAQAAAAGFAyAAAAABAQgAAOUBACAIrQIBAAAAAbACQAAAAAG8AgEAAAABywJAAAAAAdwCAQAAAAHdAgEAAAAB3gIBAAAAAYUDIAAAAAEBCAAA5wEAMAEIAADnAQAwCW4AALsGACCtAgEA6AQAIbACQADpBAAhvAIBAOgEACHLAkAA6QQAIdwCAQDyBAAh3QIBAOgEACHeAgEA8gQAIYUDIAD2BAAhAgAAAN0BACAIAADqAQAgCK0CAQDoBAAhsAJAAOkEACG8AgEA6AQAIcsCQADpBAAh3AIBAPIEACHdAgEA6AQAId4CAQDyBAAhhQMgAPYEACECAAAA4AEAIAgAAOwBACACAAAA4AEAIAgAAOwBACADAAAA3QEAIA8AAOUBACAQAADqAQAgAQAAAN0BACABAAAA4AEAIAUVAAC4BgAgGAAAugYAIBkAALkGACDcAgAA7gQAIN4CAADuBAAgC6oCAACABAAwqwIAAPMBABCsAgAAgAQAMK0CAQDEAwAhsAJAAMUDACG8AgEAxAMAIcsCQADFAwAh3AIBAMwDACHdAgEAxAMAId4CAQDMAwAhhQMgANADACEDAAAA4AEAIAMAAPIBADAUAADzAQAgAwAAAOABACADAADhAQAwBAAA3QEAIAiqAgAA_gMAMKsCAAD5AQAQrAIAAP4DADCtAgEAAAABsAJAAOMDACHLAkAA4wMAIYMDAAD_AwAghAMAAP8DACABAAAA9gEAIAEAAAD2AQAgCKoCAAD-AwAwqwIAAPkBABCsAgAA_gMAMK0CAQDdAwAhsAJAAOMDACHLAkAA4wMAIYMDAAD_AwAghAMAAP8DACAAAwAAAPkBACADAAD6AQAwBAAA9gEAIAMAAAD5AQAgAwAA-gEAMAQAAPYBACADAAAA-QEAIAMAAPoBADAEAAD2AQAgBa0CAQAAAAGwAkAAAAABywJAAAAAAYMDgAAAAAGEA4AAAAABAQgAAP4BACAFrQIBAAAAAbACQAAAAAHLAkAAAAABgwOAAAAAAYQDgAAAAAEBCAAAgAIAMAEIAACAAgAwBa0CAQDoBAAhsAJAAOkEACHLAkAA6QQAIYMDgAAAAAGEA4AAAAABAgAAAPYBACAIAACDAgAgBa0CAQDoBAAhsAJAAOkEACHLAkAA6QQAIYMDgAAAAAGEA4AAAAABAgAAAPkBACAIAACFAgAgAgAAAPkBACAIAACFAgAgAwAAAPYBACAPAAD-AQAgEAAAgwIAIAEAAAD2AQAgAQAAAPkBACADFQAAtQYAIBgAALcGACAZAAC2BgAgCKoCAAD7AwAwqwIAAIwCABCsAgAA-wMAMK0CAQDEAwAhsAJAAMUDACHLAkAAxQMAIYMDAAD8AwAghAMAAPwDACADAAAA-QEAIAMAAIsCADAUAACMAgAgAwAAAPkBACADAAD6AQAwBAAA9gEAIAEAAACbAQAgAQAAAJsBACADAAAAmQEAIAMAAJoBADAEAACbAQAgAwAAAJkBACADAACaAQAwBAAAmwEAIAMAAACZAQAgAwAAmgEAMAQAAJsBACAQbAAAtAYAIHgAALIFACCtAgEAAAABrgIBAAAAAbACQAAAAAG8AgEAAAABvwIBAAAAAcQCAAAA_gICxQIBAAAAAcsCQAAAAAH8AggAAAAB_gIBAAAAAf8CAQAAAAGAAwEAAAABgQMgAAAAAYIDCAAAAAEBCAAAlAIAIA6tAgEAAAABrgIBAAAAAbACQAAAAAG8AgEAAAABvwIBAAAAAcQCAAAA_gICxQIBAAAAAcsCQAAAAAH8AggAAAAB_gIBAAAAAf8CAQAAAAGAAwEAAAABgQMgAAAAAYIDCAAAAAEBCAAAlgIAMAEIAACWAgAwAQAAAJ0BACAQbAAAswYAIHgAAKIFACCtAgEA6AQAIa4CAQDyBAAhsAJAAOkEACG8AgEA6AQAIb8CAQDoBAAhxAIAAKAF_gIixQIBAOgEACHLAkAA6QQAIfwCCACfBQAh_gIBAOgEACH_AgEA6AQAIYADAQDyBAAhgQMgAPYEACGCAwgAnwUAIQIAAACbAQAgCAAAmgIAIA6tAgEA6AQAIa4CAQDyBAAhsAJAAOkEACG8AgEA6AQAIb8CAQDoBAAhxAIAAKAF_gIixQIBAOgEACHLAkAA6QQAIfwCCACfBQAh_gIBAOgEACH_AgEA6AQAIYADAQDyBAAhgQMgAPYEACGCAwgAnwUAIQIAAACZAQAgCAAAnAIAIAIAAACZAQAgCAAAnAIAIAEAAACdAQAgAwAAAJsBACAPAACUAgAgEAAAmgIAIAEAAACbAQAgAQAAAJkBACAHFQAArgYAIBYAAK8GACAXAACyBgAgGAAAsQYAIBkAALAGACCuAgAA7gQAIIADAADuBAAgEaoCAAD3AwAwqwIAAKQCABCsAgAA9wMAMK0CAQDEAwAhrgIBAMwDACGwAkAAxQMAIbwCAQDEAwAhvwIBAMQDACHEAgAA-AP-AiLFAgEAxAMAIcsCQADFAwAh_AIIAOwDACH-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_AIAEKwCAADrAwAwrQIBAMQDACGwAkAAxQMAIcsCQADFAwAh1QIBAMQDACHWAgEAxAMAIdcCCADsAwAh2AIIAO0DACHZAgIA6AMAIdoCAQDEAwAhAwAAAKwBACADAAD7AgAwFAAA_AIAIAMAAACsAQAgAwAArQEAMAQAAK4BACABAAAAswEAIAEAAACzAQAgAwAAALEBACADAACyAQAwBAAAswEAIAMAAACxAQAgAwAAsgEAMAQAALMBACADAAAAsQEAIAMAALIBADAEAACzAQAgDHAAAL8FACCtAgEAAAABrgIBAAAAAa8CAQAAAAGwAkAAAAABywJAAAAAAc8CAQAAAAHQAgEAAAAB0QICAAAAAdICAQAAAAHTAgIAAAAB1AIgAAAAAQEIAACEAwAgC60CAQAAAAGuAgEAAAABrwIBAAAAAbACQAAAAAHLAkAAAAABzwIBAAAAAdACAQAAAAHRAgIAAAAB0gIBAAAAAdMCAgAAAAHUAiAAAAABAQgAAIYDADABCAAAhgMAMAxwAAC-BQAgrQIBAOgEACGuAgEA8gQAIa8CAQDoBAAhsAJAAOkEACHLAkAA6QQAIc8CAQDyBAAh0AIBAPIEACHRAgIAkAUAIdICAQDyBAAh0wICAJAFACHUAiAA9gQAIQIAAACzAQAgCAAAiQMAIAutAgEA6AQAIa4CAQDyBAAhrwIBAOgEACGwAkAA6QQAIcsCQADpBAAhzwIBAPIEACHQAgEA8gQAIdECAgCQBQAh0gIBAPIEACHTAgIAkAUAIdQCIAD2BAAhAgAAALEBACAIAACLAwAgAgAAALEBACAIAACLAwAgAwAAALMBACAPAACEAwAgEAAAiQMAIAEAAACzAQAgAQAAALEBACAJFQAAuQUAIBYAALoFACAXAAC9BQAgGAAAvAUAIBkAALsFACCuAgAA7gQAIM8CAADuBAAg0AIAAO4EACDSAgAA7gQAIA6qAgAA5wMAMKsCAACSAwAQrAIAAOcDADCtAgEAxAMAIa4CAQDMAwAhrwIBAMQDACGwAkAAxQMAIcsCQADFAwAhzwIBAMwDACHQAgEAzAMAIdECAgDoAwAh0gIBAMwDACHTAgIA6AMAIdQCIADQAwAhAwAAALEBACADAACRAwAwFAAAkgMAIAMAAACxAQAgAwAAsgEAMAQAALMBACAWdgAA5QMAIHcAAOYDACB5AADkAwAgqgIAANwDADCrAgAAnQEAEKwCAADcAwAwrQIBAAAAAbACQADjAwAhvAIBAN0DACG9AgEAAAABvgIBAN0DACG_AgEAAAABwAIBAN4DACHCAgAA3wPCAiLEAgAA4APEAiLFAgEA3gMAIcYCAQDeAwAhxwIBAN4DACHIAkAA4QMAIckCIADiAwAhygIBAN4DACHLAkAA4wMAIQEAAACVAwAgAQAAAJUDACAKdgAAtwUAIHcAALgFACB5AAC2BQAgvwIAAO4EACDAAgAA7gQAIMUCAADuBAAgxgIAAO4EACDHAgAA7gQAIMgCAADuBAAgygIAAO4EACADAAAAnQEAIAMAAJgDADAEAACVAwAgAwAAAJ0BACADAACYAwAwBAAAlQMAIAMAAACdAQAgAwAAmAMAMAQAAJUDACATdgAAtAUAIHcAALUFACB5AACzBQAgrQIBAAAAAbACQAAAAAG8AgEAAAABvQIBAAAAAb4CAQAAAAG_AgEAAAABwAIBAAAAAcICAAAAwgICxAIAAADEAgLFAgEAAAABxgIBAAAAAccCAQAAAAHIAkAAAAAByQIgAAAAAcoCAQAAAAHLAkAAAAABAQgAAJwDACAQrQIBAAAAAbACQAAAAAG8AgEAAAABvQIBAAAAAb4CAQAAAAG_AgEAAAABwAIBAAAAAcICAAAAwgICxAIAAADEAgLFAgEAAAABxgIBAAAAAccCAQAAAAHIAkAAAAAByQIgAAAAAcoCAQAAAAHLAkAAAAABAQgAAJ4DADABCAAAngMAMBN2AAD4BAAgdwAA-QQAIHkAAPcEACCtAgEA6AQAIbACQADpBAAhvAIBAOgEACG9AgEA6AQAIb4CAQDoBAAhvwIBAPIEACHAAgEA8gQAIcICAADzBMICIsQCAAD0BMQCIsUCAQDyBAAhxgIBAPIEACHHAgEA8gQAIcgCQAD1BAAhyQIgAPYEACHKAgEA8gQAIcsCQADpBAAhAgAAAJUDACAIAAChAwAgEK0CAQDoBAAhsAJAAOkEACG8AgEA6AQAIb0CAQDoBAAhvgIBAOgEACG_AgEA8gQAIcACAQDyBAAhwgIAAPMEwgIixAIAAPQExAIixQIBAPIEACHGAgEA8gQAIccCAQDyBAAhyAJAAPUEACHJAiAA9gQAIcoCAQDyBAAhywJAAOkEACECAAAAnQEAIAgAAKMDACACAAAAnQEAIAgAAKMDACADAAAAlQMAIA8AAJwDACAQAAChAwAgAQAAAJUDACABAAAAnQEAIAoVAADvBAAgGAAA8QQAIBkAAPAEACC_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_AIAEKwCAADrAwAwrQIBAMQDACGwAkAAxQMAIcsCQADFAwAh1QIBAMQDACHWAgEAxAMAIdcCCADsAwAh2AIIAO0DACHZAgIA6AMAIdoCAQDEAwAhDRUAAMcDACAWAADqAwAgFwAA6gMAIBgAAOoDACAZAADqAwAgsQIIAAAAAbICCAAAAASzAggAAAAEtAIIAAAAAbUCCAAAAAG2AggAAAABtwIIAAAAAbgCCADwAwAhDRUAANQDACAWAADvAwAgFwAA7wMAIBgAAO8DACAZAADvAwAgsQIIAAAAAbICCAAAAAWzAggAAAAFtAIIAAAAAbUCCAAAAAG2AggAAAABtwIIAAAAAbgCCADuAwAhDRUAANQDACAWAADvAwAgFwAA7wMAIBgAAO8DACAZAADvAwAgsQIIAAAAAbICCAAAAAWzAggAAAAFtAIIAAAAAbUCCAAAAAG2AggAAAABtwIIAAAAAbgCCADuAwAhCLECCAAAAAGyAggAAAAFswIIAAAABbQCCAAAAAG1AggAAAABtgIIAAAAAbcCCAAAAAG4AggA7wMAIQ0VAADHAwAgFgAA6gMAIBcAAOoDACAYAADqAwAgGQAA6gMAILECCAAAAAGyAggAAAAEswIIAAAABLQCCAAAAAG1AggAAAABtgIIAAAAAbcCCAAAAAG4AggA8AMAIQmqAgAA8QMAMKsCAADmAgAQrAIAAPEDADCtAgEAxAMAIa8CAQDEAwAhsAJAAMUDACHLAkAAxQMAIdsCAQDEAwAh3AIBAMwDACEhqgIAAPIDADCrAgAA0AIAEKwCAADyAwAwrQIBAMQDACGwAkAAxQMAIbwCAQDEAwAhywJAAMUDACHRAggA7AMAIdMCAgDoAwAh1AIgANADACHXAggA7AMAIdgCCADtAwAh2QICAOgDACHdAgEAxAMAId4CAQDMAwAh3wIBAMwDACHgAgEAxAMAIeECAADzAwAg4gIBAMQDACHjAgAA8wMAIOQCAQDMAwAh5QIBAMwDACHmAgEAzAMAIecCCADtAwAh6AIIAO0DACHpAgAA9AMAIOoCIADQAwAh6wIBAMwDACHsAgEAzAMAIe0CAADzAwAg7gICAOgDACHvAgIA6AMAIfACIADQAwAhBLECAQAAAAX3AgEAAAAB-AIBAAAABPkCAQAAAAQPFQAA1AMAIBgAAPUDACAZAAD1AwAgsQKAAAAAAbQCgAAAAAG1AoAAAAABtgKAAAAAAbcCgAAAAAG4AoAAAAAB8QIBAAAAAfICAQAAAAHzAgEAAAAB9AKAAAAAAfUCgAAAAAH2AoAAAAABDLECgAAAAAG0AoAAAAABtQKAAAAAAbYCgAAAAAG3AoAAAAABuAKAAAAAAfECAQAAAAHyAgEAAAAB8wIBAAAAAfQCgAAAAAH1AoAAAAAB9gKAAAAAAQ2qAgAA9gMAMKsCAAC6AgAQrAIAAPYDADCtAgEAxAMAIa8CAQDEAwAhsAJAAMUDACG8AgEAxAMAIcsCQADFAwAh1gIBAMwDACHXAggA7AMAIdsCAQDMAwAh-gIBAMQDACH7AgIA6AMAIRGqAgAA9wMAMKsCAACkAgAQrAIAAPcDADCtAgEAxAMAIa4CAQDMAwAhsAJAAMUDACG8AgEAxAMAIb8CAQDEAwAhxAIAAPgD_gIixQIBAMQDACHLAkAAxQMAIfwCCADsAwAh_gIBAMQDACH_AgEAxAMAIYADAQDMAwAhgQMgANADACGCAwgA7AMAIQcVAADHAwAgGAAA-gMAIBkAAPoDACCxAgAAAP4CArICAAAA_gIIswIAAAD-Agi4AgAA-QP-AiIHFQAAxwMAIBgAAPoDACAZAAD6AwAgsQIAAAD-AgKyAgAAAP4CCLMCAAAA_gIIuAIAAPkD_gIiBLECAAAA_gICsgIAAAD-AgizAgAAAP4CCLgCAAD6A_4CIgiqAgAA-wMAMKsCAACMAgAQrAIAAPsDADCtAgEAxAMAIbACQADFAwAhywJAAMUDACGDAwAA_AMAIIQDAAD8AwAgDxUAAMcDACAYAAD9AwAgGQAA_QMAILECgAAAAAG0AoAAAAABtQKAAAAAAbYCgAAAAAG3AoAAAAABuAKAAAAAAfECAQAAAAHyAgEAAAAB8wIBAAAAAfQCgAAAAAH1AoAAAAAB9gKAAAAAAQyxAoAAAAABtAKAAAAAAbUCgAAAAAG2AoAAAAABtwKAAAAAAbgCgAAAAAHxAgEAAAAB8gIBAAAAAfMCAQAAAAH0AoAAAAAB9QKAAAAAAfYCgAAAAAEIqgIAAP4DADCrAgAA-QEAEKwCAAD-AwAwrQIBAN0DACGwAkAA4wMAIcsCQADjAwAhgwMAAP8DACCEAwAA_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-AiLFAgEA3QMAIcsCQADjAwAh_AIIAI0EACH-AgEA3QMAIf8CAQDdAwAhgAMBAN4DACGBAyAA4gMAIYIDCACNBAAhtQMAAJkBACC2AwAAmQEAIBNsAACcBAAgeAAAlwQAIKoCAACaBAAwqwIAAJkBABCsAgAAmgQAMK0CAQDdAwAhrgIBAN4DACGwAkAA4wMAIbwCAQDdAwAhvwIBAN0DACHEAgAAmwT-AiLFAgEA3QMAIcsCQADjAwAh_AIIAI0EACH-AgEA3QMAIf8CAQDdAwAhgAMBAN4DACGBAyAA4gMAIYIDCACNBAAhBLECAAAA_gICsgIAAAD-AgizAgAAAP4CCLgCAAD6A_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_AwAAnAUAMAsPAACGBQAwEAAAiwUAMLcDAACHBQAwuAMAAIgFADC5AwAAiQUAILoDAACKBQAwuwMAAIoFADC8AwAAigUAML0DAACKBQAwvgMAAIwFADC_AwAAjQUAMAsPAAD6BAAwEAAA_wQAMLcDAAD7BAAwuAMAAPwEADC5AwAA_QQAILoDAAD-BAAwuwMAAP4EADC8AwAA_gQAML0DAAD-BAAwvgMAAIAFADC_AwAAgQUAMARwAADtBAAgrQIBAAAAAa8CAQAAAAGwAkAAAAABAgAAALsBACAPAACFBQAgAwAAALsBACAPAACFBQAgEAAAhAUAIAEIAAC8BwAwCmwAAIYEACBwAACHBAAgqgIAAIUEADCrAgAAuQEAEKwCAACFBAAwrQIBAAAAAa4CAQDdAwAhrwIBAN0DACGwAkAA4wMAIYYDAACEBAAgAgAAALsBACAIAACEBQAgAgAAAIIFACAIAACDBQAgB6oCAACBBQAwqwIAAIIFABCsAgAAgQUAMK0CAQDdAwAhrgIBAN0DACGvAgEA3QMAIbACQADjAwAhB6oCAACBBQAwqwIAAIIFABCsAgAAgQUAMK0CAQDdAwAhrgIBAN0DACGvAgEA3QMAIbACQADjAwAhA60CAQDoBAAhrwIBAOgEACGwAkAA6QQAIQRwAADrBAAgrQIBAOgEACGvAgEA6AQAIbACQADpBAAhBHAAAO0EACCtAgEAAAABrwIBAAAAAbACQAAAAAEGcAAAlAUAIK0CAQAAAAGvAgEAAAABsAJAAAAAAcsCQAAAAAH7AgIAAAABAgAAAJcBACAPAACTBQAgAwAAAJcBACAPAACTBQAgEAAAkQUAIAEIAAC7BwAwDGwAAIYEACBwAACHBAAgqgIAAIgEADCrAgAAtgEAEKwCAACIBAAwrQIBAAAAAa4CAQDdAwAhrwIBAN0DACGwAkAA4wMAIcsCQADjAwAh-wICAIkEACGGAwAAnQQAIAIAAACXAQAgCAAAkQUAIAIAAACOBQAgCAAAjwUAIAmqAgAAjQUAMKsCAACOBQAQrAIAAI0FADCtAgEA3QMAIa4CAQDdAwAhrwIBAN0DACGwAkAA4wMAIcsCQADjAwAh-wICAIkEACEJqgIAAI0FADCrAgAAjgUAEKwCAACNBQAwrQIBAN0DACGuAgEA3QMAIa8CAQDdAwAhsAJAAOMDACHLAkAA4wMAIfsCAgCJBAAhBa0CAQDoBAAhrwIBAOgEACGwAkAA6QQAIcsCQADpBAAh-wICAJAFACEFugMCAAAAAcADAgAAAAHBAwIAAAABwgMCAAAAAcMDAgAAAAEGcAAAkgUAIK0CAQDoBAAhrwIBAOgEACGwAkAA6QQAIcsCQADpBAAh-wICAJAFACEFDwAAtgcAIBAAALkHACC3AwAAtwcAILgDAAC4BwAgvQMAAKUBACAGcAAAlAUAIK0CAQAAAAGvAgEAAAABsAJAAAAAAcsCQAAAAAH7AgIAAAABAw8AALYHACC3AwAAtwcAIL0DAAClAQAgDngAALIFACCtAgEAAAABsAJAAAAAAbwCAQAAAAG_AgEAAAABxAIAAAD-AgLFAgEAAAABywJAAAAAAfwCCAAAAAH-AgEAAAAB_wIBAAAAAYADAQAAAAGBAyAAAAABggMIAAAAAQIAAACbAQAgDwAAsQUAIAMAAACbAQAgDwAAsQUAIBAAAKEFACABCAAAtQcAMBNsAACcBAAgeAAAlwQAIKoCAACaBAAwqwIAAJkBABCsAgAAmgQAMK0CAQAAAAGuAgEA3gMAIbACQADjAwAhvAIBAN0DACG_AgEA3QMAIcQCAACbBP4CIsUCAQDdAwAhywJAAOMDACH8AggAjQQAIf4CAQDdAwAh_wIBAN0DACGAAwEA3gMAIYEDIADiAwAhggMIAI0EACECAAAAmwEAIAgAAKEFACACAAAAnQUAIAgAAJ4FACARqgIAAJwFADCrAgAAnQUAEKwCAACcBQAwrQIBAN0DACGuAgEA3gMAIbACQADjAwAhvAIBAN0DACG_AgEA3QMAIcQCAACbBP4CIsUCAQDdAwAhywJAAOMDACH8AggAjQQAIf4CAQDdAwAh_wIBAN0DACGAAwEA3gMAIYEDIADiAwAhggMIAI0EACERqgIAAJwFADCrAgAAnQUAEKwCAACcBQAwrQIBAN0DACGuAgEA3gMAIbACQADjAwAhvAIBAN0DACG_AgEA3QMAIcQCAACbBP4CIsUCAQDdAwAhywJAAOMDACH8AggAjQQAIf4CAQDdAwAh_wIBAN0DACGAAwEA3gMAIYEDIADiAwAhggMIAI0EACENrQIBAOgEACGwAkAA6QQAIbwCAQDoBAAhvwIBAOgEACHEAgAAoAX-AiLFAgEA6AQAIcsCQADpBAAh_AIIAJ8FACH-AgEA6AQAIf8CAQDoBAAhgAMBAPIEACGBAyAA9gQAIYIDCACfBQAhBboDCAAAAAHAAwgAAAABwQMIAAAAAcIDCAAAAAHDAwgAAAABAboDAAAA_gICDngAAKIFACCtAgEA6AQAIbACQADpBAAhvAIBAOgEACG_AgEA6AQAIcQCAACgBf4CIsUCAQDoBAAhywJAAOkEACH8AggAnwUAIf4CAQDoBAAh_wIBAOgEACGAAwEA8gQAIYEDIAD2BAAhggMIAJ8FACELDwAAowUAMBAAAKgFADC3AwAApAUAMLgDAAClBQAwuQMAAKYFACC6AwAApwUAMLsDAACnBQAwvAMAAKcFADC9AwAApwUAML4DAACpBQAwvwMAAKoFADAKcAAAsAUAIK0CAQAAAAGvAgEAAAABsAJAAAAAAbwCAQAAAAHLAkAAAAAB1gIBAAAAAdcCCAAAAAHbAgEAAAAB-wICAAAAAQIAAAChAQAgDwAArwUAIAMAAAChAQAgDwAArwUAIBAAAK0FACABCAAAtAcAMA9tAACZBAAgcAAAhwQAIKoCAACYBAAwqwIAAJ8BABCsAgAAmAQAMK0CAQAAAAGvAgEA3QMAIbACQADjAwAhvAIBAN0DACHLAkAA4wMAIdYCAQDeAwAh1wIIAI0EACHbAgEA3gMAIfoCAQDdAwAh-wICAIkEACECAAAAoQEAIAgAAK0FACACAAAAqwUAIAgAAKwFACANqgIAAKoFADCrAgAAqwUAEKwCAACqBQAwrQIBAN0DACGvAgEA3QMAIbACQADjAwAhvAIBAN0DACHLAkAA4wMAIdYCAQDeAwAh1wIIAI0EACHbAgEA3gMAIfoCAQDdAwAh-wICAIkEACENqgIAAKoFADCrAgAAqwUAEKwCAACqBQAwrQIBAN0DACGvAgEA3QMAIbACQADjAwAhvAIBAN0DACHLAkAA4wMAIdYCAQDeAwAh1wIIAI0EACHbAgEA3gMAIfoCAQDdAwAh-wICAIkEACEJrQIBAOgEACGvAgEA6AQAIbACQADpBAAhvAIBAOgEACHLAkAA6QQAIdYCAQDyBAAh1wIIAJ8FACHbAgEA8gQAIfsCAgCQBQAhCnAAAK4FACCtAgEA6AQAIa8CAQDoBAAhsAJAAOkEACG8AgEA6AQAIcsCQADpBAAh1gIBAPIEACHXAggAnwUAIdsCAQDyBAAh-wICAJAFACEFDwAArwcAIBAAALIHACC3AwAAsAcAILgDAACxBwAgvQMAAKUBACAKcAAAsAUAIK0CAQAAAAGvAgEAAAABsAJAAAAAAbwCAQAAAAHLAkAAAAAB1gIBAAAAAdcCCAAAAAHbAgEAAAAB-wICAAAAAQMPAACvBwAgtwMAALAHACC9AwAApQEAIA54AACyBQAgrQIBAAAAAbACQAAAAAG8AgEAAAABvwIBAAAAAcQCAAAA_gICxQIBAAAAAcsCQAAAAAH8AggAAAAB_gIBAAAAAf8CAQAAAAGAAwEAAAABgQMgAAAAAYIDCAAAAAEEDwAAowUAMLcDAACkBQAwuQMAAKYFACC9AwAApwUAMAQPAACVBQAwtwMAAJYFADC5AwAAmAUAIL0DAACZBQAwBA8AAIYFADC3AwAAhwUAMLkDAACJBQAgvQMAAIoFADAEDwAA-gQAMLcDAAD7BAAwuQMAAP0EACC9AwAA_gQAMAAAAAAAAAAABQ8AAKoHACAQAACtBwAgtwMAAKsHACC4AwAArAcAIL0DAAClAQAgAw8AAKoHACC3AwAAqwcAIL0DAAClAQAgAAAAAAAFugMIAAAAAcADCAAAAAHBAwgAAAABwgMIAAAAAcMDCAAAAAEFDwAApQcAIBAAAKgHACC3AwAApgcAILgDAACnBwAgvQMAAKoBACADDwAApQcAILcDAACmBwAgvQMAAKoBACAAAAAFDwAAnwcAIBAAAKMHACC3AwAAoAcAILgDAACiBwAgvQMAAKUBACALDwAAzQUAMBAAANIFADC3AwAAzgUAMLgDAADPBQAwuQMAANAFACC6AwAA0QUAMLsDAADRBQAwvAMAANEFADC9AwAA0QUAML4DAADTBQAwvwMAANQFADAIrQIBAAAAAbACQAAAAAHLAkAAAAAB1gIBAAAAAdcCCAAAAAHYAggAAAAB2QICAAAAAdoCAQAAAAECAAAArgEAIA8AANgFACADAAAArgEAIA8AANgFACAQAADXBQAgAQgAAKEHADAOcQAAjwQAIKoCAACMBAAwqwIAAKwBABCsAgAAjAQAMK0CAQAAAAGwAkAA4wMAIcsCQADjAwAh1QIBAN0DACHWAgEA3QMAIdcCCACNBAAh2AIIAI4EACHZAgIAiQQAIdoCAQAAAAGHAwAAiwQAIAIAAACuAQAgCAAA1wUAIAIAAADVBQAgCAAA1gUAIAyqAgAA1AUAMKsCAADVBQAQrAIAANQFADCtAgEA3QMAIbACQADjAwAhywJAAOMDACHVAgEA3QMAIdYCAQDdAwAh1wIIAI0EACHYAggAjgQAIdkCAgCJBAAh2gIBAN0DACEMqgIAANQFADCrAgAA1QUAEKwCAADUBQAwrQIBAN0DACGwAkAA4wMAIcsCQADjAwAh1QIBAN0DACHWAgEA3QMAIdcCCACNBAAh2AIIAI4EACHZAgIAiQQAIdoCAQDdAwAhCK0CAQDoBAAhsAJAAOkEACHLAkAA6QQAIdYCAQDoBAAh1wIIAJ8FACHYAggAxQUAIdkCAgCQBQAh2gIBAOgEACEIrQIBAOgEACGwAkAA6QQAIcsCQADpBAAh1gIBAOgEACHXAggAnwUAIdgCCADFBQAh2QICAJAFACHaAgEA6AQAIQitAgEAAAABsAJAAAAAAcsCQAAAAAHWAgEAAAAB1wIIAAAAAdgCCAAAAAHZAgIAAAAB2gIBAAAAAQMPAACfBwAgtwMAAKAHACC9AwAApQEAIAQPAADNBQAwtwMAAM4FADC5AwAA0AUAIL0DAADRBQAwAAAAAAACugMBAAAABMQDAQAAAAUCugMBAAAABMQDAQAAAAUCugMBAAAABMQDAQAAAAUFDwAAiwcAIBAAAJ0HACC3AwAAjAcAILgDAACcBwAgvQMAAN0BACALDwAAlAYAMBAAAJkGADC3AwAAlQYAMLgDAACWBgAwuQMAAJcGACC6AwAAmAYAMLsDAACYBgAwvAMAAJgGADC9AwAAmAYAML4DAACaBgAwvwMAAJsGADALDwAAiAYAMBAAAI0GADC3AwAAiQYAMLgDAACKBgAwuQMAAIsGACC6AwAAjAYAMLsDAACMBgAwvAMAAIwGADC9AwAAjAYAML4DAACOBgAwvwMAAI8GADALDwAA_QUAMBAAAIEGADC3AwAA_gUAMLgDAAD_BQAwuQMAAIAGACC6AwAApwUAMLsDAACnBQAwvAMAAKcFADC9AwAApwUAML4DAACCBgAwvwMAAKoFADALDwAA8gUAMBAAAPYFADC3AwAA8wUAMLgDAAD0BQAwuQMAAPUFACC6AwAAigUAMLsDAACKBQAwvAMAAIoFADC9AwAAigUAML4DAAD3BQAwvwMAAI0FADALDwAA6QUAMBAAAO0FADC3AwAA6gUAMLgDAADrBQAwuQMAAOwFACC6AwAA_gQAMLsDAAD-BAAwvAMAAP4EADC9AwAA_gQAML4DAADuBQAwvwMAAIEFADAEbAAA7AQAIK0CAQAAAAGuAgEAAAABsAJAAAAAAQIAAAC7AQAgDwAA8QUAIAMAAAC7AQAgDwAA8QUAIBAAAPAFACABCAAAmwcAMAIAAAC7AQAgCAAA8AUAIAIAAACCBQAgCAAA7wUAIAOtAgEA6AQAIa4CAQDoBAAhsAJAAOkEACEEbAAA6gQAIK0CAQDoBAAhrgIBAOgEACGwAkAA6QQAIQRsAADsBAAgrQIBAAAAAa4CAQAAAAGwAkAAAAABBmwAAPwFACCtAgEAAAABrgIBAAAAAbACQAAAAAHLAkAAAAAB-wICAAAAAQIAAACXAQAgDwAA-wUAIAMAAACXAQAgDwAA-wUAIBAAAPkFACABCAAAmgcAMAIAAACXAQAgCAAA-QUAIAIAAACOBQAgCAAA-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_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_AgAA7gQAIMACAADuBAAgxQIAAO4EACDGAgAA7gQAIMcCAADuBAAgyAIAAO4EACDKAgAA7gQAIBFvAADTBgAgcwAA1AYAIHQAANUGACB1AADWBgAgdgAAtwUAIHcAALgFACDYAgAA7gQAIN4CAADuBAAg3wIAAO4EACDkAgAA7gQAIOUCAADuBAAg5gIAAO4EACDnAgAA7gQAIOgCAADuBAAg6QIAAO4EACDrAgAA7gQAIOwCAADuBAAgA3AAANAGACByAADSBgAg3AIAAO4EACAAA24AAMkGACDcAgAA7gQAIN4CAADuBAAgAAAABGwAAM8GACB4AADWBgAgrgIAAO4EACCAAwAA7gQAIAAAAAAABboDEAAAAAHAAxAAAAABwQMQAAAAAcIDEAAAAAHDAxAAAAABAboDAAAAiwMCAAAAAAABugMAAACWAwIBugMAAACZAwIAAAAAAAG6AwAAAJsDAgG6AwAAAKADAgAAAAAAAboDAAAApAMCAboDAAAApQMCBboDAgAAAAHAAwIAAAABwQMCAAAAAcIDAgAAAAHDAwIAAAABBboDEAAAAAHAAxAAAAABwQMQAAAAAcIDEAAAAAHDAxAAAAABAboDAAAAqQMCAboDAAAAqgMCAAAAAAABugMAAACsAwIAAAAAAAG6AwAAAK0DAgG6AwAAALIDAh2tAgEAAAABsAJAAAAAAbwCAQAAAAHLAkAAAAAB0QIIAAAAAdMCAgAAAAHUAiAAAAAB1wIIAAAAAdgCCAAAAAHZAgIAAAAB3QIBAAAAAd4CAQAAAAHfAgEAAAAB4QIAAKAGACDiAgEAAAAB4wIAAKEGACDkAgEAAAAB5QIBAAAAAeYCAQAAAAHnAggAAAAB6AIIAAAAAekCgAAAAAHqAiAAAAAB6wIBAAAAAewCAQAAAAHtAgAAogYAIO4CAgAAAAHvAgIAAAAB8AIgAAAAARJ2AAC0BQAgdwAAtQUAIK0CAQAAAAGwAkAAAAABvAIBAAAAAb0CAQAAAAG-AgEAAAABvwIBAAAAAcACAQAAAAHCAgAAAMICAsQCAAAAxAICxQIBAAAAAcYCAQAAAAHHAgEAAAAByAJAAAAAAckCIAAAAAHKAgEAAAABywJAAAAAAQIAAACVAwAgDwAAhgcAIAMAAACdAQAgDwAAhgcAIBAAAIoHACAUAAAAnQEAIAgAAIoHACB2AAD4BAAgdwAA-QQAIK0CAQDoBAAhsAJAAOkEACG8AgEA6AQAIb0CAQDoBAAhvgIBAOgEACG_AgEA8gQAIcACAQDyBAAhwgIAAPMEwgIixAIAAPQExAIixQIBAPIEACHGAgEA8gQAIccCAQDyBAAhyAJAAPUEACHJAiAA9gQAIcoCAQDyBAAhywJAAOkEACESdgAA-AQAIHcAAPkEACCtAgEA6AQAIbACQADpBAAhvAIBAOgEACG9AgEA6AQAIb4CAQDoBAAhvwIBAPIEACHAAgEA8gQAIcICAADzBMICIsQCAAD0BMQCIsUCAQDyBAAhxgIBAPIEACHHAgEA8gQAIcgCQAD1BAAhyQIgAPYEACHKAgEA8gQAIcsCQADpBAAhCK0CAQAAAAGwAkAAAAABvAIBAAAAAcsCQAAAAAHcAgEAAAAB3QIBAAAAAd4CAQAAAAGFAyAAAAABAgAAAN0BACAPAACLBwAgBa0CAQAAAAGwAkAAAAABywJAAAAAAdsCAQAAAAHcAgEAAAABCq0CAQAAAAGuAgEAAAABsAJAAAAAAcsCQAAAAAHPAgEAAAAB0AIBAAAAAdECAgAAAAHSAgEAAAAB0wICAAAAAdQCIAAAAAEPbAAAtAYAIK0CAQAAAAGuAgEAAAABsAJAAAAAAbwCAQAAAAG_AgEAAAABxAIAAAD-AgLFAgEAAAABywJAAAAAAfwCCAAAAAH-AgEAAAAB_wIBAAAAAYADAQAAAAGBAyAAAAABggMIAAAAAQIAAACbAQAgDwAAjwcAIAMAAACZAQAgDwAAjwcAIBAAAJMHACARAAAAmQEAIAgAAJMHACBsAACzBgAgrQIBAOgEACGuAgEA8gQAIbACQADpBAAhvAIBAOgEACG_AgEA6AQAIcQCAACgBf4CIsUCAQDoBAAhywJAAOkEACH8AggAnwUAIf4CAQDoBAAh_wIBAOgEACGAAwEA8gQAIYEDIAD2BAAhggMIAJ8FACEPbAAAswYAIK0CAQDoBAAhrgIBAPIEACGwAkAA6QQAIbwCAQDoBAAhvwIBAOgEACHEAgAAoAX-AiLFAgEA6AQAIcsCQADpBAAh_AIIAJ8FACH-AgEA6AQAIf8CAQDoBAAhgAMBAPIEACGBAyAA9gQAIYIDCACfBQAhCa0CAQAAAAGwAkAAAAABvAIBAAAAAcsCQAAAAAHWAgEAAAAB1wIIAAAAAdsCAQAAAAH6AgEAAAAB-wICAAAAARJ3AAC1BQAgeQAAswUAIK0CAQAAAAGwAkAAAAABvAIBAAAAAb0CAQAAAAG-AgEAAAABvwIBAAAAAcACAQAAAAHCAgAAAMICAsQCAAAAxAICxQIBAAAAAcYCAQAAAAHHAgEAAAAByAJAAAAAAckCIAAAAAHKAgEAAAABywJAAAAAAQIAAACVAwAgDwAAlQcAIAMAAACdAQAgDwAAlQcAIBAAAJkHACAUAAAAnQEAIAgAAJkHACB3AAD5BAAgeQAA9wQAIK0CAQDoBAAhsAJAAOkEACG8AgEA6AQAIb0CAQDoBAAhvgIBAOgEACG_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_AIIAAAAAf4CAQAAAAH_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_BwAgEAAAxgcAIBQAAACdAQAgCAAAxgcAIHYAAPgEACB5AAD3BAAgrQIBAOgEACGwAkAA6QQAIbwCAQDoBAAhvQIBAOgEACG-AgEA6AQAIb8CAQDyBAAhwAIBAPIEACHCAgAA8wTCAiLEAgAA9ATEAiLFAgEA8gQAIcYCAQDyBAAhxwIBAPIEACHIAkAA9QQAIckCIAD2BAAhygIBAPIEACHLAkAA6QQAIRJ2AAD4BAAgeQAA9wQAIK0CAQDoBAAhsAJAAOkEACG8AgEA6AQAIb0CAQDoBAAhvgIBAOgEACG_AgEA8gQAIcACAQDyBAAhwgIAAPMEwgIixAIAAPQExAIixQIBAPIEACHGAgEA8gQAIccCAQDyBAAhyAJAAPUEACHJAiAA9gQAIcoCAQDyBAAhywJAAOkEACEAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgAAAAUVABAWABEXABIYABMZABQAAAAAAAUVABAWABEXABIYABMZABQAAAAFFQAaFgAbFwAcGAAdGQAeAAAAAAAFFQAaFgAbFwAcGAAdGQAeAAAABRUAJBYAJRcAJhgAJxkAKAAAAAAABRUAJBYAJRcAJhgAJxkAKAAAAAUVAC4WAC8XADAYADEZADIAAAAAAAUVAC4WAC8XADAYADEZADIAAAAFFQA4FgA5FwA6GAA7GQA8AAAAAAAFFQA4FgA5FwA6GAA7GQA8AmwAP3AAQgQVAEx2wwE-d8QBSXmcAUADFQBLbJ4BP3iiAUECbQBAcABCBxUASm8AQ3OrAUV0tAFIdbUBQXa4AT53vAFJAhUARG6mAUIBbqcBAAMVAEdwAEJyrwFGAXEARQFysAEAAXAAQgJsAD9wAEIFc70BAHS-AQB1vwEAdsABAHfBAQABeMIBAAN2xgEAd8cBAHnFAQACbAA_cABCAmwAP3AAQgUVAFAWAFEXAFIYAFMZAFQAAAAAAAUVAFAWAFEXAFIYAFMZAFQAAAMVAFkYAFoZAFsAAAADFQBZGABaGQBbAAAAAxUAYRgAYhkAYwAAAAMVAGEYAGIZAGMBbJkCPwFsnwI_BRUAaBYAaRcAahgAaxkAbAAAAAAABRUAaBYAaRcAahgAaxkAbAJtAEBwAEICbQBAcABCBRUAcRYAchcAcxgAdBkAdQAAAAAABRUAcRYAchcAcxgAdBkAdQFvAEMBbwBDBRUAehYAexcAfBgAfRkAfgAAAAAABRUAehYAexcAfBgAfRkAfgFwAEIBcABCAxUAgwEYAIQBGQCFAQAAAAMVAIMBGACEARkAhQEBcQBFAXEARQUVAIoBFgCLARcAjAEYAI0BGQCOAQAAAAAABRUAigEWAIsBFwCMARgAjQEZAI4BAXAAQgFwAEIFFQCTARYAlAEXAJUBGACWARkAlwEAAAAAAAUVAJMBFgCUARcAlQEYAJYBGQCXAQAAAxUAnAEYAJ0BGQCeAQAAAAMVAJwBGACdARkAngECbAA_cABCAmwAP3AAQgMVAKMBGACkARkApQEAAAADFQCjARgApAEZAKUBAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkLHBsMHRwMHh8MHyAMICEMISMMIiUCIyYNJCgMJSoCJisOJywMKC0MKS4CKjEPKzIVLDQWLTUWLjgWLzkWMDoWMTwWMj4CMz8XNEEWNUMCNkQYN0UWOEYWOUcCOkoZO0sfPE0gPU4gPlEgP1IgQFMgQVUgQlcCQ1ghRFogRVwCRl0iR14gSF8gSWACSmMjS2QpTGYqTWcqTmoqT2sqUGwqUW4qUnACU3ErVHMqVXUCVnYsV3cqWHgqWXkCWnwtW30zXH80XYABNF6DATRfhAE0YIUBNGGHATRiiQECY4oBNWSMATRljgECZo8BNmeQATRokQE0aZIBAmqVATdrlgE9epgBPnvIAT58yQE-fcoBPn7LAT5_zQE-gAHPAQKBAdABTYIB0gE-gwHUAQKEAdUBToUB1gE-hgHXAT6HAdgBAogB2wFPiQHcAVWKAd4BQ4sB3wFDjAHiAUONAeMBQ44B5AFDjwHmAUOQAegBApEB6QFWkgHrAUOTAe0BApQB7gFXlQHvAUOWAfABQ5cB8QECmAH0AViZAfUBXJoB9wFdmwH4AV2cAfsBXZ0B_AFdngH9AV2fAf8BXaABgQICoQGCAl6iAYQCXaMBhgICpAGHAl-lAYgCXaYBiQJdpwGKAgKoAY0CYKkBjgJkqgGPAkCrAZACQKwBkQJArQGSAkCuAZMCQK8BlQJAsAGXAgKxAZgCZbIBmwJAswGdAgK0AZ4CZrUBoAJAtgGhAkC3AaICArgBpQJnuQGmAm26AacCQbsBqAJBvAGpAkG9AaoCQb4BqwJBvwGtAkHAAa8CAsEBsAJuwgGyAkHDAbQCAsQBtQJvxQG2AkHGAbcCQccBuAICyAG7AnDJAbwCdsoBvQJCywG-AkLMAb8CQs0BwAJCzgHBAkLPAcMCQtABxQIC0QHGAnfSAcgCQtMBygIC1AHLAnjVAcwCQtYBzQJC1wHOAgLYAdECedkB0gJ_2gHTAkXbAdQCRdwB1QJF3QHWAkXeAdcCRd8B2QJF4AHbAgLhAdwCgAHiAd4CReMB4AIC5AHhAoEB5QHiAkXmAeMCRecB5AIC6AHnAoIB6QHoAoYB6gHpAkbrAeoCRuwB6wJG7QHsAkbuAe0CRu8B7wJG8AHxAgLxAfIChwHyAfQCRvMB9gIC9AH3AogB9QH4Akb2AfkCRvcB-gIC-AH9AokB-QH-Ao8B-gH_Akj7AYADSPwBgQNI_QGCA0j-AYMDSP8BhQNIgAKHAwKBAogDkAGCAooDSIMCjAMChAKNA5EBhQKOA0iGAo8DSIcCkAMCiAKTA5IBiQKUA5gBigKWAz-LApcDP4wCmQM_jQKaAz-OApsDP48CnQM_kAKfAwKRAqADmQGSAqIDP5MCpAMClAKlA5oBlQKmAz-WAqcDP5cCqAMCmAKrA5sBmQKsA58BmgKtA0mbAq4DSZwCrwNJnQKwA0meArEDSZ8CswNJoAK1AwKhArYDoAGiArgDSaMCugMCpAK7A6EBpQK8A0mmAr0DSacCvgMCqALBA6IBqQLCA6YB"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
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
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  FixedMonthlyCostScalarFieldEnum: () => FixedMonthlyCostScalarFieldEnum,
  HeroScalarFieldEnum: () => HeroScalarFieldEnum,
  InvestorPaymentScalarFieldEnum: () => InvestorPaymentScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  JsonNullValueInput: () => JsonNullValueInput,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PersonalEntryScalarFieldEnum: () => PersonalEntryScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductColorVariantScalarFieldEnum: () => ProductColorVariantScalarFieldEnum,
  ProductScalarFieldEnum: () => ProductScalarFieldEnum,
  ProductSizeVariantScalarFieldEnum: () => ProductSizeVariantScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  ShipmentScalarFieldEnum: () => ShipmentScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  SteadfastWithdrawalScalarFieldEnum: () => SteadfastWithdrawalScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  WholesaleScalarFieldEnum: () => WholesaleScalarFieldEnum,
  WishlistScalarFieldEnum: () => WishlistScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.4.2",
  engine: "94a226be1cf2967af2541cca5529f0f7ba866919"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  InvestorPayment: "InvestorPayment",
  FixedMonthlyCost: "FixedMonthlyCost",
  PersonalEntry: "PersonalEntry",
  Shipment: "Shipment",
  SteadfastWithdrawal: "SteadfastWithdrawal",
  Wholesale: "Wholesale",
  Cart: "Cart",
  Category: "Category",
  Hero: "Hero",
  Order: "Order",
  OrderItem: "OrderItem",
  Product: "Product",
  ProductColorVariant: "ProductColorVariant",
  ProductSizeVariant: "ProductSizeVariant",
  Review: "Review",
  User: "User",
  Wishlist: "Wishlist"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var InvestorPaymentScalarFieldEnum = {
  id: "id",
  date: "date",
  description: "description",
  amount: "amount",
  status: "status",
  investorName: "investorName",
  investedAmount: "investedAmount",
  receivedAmount: "receivedAmount",
  paymentBy: "paymentBy",
  referenceBy: "referenceBy",
  platform: "platform",
  investmentStatus: "investmentStatus",
  monthsPaid: "monthsPaid",
  buyProducts: "buyProducts",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var FixedMonthlyCostScalarFieldEnum = {
  id: "id",
  date: "date",
  description: "description",
  amount: "amount",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PersonalEntryScalarFieldEnum = {
  id: "id",
  date: "date",
  description: "description",
  amount: "amount",
  status: "status",
  type: "type",
  quantity: "quantity",
  priceRmb: "priceRmb",
  shippingCharge: "shippingCharge",
  paidReceivedBy: "paidReceivedBy",
  platform: "platform",
  clearanceStatus: "clearanceStatus",
  accountType: "accountType",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ShipmentScalarFieldEnum = {
  id: "id",
  date: "date",
  description: "description",
  amount: "amount",
  status: "status",
  productName: "productName",
  quantity: "quantity",
  shippingCompany: "shippingCompany",
  weight: "weight",
  perKgRate: "perKgRate",
  shippingCharge: "shippingCharge",
  billingStatus: "billingStatus",
  shippingStatus: "shippingStatus",
  receivingDate: "receivingDate",
  investorName: "investorName",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SteadfastWithdrawalScalarFieldEnum = {
  id: "id",
  date: "date",
  description: "description",
  amount: "amount",
  status: "status",
  withdrawBy: "withdrawBy",
  paymentMethod: "paymentMethod",
  clearanceStatus: "clearanceStatus",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var WholesaleScalarFieldEnum = {
  id: "id",
  date: "date",
  description: "description",
  amount: "amount",
  status: "status",
  productName: "productName",
  quantity: "quantity",
  priceRmb: "priceRmb",
  priceTaka: "priceTaka",
  weight: "weight",
  costPerKg: "costPerKg",
  shipping: "shipping",
  courierChina: "courierChina",
  note: "note",
  onePairPrice: "onePairPrice",
  salePrice: "salePrice",
  loss: "loss",
  profit: "profit",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartScalarFieldEnum = {
  id: "id",
  userId: "userId",
  productId: "productId",
  quantity: "quantity",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  image: "image",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var HeroScalarFieldEnum = {
  id: "id",
  offer: "offer",
  banner: "banner",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  total: "total",
  status: "status",
  name: "name",
  phone: "phone",
  district: "district",
  thana: "thana",
  address: "address",
  note: "note",
  isInsideDhaka: "isInsideDhaka",
  shippingFee: "shippingFee",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  productId: "productId",
  name: "name",
  price: "price",
  quantity: "quantity",
  size: "size",
  color: "color",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  brand: "brand",
  categoryId: "categoryId",
  tags: "tags",
  thumbnail: "thumbnail",
  images: "images",
  videoUrl: "videoUrl",
  model: "model",
  material: "material",
  price: "price",
  specialPrice: "specialPrice",
  discount: "discount",
  stock: "stock",
  weight: "weight",
  dimensions: "dimensions",
  dangerousGoods: "dangerousGoods",
  warrantyType: "warrantyType",
  warrantyPeriod: "warrantyPeriod",
  highlights: "highlights",
  rating: "rating",
  reviewCount: "reviewCount",
  viewCount: "viewCount",
  likeCount: "likeCount",
  isFeatured: "isFeatured",
  isPublished: "isPublished",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductColorVariantScalarFieldEnum = {
  id: "id",
  productId: "productId",
  color: "color",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductSizeVariantScalarFieldEnum = {
  id: "id",
  colorVariantId: "colorVariantId",
  size: "size",
  price: "price",
  specialPrice: "specialPrice",
  stock: "stock",
  sku: "sku",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  productId: "productId",
  userId: "userId",
  userName: "userName",
  userAvatar: "userAvatar",
  rating: "rating",
  comment: "comment",
  likeCount: "likeCount",
  isPublished: "isPublished",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  phone: "phone",
  avatar: "avatar",
  role: "role",
  status: "status",
  address: "address",
  city: "city",
  country: "country",
  lastLogin: "lastLogin",
  emailVerified: "emailVerified",
  provider: "provider",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var WishlistScalarFieldEnum = {
  id: "id",
  userId: "userId",
  productId: "productId",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var JsonNullValueInput = {
  JsonNull: JsonNull2
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SELLER: "SELLER",
  SUPER_ADMIN: "SUPER_ADMIN"
};
var OrderStatus = {
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  PARTIAL: "PARTIAL"
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
var accessRole = auth(
  Role.ADMIN,
  Role.SELLER,
  Role.CUSTOMER,
  Role.SUPER_ADMIN
);
router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", accessRole, UserController.getAllUsers);
router.get("/me", accessRole, UserController.getCurrentUser);
router.get("/:id", accessRole, UserController.getSingleUser);
router.put("/:id", accessRole, UserController.updateUser);
router.put("/:id/password", accessRole, UserController.changePassword);
router.delete("/:id", accessRole, UserController.deleteUser);
var UserRoute = router;

// src/app/modules/products/product.route.ts
import { Router as Router2 } from "express";

// src/app/modules/products/product.service.ts
var createProduct = async (payload) => {
  try {
    const { category, colorVariants, dimensions, ...rest } = payload;
    const result = await prisma.product.create({
      data: {
        ...rest,
        // Prisma Json field
        dimensions: dimensions ? {
          length: dimensions.length,
          width: dimensions.width,
          height: dimensions.height
        } : void 0,
        category: {
          connect: {
            id: category
          }
        },
        colorVariants: colorVariants?.length ? {
          create: colorVariants.map((color) => ({
            color: color.color,
            image: color.image,
            sizes: {
              create: color.sizes.map((size) => ({
                size: size.size,
                price: size.price,
                specialPrice: size.specialPrice,
                stock: size.stock ?? 0,
                sku: size.sku
              }))
            }
          }))
        } : void 0
      },
      include: {
        category: true,
        reviews: true,
        colorVariants: {
          include: {
            sizes: true
          }
        }
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
      categoryId,
      brand,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = "1",
      limit = "10",
      isFeatured,
      isPublished
    } = query;
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);
    const skip = (pageNumber - 1) * limitNumber;
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
        },
        {
          brand: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
    if (categoryId) {
      filters.categoryId = categoryId;
    }
    if (brand) {
      filters.brand = {
        equals: brand,
        mode: "insensitive"
      };
    }
    if (isFeatured !== void 0) {
      filters.isFeatured = isFeatured === "true";
    }
    if (isPublished !== void 0) {
      filters.isPublished = isPublished === "true";
    }
    if (minPrice || maxPrice) {
      filters.price = {
        gte: minPrice ? Number(minPrice) : void 0,
        lte: maxPrice ? Number(maxPrice) : void 0
      };
    }
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "name",
      "price",
      "stock",
      "rating"
    ];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const orderBy = {
      [safeSortBy]: sortOrder === "asc" ? "asc" : "desc"
    };
    const result = await prisma.product.findMany({
      where: filters,
      orderBy,
      skip,
      take: limitNumber,
      include: {
        category: true,
        colorVariants: {
          include: {
            sizes: true
          }
        }
      }
    });
    const total = await prisma.product.count({
      where: filters
    });
    const totalPages = Math.ceil(total / limitNumber);
    return {
      data: result,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1
      }
    };
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);
    throw new Error("Failed to fetch products");
  }
};
var getSingleProduct = async (slug) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug
      },
      select: {
        id: true
      }
    });
    if (!product) {
      return null;
    }
    const result = await prisma.product.update({
      where: {
        id: product.id
      },
      data: {
        viewCount: {
          increment: 1
        }
      },
      include: {
        category: true,
        reviews: true,
        colorVariants: {
          include: {
            sizes: true
          }
        }
      }
    });
    return result;
  } catch (error) {
    console.error("GET SINGLE PRODUCT ERROR:", error);
    throw new Error("Failed to fetch product");
  }
};
var updateProduct = async (id, payload) => {
  try {
    const { category, colorVariants, dimensions, ...rest } = payload;
    const result = await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          id
        },
        data: {
          ...rest,
          ...dimensions !== void 0 ? {
            dimensions: dimensions ? {
              ...dimensions.length !== void 0 && {
                length: dimensions.length
              },
              ...dimensions.width !== void 0 && {
                width: dimensions.width
              },
              ...dimensions.height !== void 0 && {
                height: dimensions.height
              }
            } : prismaNamespace_exports.DbNull
          } : {},
          ...category ? {
            category: {
              connect: {
                id: category
              }
            }
          } : {}
        }
      });
      if (colorVariants !== void 0) {
        await tx.productColorVariant.deleteMany({
          where: {
            productId: id
          }
        });
        if (colorVariants.length > 0) {
          await tx.productColorVariant.createMany({
            data: colorVariants.map((color) => ({
              productId: id,
              color: color.color,
              image: color.image
            }))
          });
          const createdColors = await tx.productColorVariant.findMany({
            where: {
              productId: id
            },
            orderBy: {
              createdAt: "asc"
            }
          });
          for (let i = 0; i < colorVariants.length; i++) {
            const colorInput = colorVariants[i];
            const createdColor = createdColors[i];
            if (!createdColor) continue;
            if (!colorInput.sizes?.length) continue;
            await tx.productSizeVariant.createMany({
              data: colorInput.sizes.map((size) => ({
                colorVariantId: createdColor.id,
                size: size.size,
                price: size.price,
                specialPrice: size.specialPrice,
                stock: size.stock ?? 0,
                sku: size.sku
              }))
            });
          }
        }
      }
      return tx.product.findUnique({
        where: {
          id
        },
        include: {
          category: true,
          colorVariants: {
            include: {
              sizes: true
            }
          }
        }
      });
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
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
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
  const { slug } = req.params;
  const result = await ProductService.getSingleProduct(slug);
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
var accessRole2 = auth(Role.ADMIN, Role.SELLER, Role.SUPER_ADMIN);
router2.post("/", accessRole2, ProductController.createProduct);
router2.get("/", ProductController.getAllProducts);
router2.get("/:slug", ProductController.getSingleProduct);
router2.patch("/:id", accessRole2, ProductController.updateProduct);
router2.delete("/:id", accessRole2, ProductController.deleteProduct);
var ProductRoutes = router2;

// src/app/modules/orders/order.route.ts
import { Router as Router3 } from "express";

// src/app/modules/orders/order.service.ts
var createBuyNowOrder = async (userId, productId, quantity, name, phone, district, thana, address, note, isInsideDhaka, size, color) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });
    if (!product) {
      throw new Error("Product not found");
    }
    const total = product.price * quantity;
    const shippingFee = isInsideDhaka ? 90 : 130;
    const order = await prisma.order.create({
      data: {
        ...userId ? { userId } : {},
        total: total + shippingFee,
        name,
        phone,
        district,
        thana,
        address,
        note: note || null,
        isInsideDhaka,
        shippingFee,
        items: {
          create: [
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity,
              size: size || null,
              color: color || null
            }
          ]
        }
      },
      include: {
        items: true
      }
    });
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create buy now order");
  }
};
var checkoutCart = async (userId, name, phone, district, thana, address, note, isInsideDhaka) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }
    });
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }
    const shippingFee = isInsideDhaka ? 90 : 130;
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    const total = subtotal + shippingFee;
    const order = await prisma.order.create({
      data: {
        userId,
        name,
        phone,
        district,
        thana,
        address,
        note: note || null,
        isInsideDhaka,
        shippingFee,
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
        {
          name: {
            contains: searchValue,
            mode: "insensitive"
          }
        },
        {
          phone: {
            contains: searchValue,
            mode: "insensitive"
          }
        },
        {
          district: {
            contains: searchValue,
            mode: "insensitive"
          }
        },
        {
          thana: {
            contains: searchValue,
            mode: "insensitive"
          }
        },
        {
          address: {
            contains: searchValue,
            mode: "insensitive"
          }
        },
        {
          user: {
            name: {
              contains: searchValue,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            email: {
              contains: searchValue,
              mode: "insensitive"
            }
          }
        },
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
    const [orders, total, statusCounts] = await Promise.all([
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
      prisma.order.count({
        where
      }),
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
var getSingleOrder = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
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
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Get single order error:", error);
    if (error instanceof Error && ["Order ID is required", "Order not found"].includes(error.message)) {
      throw error;
    }
    throw new Error("Failed to get single order");
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
var updateOrder = async (orderId, payload) => {
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
    if (payload.status && !VALID_ORDER_STATUSES.includes(payload.status)) {
      throw new Error("Invalid order status");
    }
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        ...payload.name !== void 0 && {
          name: payload.name
        },
        ...payload.phone !== void 0 && {
          phone: payload.phone
        },
        ...payload.district !== void 0 && {
          district: payload.district
        },
        ...payload.thana !== void 0 && {
          thana: payload.thana
        },
        ...payload.address !== void 0 && {
          address: payload.address
        },
        ...payload.note !== void 0 && {
          note: payload.note
        },
        ...payload.status !== void 0 && {
          status: payload.status
        }
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
    console.error("Update order error:", error);
    if (error instanceof Error && [
      "Order ID is required",
      "Order not found",
      "Invalid order status"
    ].includes(error.message)) {
      throw error;
    }
    throw new Error("Failed to update order");
  }
};
var getCustomerOrderHistoryByPhone = async (phone) => {
  try {
    if (!phone) {
      throw new Error("Phone number is required");
    }
    const orders = await prisma.order.findMany({
      where: {
        phone
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
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    if (orders.length === 0) {
      throw new Error("No orders found for this phone number");
    }
    const totalOrders = orders.length;
    const totalDelivered = orders.filter(
      (order) => order.status === "DELIVERED"
    ).length;
    const totalCancelled = orders.filter(
      (order) => order.status === "CANCELLED"
    ).length;
    const totalPending = orders.filter(
      (order) => order.status === "PENDING"
    ).length;
    const totalShipped = orders.filter(
      (order) => order.status === "SHIPPED"
    ).length;
    const totalPartial = orders.filter(
      (order) => order.status === "PARTIAL"
    ).length;
    return {
      customer: {
        name: orders[0].name,
        phone: orders[0].phone,
        district: orders[0].district,
        thana: orders[0].thana,
        address: orders[0].address
      },
      summary: {
        totalOrders,
        totalDelivered,
        totalCancelled,
        totalPending,
        totalShipped,
        totalPartial
      },
      orders
    };
  } catch (error) {
    console.error("Get customer order history error:", error);
    if (error instanceof Error && [
      "Phone number is required",
      "No orders found for this phone number"
    ].includes(error.message)) {
      throw error;
    }
    throw new Error("Failed to get customer order history");
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
  getAllOrders,
  updateOrder,
  getSingleOrder,
  getCustomerOrderHistoryByPhone
};

// src/app/modules/orders/order.controller.ts
var buyNow = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const {
    productId,
    quantity,
    name,
    phone,
    district,
    thana,
    address,
    note,
    size,
    isInsideDhaka,
    color
  } = req.body;
  const result = await OrderService.createBuyNowOrder(
    userId,
    productId,
    quantity || 1,
    name,
    phone,
    district,
    thana,
    address,
    note,
    isInsideDhaka,
    size,
    color
  );
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Order placed successfully",
    data: result
  });
});
var checkout = catchAsync(async (req, res) => {
  const user = req.user;
  const { name, phone, district, thana, address, note, isInsideDhaka } = req.body;
  const result = await OrderService.checkoutCart(
    user.id,
    name,
    phone,
    district,
    thana,
    address,
    note,
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
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result
  });
});
var getSingleOrder2 = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderService.getSingleOrder(orderId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Order fetched successfully",
    data: result
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
var updateOrderController = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: "Order ID is required"
      });
    }
    const result = await OrderService.updateOrder(id, req.body);
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Order updated successfully",
      data: result
    });
  }
);
var getCustomerOrderHistoryByPhone2 = catchAsync(
  async (req, res) => {
    const { phone } = req.query;
    if (!phone) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: "Phone number is required"
      });
    }
    const result = await OrderService.getCustomerOrderHistoryByPhone(
      String(phone)
    );
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Customer order history fetched successfully",
      data: result
    });
  }
);
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
  getAllOrders: getAllOrders2,
  getSingleOrder: getSingleOrder2,
  updateOrderController,
  getCustomerOrderHistoryByPhone: getCustomerOrderHistoryByPhone2
};

// src/app/modules/orders/order.route.ts
var router3 = Router3();
var accessRole3 = auth(Role.ADMIN, Role.SUPER_ADMIN);
router3.post(
  "/buy-now",
  OrderController.buyNow
);
router3.post(
  "/checkout",
  auth(Role.CUSTOMER, Role.ADMIN),
  OrderController.checkout
);
router3.get("/all", accessRole3, OrderController.getAllOrders);
router3.get("/customer-history", OrderController.getCustomerOrderHistoryByPhone);
router3.get("/:orderId", OrderController.getSingleOrder);
router3.get(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getOrders
);
router3.patch("/:id/status", accessRole3, updateOrderStatusController);
router3.patch("/:id", OrderController.updateOrderController);
router3.delete("/:id", accessRole3, deleteOrderController);
var OrderRoutes = router3;

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
      product: {
        include: {
          category: true
        }
      }
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
var accessRole4 = auth(
  Role.ADMIN,
  Role.SELLER,
  Role.CUSTOMER,
  Role.SUPER_ADMIN
);
router4.post("/", CartController.addToCart);
router4.get("/", CartController.getMyCart);
router4.patch("/:id", CartController.updateCartItem);
router4.delete("/:id", CartController.deleteCartItem);
router4.delete("/clear/all", accessRole4, CartController.clearCart);
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
var accessRole5 = auth(
  Role.ADMIN,
  Role.SELLER,
  Role.CUSTOMER,
  Role.SUPER_ADMIN
);
router6.post("/", accessRole5, WishlistController.createWishlist);
router6.get("/", accessRole5, WishlistController.getWishlistByUser);
router6.delete("/:id", accessRole5, WishlistController.deleteWishlistItem);
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
router7.get("/", CategoryController.getAllCategories);
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
var accessRole6 = auth(Role.ADMIN, Role.SUPER_ADMIN);
router8.post("/", accessRole6, HeroController.createHero);
router8.get("/", accessRole6, HeroController.getAllHeroes);
router8.get("/:id", accessRole6, HeroController.getHeroById);
router8.patch("/:id", accessRole6, HeroController.updateHero);
router8.delete("/:id", accessRole6, HeroController.deleteHero);
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
var accessRole7 = auth(Role.ADMIN, Role.SUPER_ADMIN);
router9.post("/", auth(Role.ADMIN), PersonalEntryController.createPersonalEntry);
router9.get("/", accessRole7, PersonalEntryController.getAllPersonalEntries);
router9.get("/:id", accessRole7, PersonalEntryController.getSinglePersonalEntry);
router9.patch("/:id", accessRole7, PersonalEntryController.updatePersonalEntry);
router9.delete("/:id", accessRole7, PersonalEntryController.deletePersonalEntry);
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
var accessRole8 = auth(Role.ADMIN, Role.SELLER, Role.SUPER_ADMIN);
router10.post("/", accessRole8, SteadfastWithdrawalController.createWithdrawal);
router10.get("/", accessRole8, SteadfastWithdrawalController.getAllWithdrawals);
router10.get(
  "/:id",
  accessRole8,
  SteadfastWithdrawalController.getSingleWithdrawal
);
router10.patch(
  "/:id",
  accessRole8,
  SteadfastWithdrawalController.updateWithdrawal
);
router10.delete(
  "/:id",
  accessRole8,
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
var accessRole9 = auth(Role.ADMIN, Role.SELLER, Role.SUPER_ADMIN);
router11.post("/", accessRole9, investorPaymentController.createInvestorPayment);
router11.get("/", accessRole9, investorPaymentController.getAllInvestorPayments);
router11.get(
  "/:id",
  accessRole9,
  investorPaymentController.getSingleInvestorPayment
);
router11.patch(
  "/:id",
  accessRole9,
  investorPaymentController.updateInvestorPayment
);
router11.delete(
  "/:id",
  accessRole9,
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
var accessRole10 = auth(Role.ADMIN, Role.SELLER, Role.SUPER_ADMIN);
router12.post("/", accessRole10, shipmentController.createShipment);
router12.get("/", shipmentController.getAllShipments);
router12.get("/:id", shipmentController.getSingleShipment);
router12.patch("/:id", accessRole10, shipmentController.updateShipment);
router12.delete("/:id", accessRole10, shipmentController.deleteShipment);
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
var accessRole11 = auth(Role.ADMIN, Role.SELLER, Role.SUPER_ADMIN);
router13.post("/", accessRole11, wholesaleController.createWholesale);
router13.get("/", accessRole11, wholesaleController.getAllWholesales);
router13.get("/:id", accessRole11, wholesaleController.getSingleWholesale);
router13.patch("/:id", accessRole11, wholesaleController.updateWholesale);
router13.delete("/:id", accessRole11, wholesaleController.deleteWholesale);
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
var accessRole12 = auth(Role.ADMIN, Role.SELLER, Role.SUPER_ADMIN);
router14.post("/", accessRole12, MonthlyCostController.createMonthlyCost);
router14.get("/", accessRole12, MonthlyCostController.getAllMonthlyCosts);
router14.get("/:id", accessRole12, MonthlyCostController.getSingleMonthlyCost);
router14.patch("/:id", accessRole12, MonthlyCostController.updateMonthlyCost);
router14.delete("/:id", accessRole12, MonthlyCostController.deleteMonthlyCost);
var MonthlyCostRoutes = router14;

// src/app/modules/analytics/analytics.route.ts
import { Router as Router12 } from "express";

// src/app/modules/analytics/analytics.service.ts
var createDateRange = (year, month) => {
  if (month) {
    return {
      gte: new Date(year, month - 1, 1),
      lt: new Date(year, month, 1)
    };
  }
  return {
    gte: new Date(year, 0, 1),
    lt: new Date(year + 1, 0, 1)
  };
};
var getAllAnalytics = async (query) => {
  try {
    const currentDate = /* @__PURE__ */ new Date();
    const year = query.year && Number(query.year) ? Number(query.year) : currentDate.getFullYear();
    const parsedMonth = query.month && Number(query.month) ? Number(query.month) : void 0;
    const month = parsedMonth && parsedMonth >= 1 && parsedMonth <= 12 ? parsedMonth : void 0;
    const dateRange = createDateRange(year, month);
    const orders = await prisma.order.findMany({
      where: {
        createdAt: dateRange
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                thumbnail: true,
                price: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });
    const deliveredOrders = orders.filter(
      (order) => order.status === OrderStatus.DELIVERED
    );
    const pendingOrders = orders.filter(
      (order) => order.status === OrderStatus.PENDING
    );
    const shippedOrders = orders.filter(
      (order) => order.status === OrderStatus.SHIPPED
    );
    const cancelledOrders = orders.filter(
      (order) => order.status === OrderStatus.CANCELLED
    );
    const partialOrders = orders.filter(
      (order) => order.status === OrderStatus.PARTIAL
    );
    const totalOrders = orders.length;
    const deliveredOrderCount = deliveredOrders.length;
    const totalSales = deliveredOrders.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    const averageOrderValue = deliveredOrderCount > 0 ? totalSales / deliveredOrderCount : 0;
    const totalShippingRevenue = deliveredOrders.reduce(
      (sum, order) => sum + Number(order.shippingFee),
      0
    );
    const revenueMap = /* @__PURE__ */ new Map();
    deliveredOrders.forEach((order) => {
      const date = new Date(order.createdAt);
      const dateKey = date.toISOString().split("T")[0];
      const existing = revenueMap.get(dateKey);
      if (existing) {
        existing.revenue += Number(order.total);
        existing.orders += 1;
      } else {
        revenueMap.set(dateKey, {
          revenue: Number(order.total),
          orders: 1
        });
      }
    });
    const revenueTrend = Array.from(revenueMap.entries()).sort(([dateA], [dateB]) => dateA.localeCompare(dateB)).map(([date, data]) => ({
      date,
      revenue: Number(data.revenue.toFixed(2)),
      orders: data.orders
    }));
    const statusMap = /* @__PURE__ */ new Map();
    orders.forEach((order) => {
      const status3 = String(order.status);
      statusMap.set(status3, (statusMap.get(status3) || 0) + 1);
    });
    const ordersByStatus = Object.values(OrderStatus).map((status3) => ({
      status: status3,
      count: statusMap.get(status3) || 0
    }));
    const productMap = /* @__PURE__ */ new Map();
    deliveredOrders.forEach((order) => {
      order.items.forEach((item) => {
        const itemRevenue = Number(item.price) * Number(item.quantity);
        const existing = productMap.get(item.productId);
        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += itemRevenue;
        } else {
          productMap.set(item.productId, {
            productId: item.productId,
            productName: item.name,
            thumbnail: item.product?.thumbnail ?? null,
            quantity: item.quantity,
            revenue: itemRevenue
          });
        }
      });
    });
    const bestSellingProducts = Array.from(productMap.values()).sort((a, b) => {
      if (b.quantity !== a.quantity) {
        return b.quantity - a.quantity;
      }
      return b.revenue - a.revenue;
    }).slice(0, 10).map((item) => ({
      ...item,
      revenue: Number(item.revenue.toFixed(2))
    }));
    const districtMap = /* @__PURE__ */ new Map();
    deliveredOrders.forEach((order) => {
      const district = order.district?.trim() || "Unknown";
      const existing = districtMap.get(district);
      if (existing) {
        existing.orders += 1;
        existing.revenue += Number(order.total);
      } else {
        districtMap.set(district, {
          district,
          orders: 1,
          revenue: Number(order.total)
        });
      }
    });
    const topDistricts = Array.from(districtMap.values()).sort((a, b) => {
      if (b.revenue !== a.revenue) {
        return b.revenue - a.revenue;
      }
      return b.orders - a.orders;
    }).slice(0, 10).map((item) => ({
      ...item,
      revenue: Number(item.revenue.toFixed(2))
    }));
    const insideDhakaOrders = deliveredOrders.filter(
      (order) => order.isInsideDhaka
    );
    const outsideDhakaOrders = deliveredOrders.filter(
      (order) => !order.isInsideDhaka
    );
    const insideDhakaRevenue = insideDhakaOrders.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    const outsideDhakaRevenue = outsideDhakaOrders.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    const totalProductsSold = deliveredOrders.reduce((sum, order) => {
      return sum + order.items.reduce(
        (itemSum, item) => itemSum + Number(item.quantity),
        0
      );
    }, 0);
    const customerMap = /* @__PURE__ */ new Map();
    deliveredOrders.forEach((order) => {
      const existing = customerMap.get(order.userId);
      if (existing) {
        existing.orders += 1;
        existing.revenue += Number(order.total);
      } else {
        customerMap.set(order.userId, {
          userId: order.userId,
          name: order.name,
          phone: order.phone,
          orders: 1,
          revenue: Number(order.total)
        });
      }
    });
    const topCustomers = Array.from(customerMap.values()).sort((a, b) => {
      if (b.revenue !== a.revenue) {
        return b.revenue - a.revenue;
      }
      return b.orders - a.orders;
    }).slice(0, 10).map((item) => ({
      ...item,
      revenue: Number(item.revenue.toFixed(2))
    }));
    return {
      filter: {
        year,
        month: month ?? null
      },
      summary: {
        totalOrders,
        deliveredOrders: deliveredOrderCount,
        pendingOrders: pendingOrders.length,
        shippedOrders: shippedOrders.length,
        cancelledOrders: cancelledOrders.length,
        partialOrders: partialOrders.length,
        totalSales: Number(totalSales.toFixed(2)),
        totalShippingRevenue: Number(totalShippingRevenue.toFixed(2)),
        averageOrderValue: Number(averageOrderValue.toFixed(2)),
        totalProductsSold,
        insideDhakaOrders: insideDhakaOrders.length,
        outsideDhakaOrders: outsideDhakaOrders.length,
        insideDhakaRevenue: Number(insideDhakaRevenue.toFixed(2)),
        outsideDhakaRevenue: Number(outsideDhakaRevenue.toFixed(2))
      },
      revenueTrend,
      ordersByStatus,
      bestSellingProducts,
      topDistricts,
      topCustomers
    };
  } catch (error) {
    console.error("GET ANALYTICS ERROR:", error);
    throw new Error("Failed to fetch analytics");
  }
};
var analyticsService = {
  getAllAnalytics
};

// src/app/modules/analytics/analytics.controller.ts
var getAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsService.getAllAnalytics({
    year: req.query.year,
    month: req.query.month
  });
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Analytics retrieved successfully",
    data: result
  });
});
var analyticsController = {
  getAnalytics
};

// src/app/modules/analytics/analytics.route.ts
var router15 = Router12();
var accessRole13 = auth(Role.ADMIN, Role.SUPER_ADMIN);
router15.get("/", accessRole13, analyticsController.getAnalytics);
var AnalyticsRoutes = router15;

// src/app/modules/dashboard-analytics/dashboard.route.ts
import { Router as Router13 } from "express";

// src/app/modules/dashboard-analytics/dashboard.service.ts
var getDashboard = async () => {
  try {
    const now = /* @__PURE__ */ new Date();
    const last30Days = new Date(now);
    last30Days.setDate(last30Days.getDate() - 30);
    last30Days.setHours(0, 0, 0, 0);
    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);
    last7Days.setHours(0, 0, 0, 0);
    const last14Days = new Date(now);
    last14Days.setDate(last14Days.getDate() - 13);
    last14Days.setHours(0, 0, 0, 0);
    const [
      salesAggregate,
      deliveredOrderCount,
      totalOrders,
      totalProducts,
      totalCustomers,
      last30DaysOrders,
      last7DaysOrders,
      recentOrders,
      statusCounts,
      deliveredOrdersForProducts,
      deliveredOrdersForRevenue
    ] = await Promise.all([
      // ==============================
      // TOTAL SALES
      // DELIVERED ONLY
      // ==============================
      prisma.order.aggregate({
        where: {
          status: OrderStatus.DELIVERED
        },
        _sum: {
          total: true
        }
      }),
      // ==============================
      // DELIVERED ORDER COUNT
      // ==============================
      prisma.order.count({
        where: {
          status: OrderStatus.DELIVERED
        }
      }),
      // ==============================
      // TOTAL ORDERS
      // ==============================
      prisma.order.count(),
      // ==============================
      // TOTAL PRODUCTS
      // ==============================
      prisma.product.count(),
      // ==============================
      // TOTAL CUSTOMERS
      // ==============================
      prisma.user.count({
        where: {
          role: Role.CUSTOMER
        }
      }),
      // ==============================
      // LAST 30 DAYS ORDERS
      // ==============================
      prisma.order.count({
        where: {
          createdAt: {
            gte: last30Days,
            lte: now
          }
        }
      }),
      // ==============================
      // LAST 7 DAYS ORDERS
      // ==============================
      prisma.order.count({
        where: {
          createdAt: {
            gte: last7Days,
            lte: now
          }
        }
      }),
      // ==============================
      // RECENT ORDERS
      // ==============================
      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          name: true,
          phone: true,
          total: true,
          status: true,
          createdAt: true,
          _count: {
            select: {
              items: true
            }
          }
        }
      }),
      // ==============================
      // ORDERS BY STATUS
      // ==============================
      prisma.order.groupBy({
        by: ["status"],
        _count: {
          _all: true
        }
      }),
      // ==============================
      // DELIVERED ORDERS
      // FOR TOP PRODUCTS
      // ==============================
      prisma.order.findMany({
        where: {
          status: OrderStatus.DELIVERED
        },
        select: {
          items: {
            select: {
              productId: true,
              name: true,
              price: true,
              quantity: true
            }
          }
        }
      }),
      // ==============================
      // LAST 14 DAYS DELIVERED ORDERS
      // FOR REVENUE TREND
      // ==============================
      prisma.order.findMany({
        where: {
          status: OrderStatus.DELIVERED,
          createdAt: {
            gte: last14Days,
            lte: now
          }
        },
        select: {
          total: true,
          createdAt: true
        },
        orderBy: {
          createdAt: "asc"
        }
      })
    ]);
    const totalSales = salesAggregate._sum.total ?? 0;
    const averageOrderValue = deliveredOrderCount > 0 ? totalSales / deliveredOrderCount : 0;
    const statusMap = {
      PENDING: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
      PARTIAL: 0
    };
    statusCounts.forEach((item) => {
      statusMap[item.status] = item._count._all;
    });
    const ordersByStatus = [
      {
        status: "PENDING",
        count: statusMap.PENDING
      },
      {
        status: "SHIPPED",
        count: statusMap.SHIPPED
      },
      {
        status: "DELIVERED",
        count: statusMap.DELIVERED
      },
      {
        status: "CANCELLED",
        count: statusMap.CANCELLED
      },
      {
        status: "PARTIAL",
        count: statusMap.PARTIAL
      }
    ];
    const productMap = /* @__PURE__ */ new Map();
    deliveredOrdersForProducts.forEach((order) => {
      order.items.forEach((item) => {
        const existing = productMap.get(item.productId);
        const itemRevenue = item.price * item.quantity;
        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += itemRevenue;
        } else {
          productMap.set(item.productId, {
            productName: item.name,
            quantity: item.quantity,
            revenue: itemRevenue
          });
        }
      });
    });
    const topProductEntries = Array.from(productMap.entries()).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 5);
    const productIds = topProductEntries.map(([productId]) => productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      select: {
        id: true,
        thumbnail: true
      }
    });
    const thumbnailMap = new Map(
      products.map((product) => [product.id, product.thumbnail])
    );
    const topProducts = topProductEntries.map(([productId, product]) => ({
      productId,
      productName: product.productName,
      thumbnail: thumbnailMap.get(productId) ?? "",
      quantity: product.quantity,
      revenue: product.revenue
    }));
    const revenueMap = /* @__PURE__ */ new Map();
    deliveredOrdersForRevenue.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      const existing = revenueMap.get(date);
      if (existing) {
        existing.revenue += order.total;
        existing.orders += 1;
      } else {
        revenueMap.set(date, {
          revenue: order.total,
          orders: 1
        });
      }
    });
    const revenueTrend = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(last14Days);
      date.setDate(last14Days.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      const data = revenueMap.get(dateString);
      revenueTrend.push({
        date: dateString,
        revenue: data?.revenue ?? 0,
        orders: data?.orders ?? 0
      });
    }
    const formattedRecentOrders = recentOrders.map((order) => ({
      id: order.id,
      name: order.name,
      phone: order.phone,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      itemsCount: order._count.items
    }));
    return {
      summary: {
        totalSales,
        totalOrders,
        totalProducts,
        totalCustomers,
        averageOrderValue,
        last30DaysOrders,
        last7DaysOrders
      },
      recentOrders: formattedRecentOrders,
      ordersByStatus,
      topProducts,
      revenueTrend
    };
  } catch (error) {
    console.error("Dashboard analytics error:", error);
    throw new Error("Failed to fetch dashboard analytics");
  }
};
var DashboardService = {
  getDashboard
};

// src/app/modules/dashboard-analytics/dashboard.controller.ts
var getDashboard2 = catchAsync(async (req, res) => {
  const result = await DashboardService.getDashboard();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Dashboard analytics retrieved successfully",
    data: result
  });
});
var DashboardController = {
  getDashboard: getDashboard2
};

// src/app/modules/dashboard-analytics/dashboard.route.ts
var router16 = Router13();
router16.get("/", DashboardController.getDashboard);
var DashboardRoutes = router16;

// src/app/modules/reviews/review.route.ts
import { Router as Router14 } from "express";

// src/app/modules/reviews/review.service.ts
var createReview = async (payload) => {
  try {
    const result = await prisma.review.create({
      data: {
        productId: payload.productId,
        userId: payload.userId,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        rating: payload.rating,
        comment: payload.comment,
        likeCount: payload.likeCount ?? 0,
        isPublished: payload.isPublished ?? true
      }
    });
    const reviews = await prisma.review.findMany({
      where: {
        productId: payload.productId,
        isPublished: true
      },
      select: {
        rating: true
      }
    });
    const reviewCount = reviews.length;
    const rating = reviewCount > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : 0;
    await prisma.product.update({
      where: {
        id: payload.productId
      },
      data: {
        rating,
        reviewCount
      }
    });
    return result;
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);
    throw new Error("Failed to create review");
  }
};
var getProductReviews = async (productId, query) => {
  try {
    const { page = "1", limit = "10", rating, isPublished } = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const filters = {
      productId
    };
    if (rating) {
      filters.rating = Number(rating);
    }
    if (isPublished !== void 0) {
      filters.isPublished = isPublished === "true";
    }
    const [data, total] = await Promise.all([
      prisma.review.findMany({
        where: filters,
        orderBy: {
          createdAt: "desc"
        },
        skip,
        take: limitNumber
      }),
      prisma.review.count({
        where: filters
      })
    ]);
    return {
      data,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber)
      }
    };
  } catch (error) {
    console.error("GET PRODUCT REVIEWS ERROR:", error);
    throw new Error("Failed to fetch reviews");
  }
};
var getSingleReview = async (id) => {
  try {
    const result = await prisma.review.findUnique({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch review");
  }
};
var updateReview = async (id, payload) => {
  try {
    const result = await prisma.review.update({
      where: {
        id
      },
      data: payload
    });
    const reviews = await prisma.review.findMany({
      where: {
        productId: result.productId,
        isPublished: true
      },
      select: {
        rating: true
      }
    });
    const reviewCount = reviews.length;
    const rating = reviewCount > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : 0;
    await prisma.product.update({
      where: {
        id: result.productId
      },
      data: {
        rating,
        reviewCount
      }
    });
    return result;
  } catch (error) {
    console.error("UPDATE REVIEW ERROR:", error);
    throw new Error("Failed to update review");
  }
};
var deleteReview = async (id) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id
      }
    });
    if (!review) {
      throw new Error("Review not found");
    }
    const result = await prisma.review.delete({
      where: {
        id
      }
    });
    const reviews = await prisma.review.findMany({
      where: {
        productId: review.productId,
        isPublished: true
      },
      select: {
        rating: true
      }
    });
    const reviewCount = reviews.length;
    const rating = reviewCount > 0 ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviewCount : 0;
    await prisma.product.update({
      where: {
        id: review.productId
      },
      data: {
        rating,
        reviewCount
      }
    });
    return result;
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);
    throw new Error("Failed to delete review");
  }
};
var ReviewService = {
  createReview,
  getProductReviews,
  getSingleReview,
  updateReview,
  deleteReview
};

// src/app/modules/reviews/review.controller.ts
var createReview2 = catchAsync(async (req, res) => {
  const result = await ReviewService.createReview(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result
  });
});
var getProductReviews2 = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ReviewService.getProductReviews(
    productId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: result
  });
});
var getSingleReview2 = catchAsync(async (req, res) => {
  const result = await ReviewService.getSingleReview(req.params.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review fetched successfully",
    data: result
  });
});
var updateReview2 = catchAsync(async (req, res) => {
  const result = await ReviewService.updateReview(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result
  });
});
var deleteReview2 = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteReview(req.params.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: result
  });
});
var ReviewController = {
  createReview: createReview2,
  getProductReviews: getProductReviews2,
  getSingleReview: getSingleReview2,
  updateReview: updateReview2,
  deleteReview: deleteReview2
};

// src/app/modules/reviews/review.route.ts
var router17 = Router14();
var accessRole14 = auth(Role.ADMIN, Role.SUPER_ADMIN);
router17.post("/", ReviewController.createReview);
router17.get(
  "/product/:productId",
  accessRole14,
  ReviewController.getProductReviews
);
router17.get("/:id", accessRole14, ReviewController.getSingleReview);
router17.patch("/:id", accessRole14, ReviewController.updateReview);
router17.delete("/:id", accessRole14, ReviewController.deleteReview);
var ReviewRoutes = router17;

// src/app/routes/index.ts
var router18 = Router15();
router18.use("/users", UserRoute);
router18.use("/products", ProductRoutes);
router18.use("/orders", OrderRoutes);
router18.use("/cart", CartRoute);
router18.use("/chatbot", ChatbotRoutes);
router18.use("/wishlist", WishlistRoutes);
router18.use("/categories", categoryRoutes);
router18.use("/heroes", HeroRoutes);
router18.use("/analytics", AnalyticsRoutes);
router18.use("/dashboard-analytics", DashboardRoutes);
router18.use("/reviews", ReviewRoutes);
router18.use("/personal-entries", PersonalEntryRoutes);
router18.use("/steadfast-withdrawals", SteadfastWithdrawalRoutes);
router18.use("/investor-payments", InvestorPaymentRoutes);
router18.use("/shipments", ShipmentRoutes);
router18.use("/wholesales", WholesaleRoutes);
router18.use("/monthly-costs", MonthlyCostRoutes);
var routes_default = router18;

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
import "dotenv/config";
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
