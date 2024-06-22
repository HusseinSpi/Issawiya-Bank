import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../api/APIUsers";

export const TransferCreditPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await userData();
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (email) => {
    navigate(`/transfer-credit/${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Transfer Credit</h2>
        <p className="mb-4 text-gray-600">
          Search for a user to transfer credit to:
        </p>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="username, email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <div className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-lg z-10">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleUserClick(user.email)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-lg font-bold">
                      {`${user.firstName[0]}${user.lastName[0]}`}
                    </div>
                  </div>
                  <div className="text-sm">{`${user.firstName} ${user.lastName}`}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
          Next
        </button>
      </div>
    </div>
  );
};
