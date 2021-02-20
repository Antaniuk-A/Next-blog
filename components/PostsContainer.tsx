import Post from "./Post";
import { TPost } from '../models';

export default function PostsContainer({ posts }: { posts: TPost[] }) {
  return (
    <main className="mx-auto w-full md:w-3/5 lg:w-3/5 xl:w-2/5 min-h-screen">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </main>
  );
}
