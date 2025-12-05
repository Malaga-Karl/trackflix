import AddIcon from "@mui/icons-material/Add";
import { useSearch } from "../contexts/SearchContext";

export default function AddShowComponent() {
  const { focusSearch } = useSearch();

  return (
    <>
      <div
        style={{
          width: 220,
          height: 336,
          border: "white 1pt solid",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        className="add-show-card"
        onClick={focusSearch}
      >
        <AddIcon fontSize="large" />
      </div>
    </>
  );
}
