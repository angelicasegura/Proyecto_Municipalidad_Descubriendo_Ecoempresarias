import { useNavbar } from "../../../context/NavbarContext";

export default function Layout({ children }: any) {
  const { expanded } = useNavbar();

  return (
    <div
      className="p-6 transition-all duration-300"
      style={{
        paddingRight: expanded ? "250px" : "60px",
      }}
    >
      {children}
    </div>
  );
}