import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";

/**
 * Fan-out two notifications:
 *  • seller → ITEM_SOLD
 *  • buyer  → ORDER_PLACED
 *
 * @param {string} orderId Firestore document id
 * @param {object} order   Full order object you just wrote
 *                         (must include sellerId, buyerId, title, totalAmount)
 */
export const writeNotifications = async (orderId, order) => {
  const payloads = [
    {
      uid: order.sellerId,
      type: "ITEM_SOLD",
      msg: `You sold “${order.title}” for $${order.totalAmount}`,
    },
    {
      uid: order.buyerId,
      type: "ORDER_PLACED",
      msg: `Order placed for “${order.title}” ($${order.totalAmount})`,
    },
  ];

  const writes = payloads.map(p =>
    setDoc(
      doc(db, `users/${p.uid}/notifications/${orderId}-${p.type}`),
      {
        orderId,
        ...p,
        read: false,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )
  );

  await Promise.all(writes);
};
