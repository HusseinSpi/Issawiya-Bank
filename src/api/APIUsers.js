import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userData = async () => {
  const url = "https://6675c254a8d2b4d072f15d62.mockapi.io/users";

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getUser = async (email) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email) {
        return user;
      }
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const AddUser = async (
  firstName,
  lastName,
  phoneNumber,
  email,
  password
) => {
  try {
    const usersResponse = await axios.get(
      "https://6675c254a8d2b4d072f15d62.mockapi.io/users"
    );
    const users = usersResponse.data;
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      toast.error("Email already exists");
      return;
    }
    const response = await axios.post(
      "https://6675c254a8d2b4d072f15d62.mockapi.io/users",
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        money: 0,
        credit: 5000,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      toast.success("User added successfully");
    } else {
      toast.error("Couldn't add user");
    }
  } catch (error) {
    toast.error("Couldn't add user");
  }
};

export const Login = async (email, password) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email && user.password === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const InMoney = async (email, money) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email) {
        user.money += money;
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
          toast.success("Money added successfully");
        } else {
          toast.error("Couldn't add money");
        }
      }
    }
  } catch (error) {
    toast.error("Couldn't add money");
  }
};

export const OutMoney = async (email, money) => {
  try {
    const users = await userData();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === email) {
        user.money -= money;
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
          toast.success("Money added successfully");
        } else {
          toast.error("Couldn't add money");
        }
      }
    }
  } catch (error) {
    toast.error("Couldn't add money");
  }
};

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
          toast.success("credit added successfully");
        } else {
          toast.error("Couldn't add credit");
        }
      }
    }
  } catch (error) {
    toast.error("Couldn't add credit");
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
          toast.success("credit added successfully");
        } else {
          toast.error("Couldn't add credit");
        }
      }
    }
  } catch (error) {
    toast.error("Couldn't add credit");
  }
};
