import Link from "next/link";
import Image from "next/image";

const EventsPage = ({ data }) => {
  
  return (
    <>
      <h1>Events in {data[0].city}</h1>
      <div>
        {data.map(ev => (
          <Link key={ev.id} href={`/${ev.city}/${ev.id}`}>
            <Image width={200} height={200} alt={ev.title} src={ev.image} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default EventsPage;

export async function getStaticPaths() {
  const { events_categories } = await import("../data/data.json");
  const allPaths = events_categories.map(ev => {
    return {
      params: {
        proj: ev.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.proj;
  const { allEvents } = await import("../data/data.json");
  const data = allEvents.filter(ev => ev.city === id);
  return {
    props: {
      data,
    },
  };
}
