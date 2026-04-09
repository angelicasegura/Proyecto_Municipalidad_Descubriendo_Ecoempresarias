export default function Layout({ children }: any) {
  return (
    <div className="p-6 sm:mr-[60px] md:mr-[250px] transition-all duration-300">
      {children}
    </div>
  );
}