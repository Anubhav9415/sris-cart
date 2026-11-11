import mongoose from "mongoose";
import Product from "../models/product.js";
import { SAMPLE_CATALOG_MAP } from "./sampleCatalog.js";

/**
 * Resolves an order line item against MongoDB Products or the authoritative sample catalog.
 */
export const resolveOrderItem = async (rawItem) => {
  const productId = String(rawItem?.product || "").trim();
  const quantity = Number(rawItem?.quantity || 0);

  if (!productId || !Number.isFinite(quantity) || quantity <= 0) {
    throw new Error("Invalid order item or quantity");
  }

  let productDoc = null;
  if (mongoose.Types.ObjectId.isValid(productId)) {
    productDoc = await Product.findById(productId);
  }

  if (!productDoc) {
    productDoc = SAMPLE_CATALOG_MAP.get(productId) || null;
  }

  if (!productDoc) {
    throw new Error(`Product not found in catalog (${productId})`);
  }

  return {
    product: productId,
    quantity,
    name: productDoc.name,
    offerPrice: Number(productDoc.offerPrice),
    price: Number(productDoc.price || productDoc.offerPrice),
    image: Array.isArray(productDoc.image) ? productDoc.image : [productDoc.image].filter(Boolean),
    category: productDoc.category || "General",
  };
};

/**
 * Safely hydrates `items.product` on already-address-populated Order documents
 * without throwing Mongoose CastError on string catalog IDs like "mob-01".
 */
export const hydrateOrderProducts = async (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) return [];

  const objectIdSet = new Set();
  for (const order of orders) {
    for (const item of order.items || []) {
      const pid = typeof item.product === "string" ? item.product : item.product?._id;
      if (pid && mongoose.Types.ObjectId.isValid(pid)) {
        objectIdSet.add(String(pid));
      }
    }
  }

  const dbProductMap = new Map();
  if (objectIdSet.size > 0) {
    const dbProducts = await Product.find({ _id: { $in: Array.from(objectIdSet) } }).lean();
    for (const p of dbProducts) {
      dbProductMap.set(String(p._id), p);
    }
  }

  return orders.map((orderDoc) => {
    const orderObj = typeof orderDoc.toObject === "function" ? orderDoc.toObject() : { ...orderDoc };
    orderObj.items = (orderObj.items || []).map((item) => {
      const pid = typeof item.product === "string" ? item.product : String(item.product?._id || "");
      const resolvedProduct =
        dbProductMap.get(pid) ||
        SAMPLE_CATALOG_MAP.get(pid) ||
        (item.name
          ? {
              _id: pid,
              name: item.name,
              offerPrice: item.offerPrice,
              price: item.price || item.offerPrice,
              image: item.image || [],
              category: item.category || "General",
            }
          : null);

      return {
        ...item,
        product: resolvedProduct,
      };
    });
    return orderObj;
  });
};

