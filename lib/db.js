import * as admin from 'firebase-admin';
// 今後のために今使わないものもインポートしておく
import  { getFirestore, collection, query, where, getDocs, doc  }  from 'firebase-admin/firestore';

// サーバーサイドでのみinitializeAppが行われるようにadmin.apps.length === 0としておく
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

// FirestoreのコレクションのドキュメントIDを取得する関数
export const getFirestoreIds = async () => {
  const db = getFirestore();
  // Firestoreからテストというコレクションを取得する
  const test = db.collection('test');
  // ドキュメントIDを格納するための配列を用意する
  let paths = [];
  // コレクションのスナップショットを取得する
  const snapshot = await test.get();
  // スナップショットから値を取り出し配列に格納する
  snapshot.forEach(doc => {
    // getStaticPathsの中でパスとして使える形でドキュメントIDを配列に入れる
    paths.push({ params: { uid: doc.id } });
  });
  return paths;
}




