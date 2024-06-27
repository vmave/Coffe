import { useEffect, useState } from "react";
import AlertIcon from "../../assets/alert-icon.svg";

interface ErrorAlertProps {
  message: string;
}

export const Alert: React.FC<ErrorAlertProps> = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show) return null;

  return (
    <div
      className="fixed top-5 right-5 flex items-center justify-between bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg z-50"
      role="alert"
      style={{
        transition: "opacity 0.5s, transform 0.9s",
        opacity: show ? 1 : 0,
        animation: "slideIn 0.5s ease-out forwards",
      }}
    >
      <div className="flex items-center">
        <span className="mr-2">
          <img src={AlertIcon} alt="Alert Icon" />
        </span>
        {message}
      </div>
      <button onClick={() => setShow(false)} className="ml-4">
        <span>×</span>
      </button>
    </div>
  );
};
