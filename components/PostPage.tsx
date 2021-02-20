import { TPost } from "../models";

export default function PostPage({ post }: { post: TPost }) {
  return (
    <div className="min-h-screen w-4/5 md:w-3/5 lg:w-3/5 xl:w-2/5 pb-10 mx-auto">
      <img src={post.coverImage.url} alt={post.title} />
      <h1 className="text-5xl m-4">{post.title}</h1>

      <div className="flex ml-4 my-6 items-center">
        <img
          src={post.author.picture.url}
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-4 "
        />
        <p className="text-gray-900 dark:text-gray-200 text-sm mr-3">
          {post.author.name}
        </p>
        <p className="text-gray-500 dark:text-gray-200 text-sm">{post.date}</p>
      </div>

      <div className="ml-4">
        <div dangerouslySetInnerHTML={{ __html: post.content?.html }} />
      </div>
    </div>
  );
}
