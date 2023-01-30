// db.jsからgetFirestoreIds関数をインポート
import { getFirestoreIds  } from '../../lib/db';

const Test = () => {

  return (
    <div>
      テストページ
    </div>
  );
}

export default Test;

// getStaticPathsでレンダリングするページのパスを指定する
export async function getStaticPaths() {
  // レンダリングするページのパス
  const paths = await getFirestoreIds();

  return {
    paths: paths,
    // 定義されていないパス以外は404ページとして返したいので
    fallback: false,
  }
}

// getStaticPathsを使う場合にgetStaticPropsがないとエラーになるので書いておく
export async function getStaticProps() {
  return {
    props: { query: {} },
  }
}


