import { useState, useEffect } from "react";
import { getUser } from "../../api/APIUsers";
import { InCredit, OutCredit } from "../../hooks/EditCredit";
import { InMoney, OutMoney } from "../../hooks/EditMoney";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TransferMoney = () => {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreditToMoney, setIsCreditToMoney] = useState(true);

  useEffect(() => {
    const getEmail = async () => {
      const emailEmail = localStorage.getItem("email");
      const emailDetails = await getUser(emailEmail);
      setEmail(emailDetails);
    };
    getEmail();
  }, []);

  const handleTransfer = async () => {
    setLoading(true);
    if (isCreditToMoney) {
      if (email.credit < amount) {
        toast.error("Insufficient credit");
        setLoading(false);
        return;
      }
      await OutCredit(email.email, amount);
      await InMoney(email.email, amount);
    } else {
      if (email.money < amount) {
        toast.error("Insufficient money");
        setLoading(false);
        return;
      }
      await OutMoney(email.email, amount);
      await InCredit(email.email, amount);
    }

    toast.success("Transfer successful");
    setLoading(false);
  };

  const handleExchangeRate = (e) => {
    setAmount(e.target.value);
  };

  const toggleTransferType = () => {
    setIsCreditToMoney(!isCreditToMoney);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {isCreditToMoney
            ? "Transfer Credit to Money"
            : "Transfer Money to Credit"}
        </h1>
        <button
          onClick={toggleTransferType}
          className="mb-4 p-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          {isCreditToMoney
            ? "Switch to Money to Credit"
            : "Switch to Credit to Money"}
        </button>
        <div className="mb-4">
          <label className="block text-gray-700">
            {isCreditToMoney
              ? "Transfer from credit to money"
              : "Transfer from money to credit"}
          </label>
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={handleExchangeRate}
              className="border border-gray-300 rounded p-2 w-full"
              disabled={loading}
            />
            <span className="ml-2">{isCreditToMoney ? "Credit" : "Money"}</span>
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
