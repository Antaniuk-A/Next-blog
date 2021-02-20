import Link from "next/link";
import { TPost } from "../models";

export default function Post({ post }: { post: TPost }) {
  return (
    <div className="border-b border-blue-200 dark:border-blue-500 py-10">
      <Link as={`/posts/${post.slug}`} href="/posts/[slug]" key={post.id}>
        <img
          src={post.coverImage.url}
          alt={post.title}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex p-4">
        <img
          src={post.author.picture.url}
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="text-sm">
          <p className="text-gray-900 dark:text-gray-200">{post.author.name}</p>
          <p className="text-gray-500 dark:text-gray-400">{post.date}</p>
        </div>
      </div>

      <div className="px-4">
        <Link as={`/posts/${post.slug}`} href="/posts/[slug]" key={post.id}>
          <h2 className="text-2xl cursor-pointer hover:text-gray-700 dark:hover:text-gray-400">
            {post.title}
          </h2>
        </Link>
        <p className="mt-2">{post.excerpt}</p>
      </div>
    </div>
  );
}
