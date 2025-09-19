import { useCallback, useState, type FC } from "react";
import { InputBase } from "../../common/input/InputBase";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../../utility-functions/Debounce";

const Keyword: FC = () => {
  const [assignee, setAssignee] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const updateAssigneeParams = useCallback(
    debounce((e: string) => {
      const params = new URLSearchParams(searchParams);
      if (e) params.set("assignee", e);
      else params.delete("assignee");
      setSearchParams(params);
    }, 500),
    [searchParams, setSearchParams],
  );

  const handleChangeAssignee = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setAssignee(e.target.value);
    updateAssigneeParams(e.target.value);
  };

  return (
    <div>
      <InputBase
        label="Keyword"
        type="text"
        id="assignee-keyword"
        value={assignee}
        placeholder="Enter a assignee keyword..."
        onChange={(e) => handleChangeAssignee(e)}
      />
      <p style={{ fontSize: "var(--font-xs)" }}>Search assignee.</p>
    </div>
  );
};

export default Keyword;
