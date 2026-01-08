import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { USER_STATE } from "./constants";
import {
  getBackpack,
  loginUser,
  logoutUser,
  registerUser,
  updateBackpackOnPurchase,
  updateBackpackOnSell,
} from "./operations";
import cleanPrice from "@/entities/crypto/modules/cleanPrice";
import getNewPrice from "@/entities/crypto/modules/getNewPrice";

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    autoLogin: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => (state = USER_STATE),
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBackpack.pending, (state) => {
        state.isLoadingBackpack = true;
        state.errorBackpack = null;
      })
      .addCase(getBackpack.fulfilled, (state, action) => {
        state.isLoadingBackpack = false;
        state.user.backpack = action.payload;
      })
      .addCase(getBackpack.rejected, (state, action) => {
        state.isLoadingBackpack = false;
        state.errorBackpack = action.payload;
      })
      .addCase(updateBackpackOnPurchase.fulfilled, (state, action) => {
        const { isNew, data } = action.payload;
        if (isNew) state.user.backpack.push(data);
        else
          state.user.backpack = state.user.backpack.map((elem) => {
            if (elem.coin_id === data.coin_id) {
              return {
                ...elem,
                count: elem.count + data.count,
                price: cleanPrice(getNewPrice(elem, data)),
                invested: elem.invested + data.invested,
              };
            }
            return elem;
          });
      })
      .addCase(updateBackpackOnPurchase.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(updateBackpackOnSell.fulfilled, (state, action) => {
        const { data } = action.payload;
        // if (isNew) state.user.backpack.push(data);
        // else
        state.user.backpack = state.user.backpack.map((elem) => {
          if (elem.coin_id === data.coin_id) {
            return {
              ...elem,
              count: elem.count - data.count,
              price: elem.price,
              invested: elem.invested + elem.price * data.count,
            };
          }
          return elem;
        });
      })
      .addCase(updateBackpackOnSell.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(logoutUser.fulfilled, () => USER_STATE)
      .addMatcher(isPending(registerUser, loginUser), (state) => {
        state.isLoadingUser = true;
        state.errorUser = null;
      })
      .addMatcher(isFulfilled(registerUser, loginUser), (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isRejected(registerUser, loginUser), (state, action) => {
        state.isLoadingUser = false;
        state.errorUser = action.payload;
      });
  },
});
export const { autoLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;
