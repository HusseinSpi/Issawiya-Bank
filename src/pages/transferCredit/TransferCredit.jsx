import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../api/APIUsers";
import { InCredit, OutCredit } from "../../hooks/EditCredit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TransferCredit = () => {
  const email = useParams();
  const [amount, setAmount] = useState(0);
  const [sender, setSender] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSender = async () => {
      const senderEmail = localStorage.getItem("email");
      const senderDetails = await getUser(senderEmail);
      setSender(senderDetails);
    };
    fetchSender();
  }, []);

  const handleTransfer = async () => {
    setLoading(true);
    const recipient = await getUser(email.id);
    console.log(recipient, sender);
    if (!recipient) {
      toast.error("Recipient not found");
      setLoading(false);
      return;
    }
    if (sender.credit < amount) {
      toast.error("Insufficient credit");
      setLoading(false);
      return;
    }
    await OutCredit(sender.email, amount);
    await InCredit(email.id, amount);
    toast.success("Transfer successful");
    setLoading(false);
  };

  const handleExchangeRate = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Transfer Credit</h1>
        <div className="mb-4">
          <label className="block text-gray-700">You send</label>
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={handleExchangeRate}
              className="border border-gray-300 rounded p-2 w-full"
              disabled={loading}
            />
            <span className="ml-2">Credit</span>
          </div>
        </div>
        <button
          onClick={handleTransfer}
          disabled={loading || amount <= 0}
          className={`w-full p-2 rounded ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Processing..." : "Transfer"}
        </button>
      </div>
    </div>
  );
};
