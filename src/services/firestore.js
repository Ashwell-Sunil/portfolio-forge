import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { generateSlug } from './storage';

function assertDb() {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Add credentials in src/services/firebase.js');
  }
}

function stripUndefined(value) {
  if (Array.isArray(value)) return value.map(stripUndefined);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, stripUndefined(v)])
    );
  }
  return value;
}

export async function savePortfolioToFirestore(uid, portfolioData) {
  assertDb();
  const username = (portfolioData.profile?.slug || generateSlug(portfolioData.profile?.name) || uid)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');

  const payload = stripUndefined({
    ...portfolioData,
    uid,
    ownerId: uid,
    userId: uid,
    creatorId: uid,
    username,
    updatedAt: serverTimestamp(),
    publishedAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'portfolios', uid), payload, { merge: true });
  await setDoc(doc(db, 'usernames', username), { uid, updatedAt: serverTimestamp() }, { merge: true });

  return { uid, username };
}

export async function loadPortfolioByUid(uid) {
  assertDb();
  const snap = await getDoc(doc(db, 'portfolios', uid));
  if (!snap.exists()) return null;
  return snap.data();
}

export async function deletePortfolioFromFirestore(uid, username) {
  assertDb();
  if (uid) {
    try {
      await deleteDoc(doc(db, 'portfolios', uid));
    } catch (e) {
      console.warn('Could not delete portfolio doc:', e);
    }
  }
  if (username) {
    try {
      const key = String(username).toLowerCase().replace(/[^a-z0-9-]/g, '');
      await deleteDoc(doc(db, 'usernames', key));
    } catch (e) {
      console.warn('Could not delete username doc:', e);
    }
  }
}

export async function loadPortfolioByUsername(username) {
  assertDb();
  const key = String(username || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!key) return null;

  const alias = await getDoc(doc(db, 'usernames', key));
  if (alias.exists()) {
    const { uid } = alias.data();
    if (uid) {
      const port = await getDoc(doc(db, 'portfolios', uid));
      if (port.exists()) return port.data();
    }
  }

  const q = query(collection(db, 'portfolios'), where('username', '==', key), limit(1));
  const result = await getDocs(q);
  if (!result.empty) return result.docs[0].data();

  const slugQuery = query(collection(db, 'portfolios'), where('profile.slug', '==', key), limit(1));
  const slugResult = await getDocs(slugQuery);
  if (!slugResult.empty) return slugResult.docs[0].data();

  return null;
}
