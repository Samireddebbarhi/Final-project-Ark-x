import React from 'react'

export default function CategoryList() {
  return (
    <>
    <div className="text-center">
    <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-notifications">
      Open modal
    </button>
  </div>
  
  <div id="hs-notifications" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
        <div className="absolute top-2 end-2">
          <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-neutral-700" data-hs-overlay="#hs-notifications">
            <span className="sr-only">Close</span>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
  
        <div className="p-4 sm:p-10 overflow-y-auto">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
              Notifications
            </h3>
            <p className="text-gray-500 dark:text-neutral-500">
              Get notified of activity at Preline
            </p>
          </div>
  
          <div className="space-y-4">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <label for="hs-account-activity" className="flex p-4 md:p-5">
                <span className="flex me-5">
                  <svg className="flex-shrink-0 mt-1 size-5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  
                  <span className="ms-5">
                    <span className="block font-medium text-gray-800 dark:text-neutral-200">Account Activity</span>
                    <span className="block text-sm text-gray-500 dark:text-neutral-500">Get important notifications about you or activity you've missed</span>
                  </span>
                </span>
  
                <input type="checkbox" id="hs-account-activity" className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none  dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800
  
                before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200" ></input>
              </label>
            </div>
  
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <label for="hs-meetups-near-you" className="flex p-4 md:p-5">
                <span className="flex me-5">
                  <svg className="flex-shrink-0 mt-1 size-5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  
                  <span className="ms-5">
                    <span className="block font-medium text-gray-800 dark:text-neutral-200">Meetups Near You</span>
                    <span className="block text-sm text-gray-500 dark:text-neutral-500">Get an email when a Preline Meetup is posted close to my location</span>
                  </span>
                </span>
  
                <input type="checkbox" id="hs-meetups-near-you" className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none  dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800
  
                before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"></input>
              </label>
            </div>
            
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <label for="hs-preline-communication" className="flex p-4 md:p-5">
                <span className="flex me-5">
                  <svg className="flex-shrink-0 mt-1 size-5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
  
                  <span className="ms-5">
                    <span className="block font-medium text-gray-800 dark:text-neutral-200">Preline Communication</span>
                    <span className="block text-sm text-gray-500 dark:text-neutral-500">Get Preline news, announcements, and product updates</span>
                  </span>
                </span>
  
                <input type="checkbox" id="hs-preline-communication" className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none  dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800
  
                before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"></input>
              </label>
            </div>
          </div>
        </div>
  
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-neutral-950 dark:border-neutral-800">
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800" data-hs-overlay="#hs-notifications">
            Cancel
          </button>
          <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
            Update notifications
          </a>
        </div>
      </div>
    </div>
  </div>
  </>

  )
}
