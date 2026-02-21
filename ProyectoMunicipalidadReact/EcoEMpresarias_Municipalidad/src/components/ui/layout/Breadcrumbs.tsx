import { Link } from "react-router-dom";
import { useNavigationHistory } from "../../../context/NavigationContext";

export function Breadcrumbs() {
  const { history, setHistory } = useNavigationHistory();

  const handleClick = (index: number) => {
    
    setHistory(history.slice(0, index + 1));
  };

  return (
    <nav className="text-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-white hover:underline" onClick={() => setHistory([])}>
          Home
        </Link>
        {history.map((item, idx) => (
          <span key={item.path} className="flex items-center gap-2">
            <span className="text-white">/</span>
            <Link
              to={item.path}
              className="text-white hover:underline"
              onClick={() => handleClick(idx)}
            >
              {item.label}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
}

