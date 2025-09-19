import { useCallback, type FC } from "react";
import { priorityOptions } from "../../../types/Priority";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../../utility-functions/Debounce";

const PrioritySelection: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = useCallback(
    debounce((priority: string | null) => {
      const params = new URLSearchParams(searchParams);
      params.delete("priority");
      if (priority) params.set("priority", priority);
      setSearchParams(params);
    }, 500),
    [searchParams, setSearchParams],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-sm)",
      }}
    >
      <h2 style={{ fontSize: "var(--font-sm)", fontWeight: "500" }}>
        Priority
      </h2>
      {priorityOptions.map((priority, index) => (
        <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
          <input
            type="radio"
            name="priority"
            id={priority.value}
            key={index}
            value={priority.value}
            onChange={(e) => updateParams(e.target.value)}
          />
          <label htmlFor={priority.value}>{priority.label}</label>
        </div>
      ))}
      <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
        <input
          type="radio"
          name="priority"
          value="none"
          onChange={() => updateParams(null)}
        />
        <label htmlFor="none">All priorities</label>
      </div>
    </div>
  );
};

export default PrioritySelection;
