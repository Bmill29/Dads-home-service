export default function MapPlaceholder({ address }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-md border border-line">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#EAE4D6",
          backgroundImage:
            "linear-gradient(#DBD2BE 1px, transparent 1px), linear-gradient(90deg, #DBD2BE 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-white shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.4 7.3 11.6.4.3 1 .3 1.4 0C13 21.4 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </div>
        <p className="rounded-md bg-white/90 px-3 py-1.5 text-xs text-charcoal shadow-sm">
          {address.street}, {address.city}, {address.state} {address.zip}
        </p>
      </div>
    </div>
  );
}
