import { useCallback, useState, type FC } from "react";
import { priorityOptions } from "../../../types/Priority";
import { CheckboxBase } from "../../common/checkbox/CheckboxBase";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../../utility-functions/Debounce";

const PrioritySelection: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priorities, setPriorities] = useState<string[]>([]);

  const updateParams = useCallback(
    debounce((priorities: string[]) => {
      const params = new URLSearchParams(searchParams);
      params.delete("priority");
      priorities.forEach((p) => params.append("priority", p));
      setSearchParams(params);
    }, 500),
    [searchParams, setSearchParams],
  );

  const handleChangePriorities = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tmp = priorities;
    if (e.target.checked && !priorities.includes(e.target.value)) {
      setPriorities([e.target.value, ...priorities]);
      tmp.push(e.target.value);
    }
    if (!e.target.checked && priorities.includes(e.target.value)) {
      tmp = priorities.filter((p) => p !== e.target.value);
      setPriorities(tmp);
    }
    updateParams(tmp);
  };

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
        <CheckboxBase
          name={priority.value}
          id={priority.value}
          key={index}
          value={priority.value}
          onChange={(e) => handleChangePriorities(e)}
        >
          {priority.label}
        </CheckboxBase>
      ))}
    </div>
  );
};

export default PrioritySelection;
