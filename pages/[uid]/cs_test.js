import { useRouter } from "next/router";
import { firestore } from '../../lib/FirebaseConfig';
// 現時点で使わないものもあるが今後のことを考えて入れておく
import { collection, query, where, getDocs, getDoc, doc, docs, getFirestore, setDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";

// PageExistとNoPageコンポーネントを読み込む
import NoPage from "../../components/NoPage";
import PageExist from "../../components/PageExist";

const Test = () => {
  const [ pageComponent, setPageComponent ] = useState();
  const router = useRouter();
  // ユーザーがアクセスしたページのパスを取得してurlに格納
  const url = router.query.uid;

  // routerとurlに変化があった場合だけこのuseEffectが実行される
  useEffect(() => {
    // urlが取得できていない状態でgetFirestoreDocが実行されないようにする
    if (!router.isReady) {
      return
    }
    // getFirestoreDoc関数を実行
    getFirestoreDoc(url)
    .then(
      (data) => {
        // getFirestoreDoc関数でリターンされたコンポーネントをpageComponentにセットする
        setPageComponent(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [router, url]);

  return (
    // pageComponentにはgetFirestoreDoc関数でリターンされたコンポーネントがセットされている
    <>
      { pageComponent }
    </>
  );
}

export default Test;


// クライアントサイドでFirestoreのドキュメントを取得する関数
export const getFirestoreDoc = async (url) => {
  // Firestoreのtestコレクションからユーザーがアクセスしたページのパスと同じドキュメントのリファレンス
  const docRef = doc(firestore, "test", url);
  // 上記の条件でドキュメントを取得
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // ドキュメントが存在する場合はPageExistコンポーネントを返す
    return <PageExist />
  } else {
    // ドキュメントが存在しない場合はNoPageコンポーネントを返す
    return <NoPage />
  }
}

