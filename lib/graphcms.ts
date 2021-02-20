import { GraphQLClient } from "graphql-request";
import { TPost, TSlug, TPagination, TPostsConnection } from "../models";


const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_PROJECT_API, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_PROD_AUTH_TOKEN}`
  }
});

export async function getAllPostsWithSlug(): Promise<TSlug[]> {
  const { posts }: { posts: TSlug[] } = await graphcms.request(
    `{
      posts {
        slug
      }
    }`
  );

  return posts;
}

export async function getPostBySlug(slug: string | string[]): Promise<TPost> {
  const { post }: { post: TPost } = await graphcms.request(
    `query PostBySlug($slug: String!) {
      post(where: {slug: $slug}) {
        title
        slug
        content {
          html
        }
        date
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        author {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
      } 
    }`,
    { slug }
  );

  return post;
}

export async function getCountOfPages(): Promise<number> {
  const countOfPages: string = await graphcms.request(
    `{
      postsConnection(first: ${process.env.NEXT_PUBLIC_GRAPHCMS_PAGE_SIZE}) {
        aggregate {
          count
        }
      }
    }`
  );

  return parseInt(countOfPages, 10);
}

export async function getPostsForPage(
  pageNumber: number
): Promise<TPagination> {
  const pageSize: number = parseInt(process.env.NEXT_PUBLIC_GRAPHCMS_PAGE_SIZE, 10);
  const skipElements: number = (pageNumber - 1) * pageSize;

  const {
    posts,
    postsConnection
  }: {
    posts: TPost[];
    postsConnection: TPostsConnection;
  } = await graphcms.request(
    `{
      posts(orderBy: date_DESC, first: ${pageSize}, skip: ${skipElements}) {
        id
        title
        slug
        excerpt
        date
        coverImage {
          url(transformation: {
            image: {
              resize: {
                fit:crop,
                width:2000,
                height:1000
              }
            }
          })
        }
        author {
          name
          picture {
            url(transformation: {
              image: {
                resize: {
                  width:100,
                  height:100,
                  fit:crop
                }
              }
            })
          }
        }
      }

      postsConnection(first: ${pageSize}, skip: ${skipElements}) {
        pageInfo {
         hasNextPage
         hasPreviousPage
       }
     }
    }`
  );

  return { posts: posts, postsConnection: postsConnection };
}

export async function getAllPosts(): Promise<TPost[]> {
  const { posts }: { posts: TPost[] } = await graphcms.request(
    `{
      posts(orderBy: date_DESC, first: 20) {
        id
        title
        slug
        excerpt
        date
        coverImage {
          url(transformation: {
            image: {
              resize: {
                fit:crop,
                width:2000,
                height:1000
              }
            }
          })
        }
        author {
          name
          picture {
            url(transformation: {
              image: {
                resize: {
                  width:100,
                  height:100,
                  fit:crop
                }
              }
            })
          }
        }
      }
    }`
  );

  return posts;
}
