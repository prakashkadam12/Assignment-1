import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  title: 'Flower Arrangement',
  date: 'Dec 5, 2024',  
  startTime: '8:00 AM', 
  endTime: '10:00 AM',  
  assignee: 'Jane Smith',
  note: '09382049832\nwww.flowervendor.com',
  comments: [
    "Thanks for assigning me on the task. We’ll get the details ironed out.",
    "Thanks for the opportunity. Looking forward to working on it!",
  ],
  completed: false,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateDate: (state, action) => {
      state.date = action.payload;
    },
    updateStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    updateEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    updateAssignee: (state, action) => {
      state.assignee = action.payload;
    },
    updateNote: (state, action) => {
      state.note = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    editComment: (state, action) => {
      const { index, text } = action.payload;
      state.comments[index] = text;
    },
    deleteComment: (state, action) => {
      state.comments.splice(action.payload, 1);
    },
    toggleComplete: (state) => {
      state.completed = !state.completed;
    },
  },
});

export const {
  updateTitle,
  updateDate,
  updateStartTime,
  updateEndTime,
  updateAssignee,
  updateNote,
  addComment,
  editComment,
  deleteComment,
  toggleComplete,
} = eventSlice.actions;

export default eventSlice.reducer;
