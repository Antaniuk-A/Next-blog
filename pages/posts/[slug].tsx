import { getPostBySlug, getAllPostsWithSlug } from "../../lib/graphcms";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { TPost, TSlug } from "../../models";
import PostPage from "../../components/PostPage";
import Error from '../../components/Error';

type TParams = {
  slug: string | string[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: TSlug[] = await getAllPostsWithSlug();

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: { params: TParams }) => {
  const post: TPost = await getPostBySlug(params.slug);

  return {
    props: {
      post: post
    }
  };
};

export default function Post({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {

  if (!post) {
    return <Error />
  }

  return (
    <>
      <PostPage post={post} />
    </>
  );
}
