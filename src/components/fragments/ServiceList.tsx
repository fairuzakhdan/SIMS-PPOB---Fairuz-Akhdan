import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ServiceCard from "../elements/ServiceCard";
import type { Service } from "../../types/service";

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 pb-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-12 md:w-16 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 pb-4">
      {services.map((service) => (
        <ServiceCard
          key={service.service_code}
          icon={service.service_icon}
          name={service.service_name}
          onClick={() => navigate(`/purchase/${service.service_code}`)}
        />
      ))}
    </div>
  );
};

export default ServiceList;
