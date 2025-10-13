import type { FC } from "react";

interface DateInfoProps {
  createdAt: string;
  updatedAt: string;
  startDate: string | undefined;
  endDate: string | undefined;
}

const DateInfo: FC<DateInfoProps> = ({
  createdAt,
  updatedAt,
  startDate,
  endDate,
}) => {
  return (
    <div>
      <h1
        style={{
          fontSize: "var(--font-sm)",
          paddingBottom: "var(--spacing-sm)",
        }}
      >
        Dates
      </h1>
      <p>
        Created at:{" "}
        <span>{createdAt ? createdAt.toLocaleString() : "Wrong!"}</span>
      </p>

      <p>
        Updated at:{" "}
        <span>{updatedAt ? updatedAt.toLocaleString() : "Wrong!"}</span>
      </p>

      <p>
        Start date:{" "}
        <span>
          {startDate
            ? startDate.toLocaleString()
            : "You haven't set a start date yet."}
        </span>
      </p>
      <p>
        Due date:{" "}
        <span>
          {endDate
            ? endDate.toLocaleString()
            : "You haven't set a due date yet."}
        </span>
      </p>
    </div>
  );
};

export default DateInfo;
