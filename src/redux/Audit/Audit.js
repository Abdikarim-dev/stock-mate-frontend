import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "audit",
  initialState: {
    audits: [],
  },
  reducers: {
    addAuditLog(state, action) {
      const newAudit = action.payload; // {Title:,Desc: User Has been Created,User:John Doe}

      state.audits.push({
        id: state.audits.length + 1,
        ...newAudit,
        dateAndTime: new Date().toISOString(),
      });
    },
  },
});

export const { addAuditLog } = slice.actions;

export default slice.reducer;
