import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  addDoc
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

// ==========================================
// USER & TEAM MANAGEMENT
// ==========================================

export const createUserProfile = async (uid, data) => {
  try {
    await setDoc(doc(db, USERS_COLLECTION, uid), {
      ...data,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (uid, data) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getAllTeamMembers = async () => {
  try {
    const usersCol = collection(db, USERS_COLLECTION);
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
};

export const deleteTeamMember = async (uid) => {
  try {
    await deleteDoc(doc(db, USERS_COLLECTION, uid));
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
};

// ==========================================
// TASK MANAGEMENT
// ==========================================

export const createTask = async (taskData) => {
  try {
    const tasksCol = collection(db, 'tasks');
    await addDoc(tasksCol, {
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const tasksCol = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCol);
    return taskSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
};

export const getTasksForUser = async (assignedToUid) => {
  try {
    const tasksCol = collection(db, 'tasks');
    const q = query(tasksCol, where("assignedTo", "==", assignedToUid));
    const taskSnapshot = await getDocs(q);
    return taskSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
