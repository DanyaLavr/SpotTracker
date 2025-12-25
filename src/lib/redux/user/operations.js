import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/db";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import cleanPrice from "@/funcs/cleanPrice";
import getNewPrice from "@/funcs/getNewPrice";
import { fetchUserBackpack } from "@/api/fetchUserBackpack";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ login, email, password, copyPassword }, { rejectWithValue }) => {
    if (password !== copyPassword) {
      return rejectWithValue("passwords don't match");
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: login });
      await axios.post("/api/auth/login", { token: "12345678" });

      return { uid: user.user.uid, email, login, backpack: [] };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      await axios.post("/api/auth/login", { token: "12345678" });
      return {
        uid: user.user.uid,
        email: user.user.email,
        login: user.user.displayName,
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await signOut(auth);
      await axios.delete("/api/auth/logout");
      return;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const getBackpack = createAsyncThunk(
  "user/getBackpack",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchUserBackpack(id);
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const createBackpack = createAsyncThunk(
  "user/createBackpack",
  async (id, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, "backpack", id), { data: [] });
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const addCryptoInBackpack = createAsyncThunk(
  "user/addCryptoInBackpack",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateDoc(doc(db, "backpack", id), {
        data: arrayUnion(data),
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const updateCryptoInBackpack = createAsyncThunk(
  "user/updateCryptoInBackpack",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const prevBackpack = state.user.user.backpack;

      const indexOfCrypto = prevBackpack.findIndex(
        (elem) => elem.coin_id === data.coin_id
      );
      const newData = [...prevBackpack];

      if (indexOfCrypto !== -1) {
        const prevCrypto = prevBackpack[indexOfCrypto];
        newData[indexOfCrypto] = {
          ...prevCrypto,
          count: prevCrypto.count + data.count,
          price: cleanPrice(getNewPrice(prevCrypto, data)),
          invested: prevCrypto.invested + data.invested,
        };
      } else {
        newData.push(data);
      }
      await setDoc(doc(db, "backpack", id), {
        data: newData,
      });
      return { isNew: indexOfCrypto === -1 ? true : false, data };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
