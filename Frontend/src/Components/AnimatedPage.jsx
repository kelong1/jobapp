import { useLocation } from "react-router-dom";

const AnimatedPage = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page">
      {children}
    </div>
  );
};

export default AnimatedPage;
