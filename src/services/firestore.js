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
import { generateSlug, normalizeSlug } from './storage';

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
  if (!uid) {
    throw new Error('User ID is required to save portfolio');
  }

  const rawSlug =
    portfolioData.profile?.slug ||
    portfolioData.slug ||
    portfolioData.username ||
    generateSlug(portfolioData.profile?.name) ||
    uid;
  const slug = normalizeSlug(rawSlug) || uid;

  const payload = stripUndefined({
    ...portfolioData,
    profile: {
      ...(portfolioData.profile || {}),
      slug,
    },
    uid,
    ownerId: uid,
    userId: uid,
    creatorId: uid,
    slug,
    username: slug,
    updatedAt: serverTimestamp(),
    publishedAt: serverTimestamp(),
  });

  // Save to primary user portfolio document
  await setDoc(doc(db, 'portfolios', uid), payload, { merge: true });

  // Save slug alias pointing to this user
  await setDoc(doc(db, 'usernames', slug), {
    uid,
    userId: uid,
    ownerId: uid,
    slug,
    username: slug,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return { uid, username: slug, slug };
}

export async function loadPortfolioByUid(uid) {
  assertDb();
  if (!uid) return null;

  try {
    // 1. Direct document lookup by User ID
    const snap = await getDoc(doc(db, 'portfolios', uid));
    if (snap.exists()) {
      const data = snap.data();
      // Strict ownership check: only return if document belongs to this user
      if (
        data.uid === uid ||
        data.userId === uid ||
        data.ownerId === uid ||
        data.creatorId === uid
      ) {
        return data;
      }
    }

    // 2. Query collection where userId matches
    const qUserId = query(collection(db, 'portfolios'), where('userId', '==', uid), limit(1));
    const resUserId = await getDocs(qUserId);
    if (!resUserId.empty) {
      const data = resUserId.docs[0].data();
      if (data.uid === uid || data.userId === uid || data.ownerId === uid) {
        return data;
      }
    }

    // 3. Query collection where ownerId matches
    const qOwnerId = query(collection(db, 'portfolios'), where('ownerId', '==', uid), limit(1));
    const resOwnerId = await getDocs(qOwnerId);
    if (!resOwnerId.empty) {
      const data = resOwnerId.docs[0].data();
      if (data.uid === uid || data.userId === uid || data.ownerId === uid) {
        return data;
      }
    }

    // 4. Query collection where uid field matches
    const qUid = query(collection(db, 'portfolios'), where('uid', '==', uid), limit(1));
    const resUid = await getDocs(qUid);
    if (!resUid.empty) {
      const data = resUid.docs[0].data();
      if (data.uid === uid || data.userId === uid || data.ownerId === uid) {
        return data;
      }
    }

    return null;
  } catch (err) {
    console.warn('loadPortfolioByUid query error:', err);
    return null;
  }
}

export async function deletePortfolioFromFirestore(uid, username) {
  assertDb();
  if (!uid) return;

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
      const alias = await getDoc(doc(db, 'usernames', key));
      // Only delete username mapping if it belongs to this user
      if (alias.exists()) {
        const aliasData = alias.data();
        if (aliasData.uid === uid || aliasData.userId === uid || aliasData.ownerId === uid) {
          await deleteDoc(doc(db, 'usernames', key));
        }
      }
    } catch (e) {
      console.warn('Could not delete username doc:', e);
    }
  }
}

export async function loadPortfolioByUsername(username) {
  assertDb();
  const currentSlug = normalizeSlug(username);
  if (!currentSlug) return null;

  try {
    // 1. Primary Query: Query portfolios collection using where('slug', '==', currentSlug)
    const qSlug = query(collection(db, 'portfolios'), where('slug', '==', currentSlug), limit(1));
    const slugRes = await getDocs(qSlug);
    if (!slugRes.empty) return slugRes.docs[0].data();

    // 2. Query portfolios collection using where('username', '==', currentSlug)
    const qUsername = query(collection(db, 'portfolios'), where('username', '==', currentSlug), limit(1));
    const usernameRes = await getDocs(qUsername);
    if (!usernameRes.empty) return usernameRes.docs[0].data();

    // 3. Query portfolios collection using where('profile.slug', '==', currentSlug)
    const qProfileSlug = query(collection(db, 'portfolios'), where('profile.slug', '==', currentSlug), limit(1));
    const profileSlugRes = await getDocs(qProfileSlug);
    if (!profileSlugRes.empty) return profileSlugRes.docs[0].data();

    // 4. Lookup alias in usernames collection (for mapped alias pointers)
    const alias = await getDoc(doc(db, 'usernames', currentSlug));
    if (alias.exists()) {
      const { uid } = alias.data();
      if (uid) {
        const port = await getDoc(doc(db, 'portfolios', uid));
        if (port.exists()) return port.data();
      }
    }

    // 5. Direct document lookup by User ID (in case slug is uid)
    const directDoc = await getDoc(doc(db, 'portfolios', currentSlug));
    if (directDoc.exists()) {
      return directDoc.data();
    }

    return null;
  } catch (err) {
    console.warn('loadPortfolioByUsername query error:', err);
    return null;
  }
}
