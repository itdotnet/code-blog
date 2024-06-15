import prisma from "./lib/prisma";
import TopicCard from "./components/TopicCard";
import TopicContainer from "./components/TopicContainer";
import Search from "./components/Search";
const PAGE_SIZE = 2;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: Props) {
  const pagenum = searchParams.pagenum ?? 1;
  const query = searchParams.query ?? "";
  const topicsPromise = prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      cover: true,
      type: {
        select: {
          value: true
        }
      },
    },
    ...(!!query && {
      where: {
        title: {
          contains: String(query)
        }
      }
    }),
    skip: (+pagenum - 1) * PAGE_SIZE,
    take: PAGE_SIZE
  });

  const totalTopicsPromise = prisma.blog.count({
    ...(!!query && {
      where: {
        title: {
          contains: String(query)
        }
      }
    })
  });
  const [topics, totalTopics] = await Promise.all([topicsPromise, totalTopicsPromise]);
  const totalPages = Math.ceil(totalTopics / PAGE_SIZE);

  return (
    <div>
      <Search />
      <TopicContainer totalPages={totalPages} currentPage={+pagenum}>
        {topics.map((topicItem) => (<TopicCard topic={topicItem} />))}
      </TopicContainer>
    </div>
  );
}
