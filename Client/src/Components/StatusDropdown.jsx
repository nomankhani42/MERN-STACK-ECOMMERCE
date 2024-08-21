import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusDropdown = ({ item,updateOrderStatus }) => {
    const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

 
      const [isOpen, setIsOpen] = useState(false);
      const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
    
      const handleToggle = () => setIsOpen(!isOpen);
      const handleSelect = (status,id) => {
        // console.log(status,id)
        setSelectedStatus(status);
        updateOrderStatus(id,status)
        setIsOpen(false);
      };
    
      return (
        <div className="inline-block text-left relative">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleToggle}
          >
            {item.status}
          
          </button>
    
       <div className='relative'>
       <AnimatePresence>
            {isOpen && (
              <motion.ul  onMouseLeave={()=>setIsOpen(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className=" absolute z-50 left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="p-1">
                  {statuses.map((status) => (
                    <button 
                      key={status}
                      className={`block w-full px-4 py-2 text-sm text-gray-700 ${
                        selectedStatus === status ? 'bg-gray-100' : ''
                      } hover:bg-gray-200`}
                      onClick={() => handleSelect(status,item._id)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
       </div>
        </div>
      );
    }
    

export default StatusDropdown
