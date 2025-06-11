import { db } from "../fb-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const collectionName = "userName";
const collectionRef = collection(db, collectionName);

class PreLovedServices {
  // ✅ Create
  addData = (newData) => {
    return addDoc(collectionRef, {
      ...newData,
      disabled: false  // ✅ default soft delete flag
    });
  };

  // ✅ Update
  updateData = (id, newData) => {
    const oldData = doc(db, collectionName, id);
    return updateDoc(oldData, newData);
  };

  // ❌ Hard Delete (use only if absolutely necessary)
  deleteData = (id) => {
    const data = doc(db, collectionName, id);
    return deleteDoc(data);
  };

  // ✅ Soft Delete (recommended)
  disableData = (id, isDisabled = true) => {
    const data = doc(db, collectionName, id);
    return updateDoc(data, { disabled: isDisabled });
  };

  // ✅ Get One
  getData = (id) => {
    const data = doc(db, collectionName, id);
    return getDoc(data);
  };

  // ✅ Get All (excluding disabled)
  getAllData = async () => {
    const q = query(collectionRef, where("disabled", "==", false));
    return getDocs(q);
  };

  // 🔄 Optionally Get All (even disabled)
  getAllIncludingDisabled = () => {
    return getDocs(collectionRef);
  };
}

export default new PreLovedServices();
