// db.jsからgetFirestorePaths関数をインポート
import { getFirestorePaths  } from '../../lib/db';

const test = () => {
  return (
    <div>
      テストページ
    </div>
  );
}

export default test;

// getStaticPathsでレンダリングするページのパスを指定する
export async function getStaticPaths() {
  // レンダリングするページのパス
  const paths = await getFirestorePaths();

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




