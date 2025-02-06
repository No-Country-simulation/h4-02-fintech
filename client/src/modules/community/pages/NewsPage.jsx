
import { Navbar } from "../../../core/dashboard/components/dashboard/investor/Navbar";
import { DailyTip } from "../components/DailyTip";
import { NewsItem } from "../components/NewsItem";
import { useNews } from "../hooks/useNews";

export const NewsPage = () => {
  const { news, loading } = useNews();

  return (
    <div>
      <Navbar title={"Infórmate y aprende con IUPI"} />
      <div className="max-w-6xl mx-auto p-4">
        <DailyTip />

        <h2 className="text-2xl mb-3">Noticias Relevantes para Vos</h2>
        {loading ? (
          <LoadingNewsPageSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2 2xl:gap-8">
            {news.map((newsItem) => (
              <NewsItem key={newsItem.guid} {...newsItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingNewsPageSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border-2 border-base-300 rounded-lg p-6 bg-base-100 animate-pulse"
        >
          <div className="h-4 bg-base-300 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-base-300 rounded w-full"></div>
            <div className="h-4 bg-base-300 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
