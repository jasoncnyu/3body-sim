import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { detectPreferredLanguage, getPack, normalizeLangCode } from "@/lib/i18n";

const NotFound = () => {
  const location = useLocation();
  const firstSegment = location.pathname.split("/").filter(Boolean)[0];
  const lang = normalizeLangCode(firstSegment) ?? detectPreferredLanguage();
  const t = getPack(lang).strings;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFoundMessage}</p>
        <Link to={`/${lang}`} className="text-primary underline hover:text-primary/90">{t.returnHome}</Link>
      </div>
    </div>
  );
};

export default NotFound;
