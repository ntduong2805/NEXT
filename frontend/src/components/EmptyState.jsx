import Heading from "./Heading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const EmptyState = ({
  title = "No results",
  subtitle = "Try adjusting your search or filters to find what you're looking for.",
  showReset = false,
}) => {

  const navigate = useNavigate();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} />
      <div className="w-48 mt-6">
        {showReset && (
          <Button
            outline
            label="Reset filters"
            onClick={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
