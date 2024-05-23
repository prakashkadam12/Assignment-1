import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTitle,
  updateDate,
  updateAssignee,
  updateNote,
  addComment,
  editComment,
  deleteComment,
  toggleComplete,
} from '../store/eventSlice';
import JaneSmithIcon from '../assets/jane_smith_icon.jpg';
import image1 from "../assets/Image1.jpeg";
import image2 from "../assets/Image2.jpeg";
import { TbSend2 } from "react-icons/tb";
import { RiDeleteBinLine, RiDeleteBin6Line } from "react-icons/ri";
import { BsCalendar } from "react-icons/bs";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { CiCircleCheck, CiStickyNote } from "react-icons/ci";
import CustomDropdown from './CustomDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Event = () => {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event);

  const [comment, setComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date("2024-12-05T08:00:00"));
  const [initialColor, setInitialColor] = useState('#FF6250'); // Set initial color to red

  useEffect(() => {
    const formattedDate = `${format(selectedDate, "MMM d, yyyy")} at 8:00-10:00 AM`;
    dispatch(updateDate(formattedDate));
  }, [dispatch, selectedDate]);

  const handleCommentChange = (e) => setComment(e.target.value);
  const handleAddComment = () => {
    if (editingComment !== null) {
      dispatch(editComment({ index: editingComment, text: comment }));
      setEditingComment(null);
    } else {
      dispatch(addComment(comment));
    }
    setComment('');
  };
  const handleEditComment = (index) => {
    setEditingComment(index);
    setComment(event.comments[index]);
  };
  const handleSaveComment = () => {
    dispatch(editComment({ index: editingComment, text: comment }));
    setEditingComment(null);
    setComment('');
  };
  const handleDeleteComment = (index) => {
    dispatch(deleteComment(index));
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  const assigneeOptions = [
    {
      value: 'Jane Smith',
      label: (
        <>
          <span className="text-red-500"><AiOutlineUser /></span>
          Jane Smith
        </>
      ),
      image: JaneSmithIcon,
      color: '#FF6250' 
    },
    {
      value: 'John Doe',
      label: (
        <>
          <span className="text-blue-500"><AiOutlineUser /></span>
          John Doe
        </>
      ),
      image: image1,
      color: '#00FF00' 
    },
    {
      value: 'Emily White',
      label: (
        <>
          <span className="text-green-500"><AiOutlineUser /></span>
          Emily White
        </>
      ),
      image: image2,
      color: '#00FF00' 
    }
  ];
  const handleAssigneeChange = (value) => {
    dispatch(updateAssignee(value));
    const selectedAssignee = assigneeOptions.find(option => option.value === value);
    if (selectedAssignee) {
      setInitialColor(selectedAssignee.color);
    }
  };
  
  const handleToggleComplete = () => {
    dispatch(toggleComplete());
  };
  const handleNoteChange = (e) => {
    dispatch(updateNote(e.target.value));
  };
  return (
    <div className="w-full max-w-[319.45px] h-auto md:h-[534.72px] rounded-[20px] border border-[#BCBCBC] p-6 space-y-3 bg-white shadow-md font-inter">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex space-x-2 ">
        <CiCircleCheck 
  className={`text-[${initialColor}] ${event.completed ? 'opacity-50' : ''}`}
  onClick={handleToggleComplete}
  style={{fontWeight: 400, fontSize: '15px', lineHeight: '15px', cursor: 'pointer'}}
/>

        </div>

        <div className="flex space-x-2">
          <div className="flex space-x-3">
            <RiDeleteBin6Line className="text-[#FF6250]"
              style={{fontWeight: 900,fontSize: '10px',lineHeight: '10px',}}
            />
            <AiOutlineClose className="text-[#FF6250]"
              style={{fontWeight: 900,fontSize: '10px',lineHeight: '10px',}}
            />
          </div>
        </div>
      </div>
      <input
  type="text"
  value={event.title}
  onChange={(e) => dispatch(updateTitle(e.target.value))}
  className="w-full border border-[#BCBCBC] rounded-full p-2 text-[#E92C2C]  text-[20px] leading-[24.2px] font-inter font-semibold text-center h-[44px]"
  style={{fontSize: '20px',lineHeight: '24.2px',}}
/>
      <div className="relative flex items-center justify-center border border-[#BCBCBC] rounded-full p-2 md:p-3 h-[37.72px] md:h-[44px]">
        <BsCalendar
          className="mr-2 text-[#CECECE] ml-5 cursor-pointer"
          style={{fontWeight: 400,fontSize: '14px',ineHeight: '14px',}}
          onClick={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <div className="absolute top-full left-0 mt-2 z-10 ml-2">
  <DatePicker
    selected={selectedDate}
    onChange={handleDateChange}
    inline
    className=" font-normal text-[#000000] text-sm md:text-base"
    style={{fontWeight: 400,fontSize: '14.72px',lineHeight: '14.72px',}}
  />
</div>

        )}
        <input
  type="text"
  value={event.date}
  className="flex-grow border-none focus:outline-none text-[#000000] font-inter font-semibold text-sm md:text-sm flex items-center justify-center"
  style={{paddingTop: '0.2rem',paddingBottom: '0.2rem',fontSize: '12.88px',fontWeight: 600,lineHeight: '15.59px',fontFamily: 'Inter, sans-serif'}}
/>


      </div>
      <div className='flex items-center gap-[20px] w-[269px] h-[45px]' style={{ marginBottom: '20px',marginTop:'20px' }}>
  <label className="font-medium flex items-center gap-[15px] mb-2" style={{ flexShrink: 0 }}>
  <AiOutlineUser 
  className="text-[#FF6250] mr-[-4px]"
  style={{fontSize: '15px',width: '13px',height: '15px',lineHeight: '15px',fontWeight: 400}}
/>

<p className='text-[#5A5A5A]  text-sm font-inter italic'
  style={{fontSize: '14px',lineHeight: '16.94px',letterSpacing: '-2%',fontWeight: 500,fontSize: '14px',}}>Assign to:</p>

  </label>
  <CustomDropdown
  value={event.assignee}
  onChange={handleAssigneeChange}
  options={assigneeOptions}
  handleAssigneeChange={handleAssigneeChange} 
/>

</div>
      <div className="flex items-center gap-[15px] h-[45px] w-[269px] mb-4">
        <label className="font-medium flex gap-[10px] items-center mb-2">
          <CiStickyNote
            className='text-[#FF6250] w-[13px] h-[12px] mb-4'
            style={{fontFamily: 'Font Awesome 6 Pro',fontWeight: 400,fontSize: '15px',lineHeight: '15px',}}
          />
          <span className="text-[#5A5A5A] italic text-sm font-medium font-inter mb-4" style={{fontWeight: 500,fontStyle: 'italic',fontSize: '14px',lineHeight: '16.94px',letterSpacing: '-2%',
          }}>
            Note:
          </span>
        </label>
        <div className='flex flex-col border border-[#EDEDED] w-full h-auto rounded-2xl text-[#5A5A5A] overflow-hidden'>
          <textarea
            value={event.note}
            onChange={handleNoteChange}
            className="ml-4 border-none focus:outline-none resize-none overflow-hidden w-[190px] h-full mt-[2px] text-[#5A5A5A] font-inter font-normal text-sm"
            rows="2"
          />
        </div>
      </div>
      <hr className="border-[#BCBCBC] my-6" />
      <div>
        <h3 className="font-bold text-[#5A5A5A] mt-[5px] mb-4 italic text-sm font-inter" style={{fontWeight: 700,fontStyle: 'italic',fontSize: '14px',lineHeight: '16.94px',letterSpacing: '-2%',
        }}>Comments</h3>
        <ul className="space-y-6">
          {event.comments.map((comment, index) => (
            <li key={index} className="flex items-center justify-between space-x-2 h-[41px]">
              <div className="flex items-start space-x-2 h-[41px] my-2" onClick={() => handleEditComment(index)}>
                <img
                  src={JaneSmithIcon}
                  alt="Jane Smith Icon"
                  className="inline-block mr-2 mt-1"
                  style={{width: '25px',height: '25px',borderRadius: '12.5px',}}
                />
                <div className="flex flex-col">
                  <span className="text-[#009379] font-inter text-sm font-semibold" style={{fontWeight: 600,fontSize: '12px',lineHeight: '14.52px',letterSpacing: '-2%',}}>
                    Jane Smith
                  </span>
                  <span className='text-[#5A5A5A] font-inter font-normal text-xs' style={{fontWeight: 400,fontSize: '11px',lineHeight: '13.31px',letterSpacing: '-2%',}}>
                    {comment}
                  </span>
                </div>
              </div>
              {index !== 0 && (
                <div>
                <button
  onClick={() => handleDeleteComment(index)}
  className="text-[#FF6250] font-[Font Awesome 6 Pro] font-normal text-[12px] leading-[12px] ml-2"
  style={{fontSize: '12px',lineHeight: '12px',letterSpacing: '-2%',}}
>
  <RiDeleteBinLine />
</button>
  </div>
      )}
    </li>
     ))}
    </ul>
  </div>
      <div className="w-full rounded-[25px] px-2 py-1 flex items-center gap-4 overflow-hidden mt-2">
        <div className="flex items-center flex-1 mt-3">
          <img
            src={JaneSmithIcon}
            alt="Jane Smith Icon"
            className="inline-block ml-[-8px] mr-3"
            style={{width: '25px',height: '25px',borderRadius: '12.5px',}}
          />
          <div className="relative w-full">
            <div className="relative">
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write comment..."
                className="border border-[#BCBCBC] rounded-[25px] py-[10px] px-[15px] w-full text-[#5A5A5A] font-inter font-normal text-sm"
              />
            </div>
            <button
              onClick={editingComment !== null ? handleSaveComment : handleAddComment}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              <TbSend2
                className="w-[12px] h-[12px] text-[#FF6250] mr-2"
                style={{fontWeight: 400,fontSize: '12px',lineHeight: '12px',letterSpacing: '-2%',}}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
