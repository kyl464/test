import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"; // Sesuaikan path jika perlu
import Link from "next/link";

const KosanDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Ambil ID dari URL

  // State untuk menyimpan data kosan tunggal, status loading, dan error
  const [kosan, setKosan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hanya jalankan fetch jika ID sudah tersedia dari router
    if (id) {
      setIsLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/kosan/${id}`;

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Data kosan tidak ditemukan.");
          }
          return res.json();
        })
        .then((data) => {
          setKosan(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]); // Effect ini berjalan setiap kali id berubah

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-gray-500">Memuat detail kosan...</p>
        </div>
      </>
    );
  }

  if (error || !kosan) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-xl text-red-500 mb-4">
            {error || "Gagal memuat data kosan."}
          </p>
          <Link href="/list-kosan">
            <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Kembali ke Daftar Kosan
            </a>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-28 px-4 pb-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <img
            src={
              kosan.foto && kosan.foto.length > 0
                ? kosan.foto[0]
                : `https://via.placeholder.com/800x500?text=${kosan.nama}`
            }
            alt={kosan.nama}
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {kosan.nama}
            </h1>
            <p className="text-lg text-gray-600 mb-6">📍 {kosan.alamat}</p>

            <p className="text-3xl font-bold text-blue-600 mb-6">
              IDR {kosan.harga.toLocaleString()}/bulan
            </p>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Deskripsi
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {kosan.deskripsi}
              </p>
            </div>

            {kosan.fasilitas && kosan.fasilitas.length > 0 && (
              <div className="border-t pt-6 mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Fasilitas
                </h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {kosan.fasilitas.map((fasilitas) => (
                    <li
                      key={fasilitas}
                      className="flex items-center text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {fasilitas}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-6 mt-8 text-center">
              <button className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300">
                Hubungi Pemilik
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KosanDetailPage;
