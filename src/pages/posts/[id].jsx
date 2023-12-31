import { useRouter } from "next/router";

const PostDetails = ({ post }) => {
  //kono update korla jodi loging... lekha dekhatea chai tahola useRouter() use kora hoba na hola dorkar nai
  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }
  //end loging text//
  return (
    <div>
      <h2> Details page of {post?.id}</h2>
      <h2> User Id: {post?.userId}</h2>
      <h2> Title: {post?.title}</h2>
      <p> Body Text: {post?.body}</p>
    </div>
  );
};
export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/posts/");
  const posts = await res.json();
  return {
    paths: posts.map((post) => {
      return {
        params: { id: post.id.toString() },
      };
    }),
    //   paths: [
    //     {
    //       params: {
    //         name: 'next.js',
    //       },
    //     }, // See the "paths" section below
    //   ],
    fallback: true, // false or "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:5000/posts/${id}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
  //   revalidate:10,
  //
}

export default PostDetails;
