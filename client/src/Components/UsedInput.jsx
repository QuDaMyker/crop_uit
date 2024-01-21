import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import React, { useState } from 'react';

export const Message = ({ label, placeholder, name, register }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className="w-full h-40 mt-2 p-6 bg-main border border-border rounded resize-none"
        placeholder={placeholder}
        {...register}
        name={name}
      ></textarea>
    </div>
  );
};

export const Select1 = ({ label, options, register, name }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
        {...register}
        name={name}
      >
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};



export const Input = ({
  label,
  placeholder,
  type,
  bg,
  register,
  name,
  value,
  onChange,
}) => {

  const [open, setOpen] = useState(false)

  // handle toggle 
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <div className="text-sm w-full relative">
      <label className="text-border font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        type={(open === false && type === 'password') ? 'password' : 'text'}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${bg ? "bg-main" : "bg-dry"
          }`}
      />
      {
        (type === 'password') && (
          <div className='text-xl absolute top-12 right-5'>
            {
              (open === false) ? <AiFillEyeInvisible onClick={toggle} /> :
                <AiFillEye onClick={toggle} />
            }
          </div>
        )
      }
    </div>
  );
};
