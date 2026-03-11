import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
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
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.errorUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getBackpack.fulfilled, (state, action) => {
        if (!state.user) return;
        state.isLoadingBackpack = false;
        state.user.backpack = action.payload;
      })
      .addCase(updateBackpackOnPurchase.fulfilled, (state, action) => {
        if (!state.user) return;
        if (!state.user.backpack) return;

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
      .addCase(updateBackpackOnSell.fulfilled, (state, action) => {
        if (!state.user) return;
        if (!state.user.backpack) return;

        const { isDeleted, data } = action.payload;

        if (isDeleted)
          state.user.backpack.splice(
            state.user.backpack.findIndex(
              (elem) => elem.coin_id === data.coin_id,
            ),
            1,
          );
        else
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
      .addCase(logoutUser.fulfilled, () => USER_STATE)

      .addMatcher(
        isPending(getBackpack, updateBackpackOnPurchase, updateBackpackOnSell),
        (state) => {
          state.isLoadingBackpack = true;
          state.errorBackpack = null;
        },
      )
      .addMatcher(
        isRejected(getBackpack, updateBackpackOnPurchase, updateBackpackOnSell),
        (state, action) => {
          state.isLoadingBackpack = false;
          state.errorBackpack = action.payload?.message as string;
        },
      )
      .addMatcher(isPending(registerUser, loginUser), (state) => {
        state.isLoadingUser = true;
        state.errorUser = null;
      })
      .addMatcher(isFulfilled(registerUser, loginUser), (state, action) => {
        state.isLoadingUser = false;
        state.user = action.payload;
      })
      .addMatcher(isRejected(registerUser, loginUser), (state, action) => {
        state.isLoadingUser = false;
        state.errorUser = action.payload?.message as string;
      });
  },
});
export const { autoLogin, setAuthError } = userSlice.actions;
export const userReducer = userSlice.reducer;
