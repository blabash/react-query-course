import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList() {
  const { data, isLoading, isError } = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );
  console.log("data", data);
  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {data.map((issue) => (
            <IssueItem key={issue.id} {...issue} />
          ))}
        </ul>
      )}
    </div>
  );
}
