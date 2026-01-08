import { auth } from "../../libs/firebase/auth";
import { db } from "../../libs/firebase/db";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import cleanPrice from "@/entities/crypto/modules/cleanPrice";
import getNewPrice from "@/entities/crypto/modules/getNewPrice";
import { fetchUserBackpack } from "../../api/fetchUserBackpack";

import axios from "axios";
import { getPrevBackpack } from "../getPrevBackpack";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ login, email, password, copyPassword }, { rejectWithValue }) => {
    if (password !== copyPassword) {
      return rejectWithValue("passwords don't match");
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: login });
      const token = await getIdToken(user.user);
      await axios.post("/api/auth/login", { token });

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
      const token = await getIdToken(user.user);

      await axios.post("/api/auth/login", { token });
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
export const updateBackpackOnPurchase = createAsyncThunk(
  "user/updateBackpackOnPurchase",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const [prevBackpack, indexOfCrypto] = getPrevBackpack(getState, data);
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
export const updateBackpackOnSell = createAsyncThunk(
  "user/updateBackpackOnSell",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const [prevBackpack, indexOfCrypto] = getPrevBackpack(getState, data);
      const newData = [...prevBackpack];

      const prevCrypto = prevBackpack[indexOfCrypto];

      if (indexOfCrypto === -1)
        throw new Error("You haven't this crypto in backpack");

      if (data.count > prevCrypto.count)
        throw new Error(`Count can't be more then ${prevCrypto.count}`);

      newData[indexOfCrypto] = {
        ...prevCrypto,
        count: prevCrypto.count - data.count,
        price: prevCrypto.price,
        invested: prevCrypto.invested - prevCrypto.price * data.count,
      };

      await setDoc(doc(db, "backpack", id), {
        data: newData,
      });
      return { data };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
