import Link from "next/link";
import Image from "next/image";

const Id = ({ data }) => {
  return (
    <>
      <Link href="/">Click to go to index</Link>
      <Image src={data.image} width={500} height={300} alt={data.title} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </>
  );
};

export default Id;

export async function getStaticPaths() {
  const data = await import("../data/data.json");
  const allEvents = data.allEvents;

  const allPaths = allEvents.map(path => {
    return {
      params: {
        proj: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const { allEvents } = await import("../data/data.json");
  const eventData = allEvents.find(ev => id === ev.id);

  return {
    props: { data: eventData },
  };
}
