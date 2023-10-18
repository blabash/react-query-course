import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";

const IssueItem = ({
  title,
  number,
  assignee,
  comments,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  return (
    <li>
      <div>
        {status === "done" || status === "cancelled" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee && <div>{assignee}</div>}
      <span className="comment-count">
        {comments.length > 0 && (
          <>
            <GoComment />
            {comments.length}
          </>
        )}
      </span>
    </li>
  );
};

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
