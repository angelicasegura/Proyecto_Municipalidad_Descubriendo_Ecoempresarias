import { useNavbar } from "../../../context/NavbarContext";

export default function Layout({ children }: any) {
  const { expanded } = useNavbar();

  return (
    <div
      className="w-full"
      style={{
        paddingRight: expanded ? "250px" : "60px",
      }}
    >
      {children}
    </div>
  );
}