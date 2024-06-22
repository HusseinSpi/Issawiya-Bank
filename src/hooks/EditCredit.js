import axios from "axios";
import { userData } from "../api/APIUsers";

export const InCredit = async (email, credit) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email) {
        user.credit += credit * 1;
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
    return false;
  }
};

export const OutCredit = async (email, credit) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email) {
        user.credit -= credit;
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
    return false;
  }
};
