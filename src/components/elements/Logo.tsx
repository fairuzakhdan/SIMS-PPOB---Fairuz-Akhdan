import { Link } from "react-router-dom";
import logoImg from "../../assets/images/Logo.png";

interface LogoProps {
  clickable?: boolean;
}

const Logo = ({ clickable = true }: LogoProps) => {
  const content = (
    <>
      <img src={logoImg} alt="SIMS PPOB Logo" className="h-7 md:h-8" />
      <span className="font-semibold text-base md:text-lg">SIMS PPOB - FAIRUZ AKHDAN</span>
    </>
  );

  if (clickable) {
    return (
      <Link to="/" className="flex items-center gap-2">
        {content}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {content}
    </div>
  );
};

export default Logo;
