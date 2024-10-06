import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
  actionType?: string;
}

const initialState: ModalState = {
  isOpen: false,
  content: null,
  actionType: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        content: React.ReactNode;
        actionType?: string;
      }>
    ) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.actionType = action.payload.actionType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
      state.actionType = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
