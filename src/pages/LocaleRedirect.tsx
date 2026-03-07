import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { detectPreferredLanguage } from "@/lib/i18n";

const LocaleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lang = detectPreferredLanguage();
    navigate(`/${lang}`, { replace: true });
  }, [navigate]);

  return null;
};

export default LocaleRedirect;
