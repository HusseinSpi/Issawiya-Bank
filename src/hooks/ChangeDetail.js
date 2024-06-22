import axios from "axios";
import { userData } from "../api/APIUsers";

export const ChangeDetail = async (
  email,
  firstName,
  lastName,
  phoneNumber,
  newEmail,
  password,
  money,
  credit,
  isAdmin
) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.email = newEmail;
        user.password = password;
        user.money = money;
        user.credit = credit;
        user.isAdmin = isAdmin;
        const response = await axios.put(
          `https://6675c254a8d2b4d072f15d62.mockapi.io/users/${user.id}`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      }
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    return false;
  }
};
