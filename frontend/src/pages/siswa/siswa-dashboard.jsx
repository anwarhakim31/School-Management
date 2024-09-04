import backround

const SiswaDashboardPage = () => {
  return (
    <section className="px-6 pt-4 pb-10">
      <div className="grid  md:grid-cols-10 gap-6">
        <div className=" md:col-span-7">
          <div className="relative bg-white w-full h-52 rounded-md border shadow">
            <div className={`bg-[url(${})]`}></div>
          </div>
        </div>
        <div className="h-56 md:col-span-3"></div>
      </div>
    </section>
  );
};

export default SiswaDashboardPage;
