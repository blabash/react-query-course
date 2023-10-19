import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";

export const IssueItem = ({
  title,
  number,
  assignee,
  comments,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);
  console.log("createdByUsere", createdByUser);

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
          #{number} opened {relativeDate(createdDate)}{" "}
          {createdByUser.isSuccess && `by ${createdByUser.data.name}`}
        </small>
      </div>
      {assignee && assigneeUser.isSuccess && (
        <img
          src={assigneeUser.data.profilePictureUrl}
          className="assigned-to"
          alt={
            assigneeUser.data.name
              ? `${assigneeUser.data.name} user avatar`
              : "assignee avatar"
          }
        />
      )}
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
