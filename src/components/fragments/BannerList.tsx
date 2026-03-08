import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Banner } from "../../types/banner";

const BannerList = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/banner`);
        setBanners(response.data.data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current || banners.length === 0) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const itemWidth = scrollWidth / 3; // Total width divided by 3 sets (original + 2 duplicates)

    if (scrollLeft >= itemWidth * 2) {
      scrollRef.current.scrollLeft = itemWidth;
    } else if (scrollLeft <= 0) {
      scrollRef.current.scrollLeft = itemWidth;
    }
  };

  useEffect(() => {
    if (scrollRef.current && banners.length > 0) {
      const itemWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = itemWidth;
    }
  }, [banners]);

  const infiniteBanners = [...banners, ...banners, ...banners];

  return (
    <div className="mt-6 md:mt-8">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Temukan promo menarik</h2>
      {loading ? (
        <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-28 w-56 md:h-40 md:w-80 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onScroll={handleScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteBanners.map((banner, index) => (
            <img
              key={index}
              src={banner.banner_image}
              alt={banner.banner_name}
              className="h-28 md:h-40 rounded-lg object-cover flex-shrink-0"
              draggable={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerList;
