const Footer = () => {
  return (
    <div className="bg-slate-800 py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 container mx-auto items-center">
        <span className="sm:text-2xl md:text-4xl text-white font-bold tracking-tight">
          DBooking.com
        </span>
        <h2 className="text-1xl text-white">©2024 Dimitar Jovcheski</h2>
        <span className="flex flex-col items-center sm:flex-row text-white font-bold tracking-tight gap-3">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
