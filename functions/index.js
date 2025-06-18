const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function: Triggers on new order creation
 * Creates:
 * - ITEM_SOLD notification for seller
 * - ORDER_PLACED notification for buyer
 */
exports.notifyOrderCreated = functions.firestore
    .document("orders/{orderId}")
    .onCreate(async (snap, context) => {
      const order = snap.data();
      const orderId = context.params.orderId;

      const payloads = [
        {
          uid: order.sellerId,
          docId: `${orderId}-sold`,
          type: "ITEM_SOLD",
          msg: `You sold “${order.title}” for $${order.totalAmount}`,
        },
        {
          uid: order.buyerId,
          docId: `${orderId}-placed`,
          type: "ORDER_PLACED",
          msg: `Order placed for “${order.title}” ($${order.totalAmount})`,
        },
      ];

      const batch = db.batch();
      payloads.forEach(({uid, docId, ...data}) => {
        const ref = db.doc(`users/${uid}/notifications/${docId}`);
        batch.set(ref, {
          ...data,
          orderId,
          read: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      await batch.commit();
      console.log("Notifications sent for order:", orderId);
      return null;
    });
