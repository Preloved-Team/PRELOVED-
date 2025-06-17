import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAllowed(false);
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      const userRole = userData?.role;

      if (allowedRoles.includes(userRole)) {
        setIsAllowed(true);
      }

      setLoading(false);
    };

    checkAccess();
  }, [allowedRoles]);

  if (loading) return <p className="text-center mt-5">Checking access...</p>;

  return isAllowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
