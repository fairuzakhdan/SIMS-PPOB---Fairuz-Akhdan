interface ServiceCardProps {
  icon: string;
  name: string;
  onClick?: () => void;
}

const ServiceCard = ({ icon, name, onClick }: ServiceCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-1 md:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <img 
        src={icon} 
        alt={name}
        className="w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <p className="text-[10px] md:text-xs text-center leading-tight">{name}</p>
    </div>
  );
};

export default ServiceCard;
