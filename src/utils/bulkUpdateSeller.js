import { db, auth } from '../Firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

// 👇 Run this once to fix older products
export const bulkAddSellerId = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in as a seller to run this.");
    return;
  }

  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);

  const updates = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (!data.sellerId) {
      const productRef = doc(db, 'products', docSnap.id);
      updates.push(updateDoc(productRef, { sellerId: user.uid }));
    }
  });

  try {
    await Promise.all(updates);
    alert("✅ Seller ID added to all missing products!");
  } catch (err) {
    console.error("❌ Failed to update some products:", err);
    alert("❌ Some updates failed. Check console for details.");
  }
};
