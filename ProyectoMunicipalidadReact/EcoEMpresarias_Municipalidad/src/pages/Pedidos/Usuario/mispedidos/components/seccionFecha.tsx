interface SeccionFechaProps {
  label: string;
}

const SeccionFecha = ({ label }: SeccionFechaProps) => {
  return (
    <div className="sticky top-0 z-10 bg-[hsl(var(--page-bg))] py-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </h2>
    </div>
  );
};

export default SeccionFecha;
