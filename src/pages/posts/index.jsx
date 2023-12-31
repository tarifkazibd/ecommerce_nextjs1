import Link from "next/link";

const Posts = ({ posts }) => {
  return (
    <div>
      <h2> I am post page</h2>
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.title}`}>
            <li>{post.title}</li>
          </Link>
        ))};
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
  const res = await fetch("http://localhost:5000/posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    //   koto second por por call hoba
    revalidate: 10,
  };
}

export default Posts;
