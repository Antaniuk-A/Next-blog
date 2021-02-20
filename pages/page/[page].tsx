import { useRouter } from "next/router";
import { getPostsForPage, getCountOfPages } from "../../lib/graphcms";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { TPost, TPostsConnection } from "../../models";
import LoadingScreen from '../../components/LoadingScreen';
import PostsContainer from '../../components/PostsContainer';
import Pagination from '../../components/Pagination';
import Error from '../../components/Error';

type TParams = {
  page: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countOfPages: number = await getCountOfPages();

  const generatePaths = () =>
    Array.from(
      {
        length: countOfPages
      },
      (_, ix) => ({
        params: {
          page: `${ix + 1}`
        }
      })
    );

  return {
    paths: generatePaths(),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: { params: TParams }) => {
  const {
    posts,
    postsConnection
  }: {
    posts: TPost[];
    postsConnection: TPostsConnection;
  } = await getPostsForPage(parseInt(params.page, 10));
  return {
    props: {
      posts,
      pageInfo: { ...postsConnection.pageInfo, page: parseInt(params.page, 10) }
    }
  };
};

export default function Page({
  posts,
  pageInfo
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return <LoadingScreen />;

  if (!posts.length && posts.length === 0) {
    return <Error />
  }

  return (
    <div className='flex flex-col items-center'>
      <PostsContainer posts={posts} />
      <Pagination
        hasNext={pageInfo.hasNextPage}
        hasPrev={pageInfo.hasPreviousPage}
        page={pageInfo.page}
      />
    </div>
  );
}
