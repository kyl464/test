import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const SearchBar = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [location, setLocation] = useState(""); // Default kosong lebih baik
  const [availability, setAvailability] = useState(""); // Default kosong lebih baik
  const [minBudget, setMinBudget] = useState(1000000);
  const [maxBudget, setMaxBudget] = useState(13000000);

  const locationRef = useRef(null);
  const availabilityRef = useRef(null);
  const budgetRef = useRef(null);

  // 2. Inisialisasi useNavigate
  const navigate = useNavigate();

  // 3. Fungsi untuk menangani pencarian dan navigasi
  const handleSearch = () => {
    // Membuat objek URLSearchParams untuk membangun query string dengan aman
    const params = new URLSearchParams();

    if (location) {
      params.append("location", location);
    }
    if (availability) {
      params.append("availability", availability);
    }
    params.append("minBudget", minBudget.toString());
    params.append("maxBudget", maxBudget.toString());

    // Navigasi ke halaman list kosan dengan query parameters
    navigate(`/list-kosan?${params.toString()}`);
  };

  // Perbaikan pada logika handleClickOutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        availabilityRef.current &&
        !availabilityRef.current.contains(event.target) &&
        budgetRef.current &&
        !budgetRef.current.contains(event.target)
      ) {
        setShowLocation(false);
        setShowAvailability(false);
        setShowBudget(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 w-full max-w-[1100px] mx-auto bg-[#EBE5C2] rounded-[40px] p-4 shadow-lg z-10">
      <div className="flex items-center justify-between mt-5 mb-5 mx-4">
        <div className="flex items-center bg-transparent border-4 border-[#504B38] rounded-full px-4 py-3 relative flex-1">
          {/* Lokasi */}
          <div
            className="flex items-center flex-1 border-r border-[#504B38] pr-4 relative"
            ref={locationRef}
            onClick={() => {
              setShowLocation(!showLocation);
              setShowAvailability(false);
              setShowBudget(false);
            }}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            />
            <path
              d="M22.1521 30.625C20.5917 28.3354 18.9584 25.3167 18.9584 22.6042C18.9584 19.9354 20.3584 17.5 22.4584 16.0417H21.875V13.125H24.7917V14.9187C25.5209 14.7146 26.25 14.5833 26.9792 14.5833C27.2271 14.5833 27.475 14.5833 27.7084 14.6271V4.375H7.29169V30.625H16.0417V25.5208H18.9584V30.625H22.1521ZM21.875 7.29167H24.7917V10.2083H21.875V7.29167ZM13.125 27.7083H10.2084V24.7917H13.125V27.7083ZM13.125 21.875H10.2084V18.9583H13.125V21.875ZM13.125 16.0417H10.2084V13.125H13.125V16.0417ZM13.125 10.2083H10.2084V7.29167H13.125V10.2083ZM16.0417 7.29167H18.9584V10.2083H16.0417V7.29167ZM16.0417 13.125H18.9584V16.0417H16.0417V13.125ZM16.0417 21.875V18.9583H18.9584V21.875H16.0417ZM26.9792 17.5C24.2084 17.5 21.875 19.8479 21.875 22.6042C21.875 26.4104 26.9792 32.0833 26.9792 32.0833C26.9792 32.0833 32.0834 26.4104 32.0834 22.6042C32.0834 19.8479 29.75 17.5 26.9792 17.5ZM26.9792 24.5146C25.9584 24.5146 25.2292 23.6396 25.2292 22.7646C25.2292 21.7437 26.1042 21.0146 26.9792 21.0146C27.8542 21.0146 28.7292 21.875 28.7292 22.7646C28.875 23.6396 28 24.5146 26.9792 24.5146Z"
              fill="#504B38"
            />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Campus Location
              </p>
              <p className="text-sm text-gray-500 cursor-pointer">
                {location || "Select your campus location"}
              </p>
            </div>
            {showLocation && (
              <div className="absolute top-full left-0 bg-[#EBE5C2] shadow-md rounded-md mt-2 w-[200px]">
                {["Jakarta", "Bandung", "Surabaya", "Yogyakarta"].map((loc) => (
                  <p
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocation(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {loc}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Ketersediaan */}
          <div
            className="flex items-center h-full flex-1 border-r border-[#504B38] px-4 relative"
            ref={availabilityRef}
            onClick={() => {
              setShowAvailability(!showAvailability);
              setShowLocation(false);
              setShowBudget(false);
            }}
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <g clipPath="url(#clip0_127_57)">
                <path
                  d="M29.5625 5.5H25.8958V8.25C25.8958 8.51483 25.8437 8.77707 25.7423 9.02174C25.641 9.26642 25.4924 9.48873 25.3052 9.676C25.1179 9.86326 24.8956 10.0118 24.6509 10.1132C24.4062 10.2145 24.144 10.2667 23.8792 10.2667C23.6143 10.2667 23.3521 10.2145 23.1074 10.1132C22.8628 10.0118 22.6404 9.86326 22.4532 9.676C22.2659 9.48873 22.1174 9.26642 22.016 9.02174C21.9147 8.77707 21.8625 8.51483 21.8625 8.25V5.5H11.1833V8.25C11.1833 8.78485 10.9709 9.2978 10.5927 9.676C10.2145 10.0542 9.70152 10.2667 9.16667 10.2667C8.63182 10.2667 8.11887 10.0542 7.74067 9.676C7.36247 9.2978 7.15 8.78485 7.15 8.25V5.5H3.48333C3.26519 5.49752 3.04876 5.5388 2.84685 5.62142C2.64494 5.70404 2.46165 5.82631 2.30781 5.981C2.15398 6.13569 2.03273 6.31965 1.95123 6.52202C1.86973 6.72438 1.82964 6.94104 1.83333 7.15917V27.6742C1.82969 27.8884 1.8683 28.1013 1.94695 28.3007C2.0256 28.5001 2.14276 28.682 2.29172 28.836C2.44069 28.9901 2.61855 29.1133 2.81515 29.1987C3.01174 29.284 3.22322 29.3298 3.4375 29.3333H29.5625C29.7768 29.3298 29.9883 29.284 30.1849 29.1987C30.3815 29.1133 30.5593 28.9901 30.7083 28.836C30.8572 28.682 30.9744 28.5001 31.0531 28.3007C31.1317 28.1013 31.1703 27.8884 31.1667 27.6742V7.15917C31.1703 6.94488 31.1317 6.73198 31.0531 6.53263C30.9744 6.33327 30.8572 6.15136 30.7083 5.99728C30.5593 5.84321 30.3815 5.71999 30.1849 5.63466C29.9883 5.54934 29.7768 5.50358 29.5625 5.5ZM9.16667 23.8333H7.33333V22H9.16667V23.8333ZM9.16667 19.25H7.33333V17.4167H9.16667V19.25ZM9.16667 14.6667H7.33333V12.8333H9.16667V14.6667ZM14.6667 23.8333H12.8333V22H14.6667V23.8333ZM14.6667 19.25H12.8333V17.4167H14.6667V19.25ZM14.6667 14.6667H12.8333V12.8333H14.6667V14.6667ZM20.1667 23.8333H18.3333V22H20.1667V23.8333ZM20.1667 19.25H18.3333V17.4167H20.1667V19.25ZM20.1667 14.6667H18.3333V12.8333H20.1667V14.6667ZM25.6667 23.8333H23.8333V22H25.6667V23.8333ZM25.6667 19.25H23.8333V17.4167H25.6667V19.25ZM25.6667 14.6667H23.8333V12.8333H25.6667V14.6667Z"
                  fill="#504B38"
                />
                <path
                  d="M9.16667 9.16666C9.40978 9.16666 9.64294 9.07008 9.81485 8.89818C9.98676 8.72627 10.0833 8.49311 10.0833 8.25V2.74999C10.0833 2.50688 9.98676 2.27372 9.81485 2.10181C9.64294 1.92991 9.40978 1.83333 9.16667 1.83333C8.92355 1.83333 8.69039 1.92991 8.51849 2.10181C8.34658 2.27372 8.25 2.50688 8.25 2.74999V8.25C8.25 8.49311 8.34658 8.72627 8.51849 8.89818C8.69039 9.07008 8.92355 9.16666 9.16667 9.16666Z"
                  fill="#504B38"
                />
                <path
                  d="M23.8333 9.16666C24.0764 9.16666 24.3096 9.07008 24.4815 8.89818C24.6534 8.72627 24.75 8.49311 24.75 8.25V2.74999C24.75 2.50688 24.6534 2.27372 24.4815 2.10181C24.3096 1.92991 24.0764 1.83333 23.8333 1.83333C23.5902 1.83333 23.357 1.92991 23.1851 2.10181C23.0132 2.27372 22.9167 2.50688 22.9167 2.74999V8.25C22.9167 8.49311 23.0132 8.72627 23.1851 8.89818C23.357 9.07008 23.5902 9.16666 23.8333 9.16666Z"
                  fill="#504B38"
                />
              </g>
              <defs>
                <clipPath id="clip0_127_57">
                  <rect width="33" height="33" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Availability
              </p>
              <p className="text-sm text-gray-500 cursor-pointer">
                {availability || "Check availability date"}
              </p>
            </div>
            {showAvailability && (
              <div className="absolute top-full left-0 bg-[#EBE5C2] shadow-md rounded-md mt-2 w-[200px]">
                {[
                  "dalam 2 hari",
                  "dalam 2 minggu",
                  "dalam sebulan",
                  "lebih dari 2 bulan",
                ].map((time) => (
                  <p
                    key={time}
                    onClick={() => {
                      setAvailability(time);
                      setShowAvailability(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {time}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Budget */}
          <div
            className="flex items-center flex-1 px-4 relative"
            ref={budgetRef}
            onClick={() => {
              setShowBudget(!showBudget);
              setShowLocation(false);
              setShowAvailability(false);
            }}
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M6.15527 6.70312H26.7803C27.0212 6.70305 27.2619 6.71834 27.5009 6.74888C27.4199 6.18026 27.2245 5.63393 26.9267 5.14283C26.6288 4.65173 26.2346 4.22604 25.7678 3.89142C25.301 3.5568 24.7712 3.32018 24.2105 3.19582C23.6497 3.07147 23.0696 3.06196 22.5051 3.16787L5.54297 6.06374H5.52363C4.45891 6.26735 3.51209 6.86975 2.87654 7.7479C3.83406 7.06684 4.98025 6.7016 6.15527 6.70312ZM26.7803 8.24999H6.15527C5.06162 8.25119 4.01311 8.68617 3.23978 9.4595C2.46645 10.2328 2.03147 11.2813 2.03027 12.375V24.75C2.03147 25.8436 2.46645 26.8922 3.23978 27.6655C4.01311 28.4388 5.06162 28.8738 6.15527 28.875H26.7803C27.8739 28.8738 28.9224 28.4388 29.6958 27.6655C30.4691 26.8922 30.9041 25.8436 30.9053 24.75V12.375C30.9041 11.2813 30.4691 10.2328 29.6958 9.4595C28.9224 8.68617 27.8739 8.25119 26.7803 8.24999ZM23.7188 20.625C23.3108 20.625 22.9121 20.504 22.5729 20.2774C22.2337 20.0508 21.9694 19.7287 21.8132 19.3518C21.6571 18.9749 21.6163 18.5602 21.6959 18.1601C21.7755 17.76 21.9719 17.3925 22.2603 17.1041C22.5488 16.8156 22.9163 16.6192 23.3164 16.5396C23.7165 16.46 24.1312 16.5009 24.508 16.657C24.8849 16.8131 25.207 17.0775 25.4337 17.4166C25.6603 17.7558 25.7812 18.1546 25.7812 18.5625C25.7812 19.1095 25.564 19.6341 25.1772 20.0209C24.7904 20.4077 24.2658 20.625 23.7188 20.625Z"
                fill="#504B38"
              />
              <path
                d="M2.0625 16.7256V10.3125C2.0625 8.9158 2.83594 6.57422 5.52041 6.06697C7.79883 5.63965 10.0547 5.63965 10.0547 5.63965C10.0547 5.63965 11.5371 6.6709 10.3125 6.6709C9.08789 6.6709 9.12012 8.25 10.3125 8.25C11.5049 8.25 10.3125 9.76465 10.3125 9.76465L5.51074 15.2109L2.0625 16.7256Z"
                fill="#504B38"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-700">Budget</p>
              <p className="text-sm text-gray-500 cursor-pointer">
                IDR {minBudget.toLocaleString()} - {maxBudget.toLocaleString()}
              </p>
            </div>
            {showBudget && (
              <div
                className="absolute top-full left-0 bg-[#EBE5C2] shadow-md rounded-md mt-2 p-4 w-[250px]"
                onClick={(e) => e.stopPropagation()} // Mencegah dropdown tertutup saat interaksi di dalamnya
              >
                <label className="text-sm font-semibold">Min Budget</label>
                <input
                  type="range"
                  min="1000000"
                  max="13000000"
                  step="500000"
                  value={minBudget}
                  onChange={(e) => setMinBudget(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-700">
                  IDR {minBudget.toLocaleString()}
                </p>

                <label className="text-sm font-semibold mt-2">Max Budget</label>
                <input
                  type="range"
                  min="1000000"
                  max="13000000"
                  step="500000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-700">
                  IDR {maxBudget.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Tambahkan onClick pada Tombol Search */}
        <button
          onClick={handleSearch}
          className="bg-[#504B38] hover:bg-[#756E54] text-white rounded-full flex items-center justify-center p-2 ml-4 transition-colors duration-200"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            pointerEvents="none"
          >
            <path
              d="M21 33C22.5759 33 24.1363 32.6896 25.5922 32.0866C27.0481 31.4835 28.371 30.5996 29.4853 29.4853C30.5996 28.371 31.4835 27.0481 32.0866 25.5922C32.6896 24.1363 33 22.5759 33 21C33 19.4241 32.6896 17.8637 32.0866 16.4078C31.4835 14.9519 30.5996 13.629 29.4853 12.5147C28.371 11.4004 27.0481 10.5165 25.5922 9.91344C24.1363 9.31039 22.5759 9 21 9C17.8174 9 14.7652 10.2643 12.5147 12.5147C10.2643 14.7652 9 17.8174 9 21C9 24.1826 10.2643 27.2348 12.5147 29.4853C14.7652 31.7357 17.8174 33 21 33ZM33.64 30.812L40.8 37.972C40.9909 38.1566 41.1431 38.3774 41.2477 38.6215C41.3524 38.8656 41.4074 39.1281 41.4095 39.3936C41.4116 39.6592 41.3608 39.9225 41.2601 40.1682C41.1593 40.4139 41.0107 40.6371 40.8228 40.8248C40.6348 41.0124 40.4114 41.1608 40.1656 41.2612C39.9197 41.3616 39.6563 41.412 39.3908 41.4095C39.1252 41.407 38.8628 41.3516 38.6189 41.2467C38.3749 41.1417 38.1544 40.9891 37.97 40.798L30.81 33.638C27.5949 36.1337 23.5496 37.3103 19.4975 36.9284C15.4454 36.5464 11.6912 34.6346 8.9991 31.5821C6.30699 28.5296 4.87937 24.5659 5.00685 20.4978C5.13433 16.4298 6.80734 12.5632 9.68529 9.68529C12.5632 6.80734 16.4298 5.13433 20.4978 5.00685C24.5659 4.87937 28.5296 6.30699 31.5821 8.9991C34.6346 11.6912 36.5464 15.4454 36.9284 19.4975C37.3103 23.5496 36.1337 27.5949 33.638 30.81L33.64 30.812Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
