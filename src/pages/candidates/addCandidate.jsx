import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { CONTRACT } from "../../client";
import { useNavigate } from "react-router";
import { useSendTransaction } from "thirdweb/react";

export default function AddCandidateForm() {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();

  const [candidateAddress, setCandidateAddress] = useState("");
  const [name, setName] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const uploadToIPFS = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMWE1MGFkZC03NGYyLTQ5ZTItYjkwZS0xM2U1N2NlOWI2N2IiLCJlbWFpbCI6InNhdHdpZzYwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzU1NTVjNGRlMzVmMzgyODlmMGYiLCJzY29wZWRLZXlTZWNyZXQiOiIwZGZkNDhhZDMzNzUyNDYwMzhlMTA5ZGVjOTIxODY0N2VmYjMwYWU3Y2JjZGJkYmFjZDViMzRlZDFlMmZiYzk5IiwiZXhwIjoxNzg2MDIzNTg4fQ.gcdkeNPHrcaefDcfZ9IMbjXOaQwhwLQz6Z8IRzmEt0M`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      const url = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
      setIpfsUrl(url);
      return url;
    } catch (err) {
      console.error("Upload ke IPFS gagal:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file || !candidateAddress || !name || !visi || !misi) {
        alert("Lengkapi semua input terlebih dahulu.");
        return;
      }

      const imageUrl = await uploadToIPFS(); // tunggu upload selesai
      setIpfsUrl(imageUrl);

      const tx = prepareContractCall({
        contract: CONTRACT,
        method: "addCandidate",
        params: [candidateAddress, name, visi, misi, imageUrl],
      });

      const result = await sendTransaction(tx); // tunggu metamask & blockchain

      console.log("✅ Transaksi berhasil:", result);
      alert("✅ Kandidat berhasil ditambahkan!");
      navigate("/voting");
      setCandidateAddress("");
      setName("");
      setVisi("");
      setMisi("");
      setIpfsUrl("");
    } catch (err) {
      console.error("❌ Gagal:", err);
      alert("Terjadi kesalahan. Cek console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-32">
      <h2 className="text-2xl font-bold mb-6 text-center">Tambah Kandidat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name Candidate"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          value={candidateAddress}
          onChange={(e) => setCandidateAddress(e.target.value)}
          placeholder="Address Candidate (0x...)"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          value={visi}
          onChange={(e) => setVisi(e.target.value)}
          placeholder="Vision Candidate"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          value={misi}
          onChange={(e) => setMisi(e.target.value)}
          placeholder="Mission Candidate"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-60 object-cover rounded border mt-4"
          />
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            isPending ||
            uploading ||
            !file ||
            !candidateAddress ||
            !name ||
            !visi ||
            !misi
          }
          className="w-full py-2 px-4 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || uploading ? "Menambahkan..." : "Tambah Kandidat"}
        </button>
        <button
          onClick={() => navigate("/voting")}
          className="w-full py-2 px-4 rounded text-white bg-red-600 hover:bg-red-700"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
