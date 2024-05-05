import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, createCategory, deleteAProductCategory, updateAProductCategory } from '../features/pcategory/pcategorySlice';
import { Dialog, Transition } from '@headlessui/react';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product name",
    dataIndex: "ProductName",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const pCatStat = useSelector((state)=> state.pCategory.pCategories);

  useEffect(()=> {
    dispatch(getCategories());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(name));
    setOpen(false);
  }

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteAProductCategory(id));
  }

  const [idToUpdate, setIdToUpdate] = useState(null);
  const handleEdit = (id) => {
    const categoryToEdit = pCatStat.find(category => category._id === id);
    setIdToUpdate(categoryToEdit._id);
    console.log(idToUpdate);
    setName(categoryToEdit.name);
    setIsEditing(true); 
    setOpen(true);
  };

  const handleUpdate = () => {
    dispatch(updateAProductCategory({ id: idToUpdate, name: name }));
    setOpen(false);

  };

  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    const productsInfo = pCatStat[i].products.map(product => `${product.name} - `);
    // - ${product.description} - ${product.price}
    data1.push({
      key: i + 1,
      name: pCatStat[i].name,
      ProductName: productsInfo.join(", "),
      action: (
        <>
          <button className="fs-3 text-danger" onClick={() => handleEdit(pCatStat[i]._id)}><BiEdit /></button>
          <button className="fs-3 text-danger" onClick={() => { handleDelete(pCatStat[i]._id) }}><AiFillDelete /></button>
        </>
      ),
    });
  }

  return (
    <div>
       <header className="">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold leading-tight">Categories</h2>
              <button
                onClick={() => setOpen(true)}
                className="hover:bg-blue-400  group flex items-center rounded-md bg-blue-500 text-white text-lg font-medium pl-2 pr-3 py-2 shadow-sm ">
                <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                New
              </button>
            </div>
          
          </header>
      <div>
        <Table columns={columns} dataSource={data1} />
       
        <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          onClose={() => setOpen(false)}
          initialFocus={cancelButtonRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex justify-center items-center h-screen">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isEditing === true ? 'Update Category' : 'New Category'} </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {setOpen(false); setIsEditing(false)}}
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form
                    className="p-4 md:p-5"
                    onSubmit={ isEditing === true ? handleUpdate : handleSubmit }
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label htmlFor="FullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input
                          type="text"
                          name="FullName"
                          value={name}
                          onChange={(e)=>{setName(e.target.value)}}
                          id="FullName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter username"
                          required=""
                        />
                      </div>
                      
                    </div>
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      {isEditing === true ?  'Update category' : 'Add new category'} 
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
    </div>
  )
}

export default Categorylist;
