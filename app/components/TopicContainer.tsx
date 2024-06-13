import { PropsWithChildren } from "react"
import PaginationContainer from "./PaginationContainer";

type Props=PropsWithChildren<{
  totalPages:number;
  currentPage:number;
}>;

const TopicContainer = ({children,totalPages,currentPage}:Props) => {
  return (
    <div className="p-5 flex flex-col gap-10 items-center">
        <div className="flex flex-wrap justify-center gap-6">{children}</div>
        <PaginationContainer totalPages={totalPages} currentPage={currentPage}/>
    </div>
  )
}

export default TopicContainer