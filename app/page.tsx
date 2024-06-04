import Image from "next/image";
import prisma from "./lib/prisma";
import TopicCard from "./components/TopicCard";
import TopicContainer from "./components/TopicContainer";

export default async function Home() {
  const topics = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      cover: true,
      type: {
        select: {
          value: true
        }
      }
    }
  });

  return (
    <div>
      <TopicContainer>
        {topics.map((topicItem) => (<TopicCard topic={topicItem} />))}
      </TopicContainer>
    </div>
  );
}
