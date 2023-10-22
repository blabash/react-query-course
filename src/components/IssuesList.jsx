import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels, status }) {
  const { data, isLoading, isError } = useQuery(
    ["issues", { labels, status }],
    () => {
      const statusString = status ? `&status=${status}` : "";
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
        res.json()
      );
    }
  );

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
