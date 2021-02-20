export type TPost = {
  id: string;
  title: string;
  slug: string;
  content?: {
    html: string;
  };
  excerpt?: string;
  date: string;
  coverImage: {
    url: string;
  };
  author: TAuthor;
};

export type TAuthor = {
  name: string;
  picture: {
    url: string;
  };
};

export type TSlug = {
  slug: string;
};

export type TPostsConnection = {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type TPagination = {
  posts: TPost[];
  postsConnection: TPostsConnection;
};
