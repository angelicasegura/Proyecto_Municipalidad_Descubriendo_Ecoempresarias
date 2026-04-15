import { useNavbar } from "../../../context/NavbarContext";

export default function Layout({ children }: any) {
  const { expanded } = useNavbar();

  return (
    <div
      className={`
        w-full
        ${expanded ? "md:pr-[250px]" : "md:pr-[60px]"}
      `}
    >
      {children}
    </div>
  );
}
