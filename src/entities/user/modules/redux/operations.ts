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
import {
  ICryptoBackpack,
  ILoginUser,
  IRegisterUser,
  IUser,
} from "@/shared/types";
import { RootState } from "@/store/store";

interface IError {
  message: string;
}
export const registerUser = createAsyncThunk<
  IUser,
  IRegisterUser,
  { rejectValue: IError }
>(
  "user/registerUser",
  async ({ login, email, password, copyPassword }, { rejectWithValue }) => {
    if (password !== copyPassword) {
      return rejectWithValue({ message: "passwords don't match" });
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: login });
      const token = await getIdToken(user.user);
      await axios.post("/api/auth/login", { token });

      return { uid: user.user.uid, email, login, backpack: [] };
    } catch (e: any) {
      return rejectWithValue({ message: e.message });
    }
  },
);

export const loginUser = createAsyncThunk<
  IUser,
  ILoginUser,
  { rejectValue: IError }
>("user/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(user.user);

    await axios.post("/api/auth/login", { token });
    return {
      uid: user.user.uid,
      email: user.user.email ?? "",
      login: user.user.displayName ?? "",
    };
  } catch (e: any) {
    // return rejectWithValue(e.message);
    return rejectWithValue({ message: e.message || "Unknown error" });
  }
});
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await signOut(auth);
      await axios.delete("/api/auth/logout");
      return;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);
export const getBackpack = createAsyncThunk(
  "user/getBackpack",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetchUserBackpack(id);
      return res;
    } catch (e) {
      // return rejectWithValue(e.message);
      return rejectWithValue(e);
    }
  },
);
export const createBackpack = createAsyncThunk(
  "user/createBackpack",
  async (id: string, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, "backpack", id), { data: [] });
    } catch (e) {
      // return rejectWithValue(e.message);
      return rejectWithValue(e);
    }
  },
);
interface IUpdateCryptoInBackpack {
  id: string;
  data: ICryptoBackpack;
}
export const addCryptoInBackpack = createAsyncThunk(
  "user/addCryptoInBackpack",
  async ({ id, data }: IUpdateCryptoInBackpack, { rejectWithValue }) => {
    try {
      const res = await updateDoc(doc(db, "backpack", id), {
        data: arrayUnion(data),
      });
      return data;
    } catch (e) {
      // return rejectWithValue(e.message);
      return rejectWithValue(e);
    }
  },
);
export const updateBackpackOnPurchase = createAsyncThunk<
  { isNew: boolean; data: ICryptoBackpack },
  IUpdateCryptoInBackpack,
  { state: RootState; rejectValue: IError }
>(
  "user/updateBackpackOnPurchase",
  async (
    { id, data }: IUpdateCryptoInBackpack,
    { getState, rejectWithValue },
  ) => {
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
    } catch (e: any) {
      // return rejectWithValue(e.message);
      return rejectWithValue({ message: e.message });
    }
  },
);
type TCryptoForSell = Omit<ICryptoBackpack, "invested">;
interface IUpdateCryptoForSell {
  id: string;
  data: TCryptoForSell;
}
export const updateBackpackOnSell = createAsyncThunk<
  { isDeleted: boolean; data: ICryptoBackpack },
  IUpdateCryptoForSell,
  { state: RootState; rejectValue: IError }
>(
  "user/updateBackpackOnSell",
  async ({ id, data }: IUpdateCryptoForSell, { getState, rejectWithValue }) => {
    try {
      const [prevBackpack, indexOfCrypto] = getPrevBackpack(
        getState,
        data as ICryptoBackpack,
      );
      const newData = [...prevBackpack];
      let isDeleted = false;
      const prevCrypto = prevBackpack[indexOfCrypto];

      if (indexOfCrypto === -1)
        return rejectWithValue({
          message: "You don't have this crypto in your backpack",
        });

      if (data.count > prevCrypto.count)
        return rejectWithValue({
          message: `Count can't be more than ${prevCrypto.count}`,
        });

      newData[indexOfCrypto] = {
        ...prevCrypto,
        count: prevCrypto.count - data.count,
        price: prevCrypto.price,
        invested: prevCrypto.invested - prevCrypto.price * data.count,
      };
      if (newData[indexOfCrypto].count === 0) {
        newData.splice(indexOfCrypto, 1);
        isDeleted = true;
      }
      await setDoc(doc(db, "backpack", id), {
        data: newData,
      });
      return {
        isDeleted,
        data: {
          ...prevCrypto,
          ...data,
          invested: prevCrypto.invested - prevCrypto.price * data.count,
        } as ICryptoBackpack,
      };
    } catch (e: any) {
      return rejectWithValue({ message: e.message });
    }
  },
);
