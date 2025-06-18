import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { toast } from "react-toastify";

const Ctx = createContext();
export const useNotifications = () => useContext(Ctx);

export const NotificationProvider = ({ children }) => {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, `users/${user.uid}/notifications`),
      where("read", "==", false),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      setUnread(snap.size);

      snap.docChanges().forEach(change => {
        if (change.type === "added") {
          const data = change.doc.data();

          toast.info(data.msg, {
            autoClose: 5000,
            onClose: () => updateDoc(change.doc.ref, { read: true }),
          });
        }
      });
    });

    return () => unsub();
  }, []);

  return <Ctx.Provider value={{ unread }}>{children}</Ctx.Provider>;
};
