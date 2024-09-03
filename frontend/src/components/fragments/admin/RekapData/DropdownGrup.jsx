import KelasDropdown from "@/components/elements/KelasDropdown";
import NamaKelasDropdown from "@/components/elements/NamaKelasDropdown";
import MonthDropdown from "@/components/elements/MonthDropdown";
import YearDropdown from "@/components/elements/YearDropDown";
const DropdownGroup = ({
  handleSelectYear,
  handleSelectMonth,
  onSelectKelas,
  onSelectIdKelas,
  kelas,
}) => {
  return (
    <div className="grid md:flex gap-4">
      <div className="flex flex-wrap justify-start gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="tahun"
            className="text-sm font-semibold text-gray-700"
          >
            Tahun
          </label>
          <YearDropdown onSelectYear={handleSelectYear} />
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="bulan"
            className="text-sm font-semibold text-gray-700"
          >
            Bulan
          </label>
          <MonthDropdown onSelectMonth={handleSelectMonth} />
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-700">Kelas</p>
          <KelasDropdown onChange={onSelectKelas} />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-700 w-fit">Nama </p>
          <NamaKelasDropdown onChange={onSelectIdKelas} kelas={kelas} />
        </div>
      </div>
    </div>
  );
};

export default DropdownGroup;
