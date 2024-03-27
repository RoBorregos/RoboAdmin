import { api } from 'rbrgs/utils/api'
import React from 'react'

function NavBar() {

    // const resetData=api.projects.resetDBProjects.useMutation()
    const resetDb = api.projects.resetDBProjects.useMutation()
    const util = api.useContext();
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://roborregos.com" className="flex items-center" target="_blank">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ROBORREGOS</span>
                    </a>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col items-center  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Guardar
                                </span>
                            </button>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Reset
                                </span>
                            </button>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br bg-gray-900 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500  text-white focus:ring-4 focus:outline-none "
                                onClick={async () => {
                                    await resetDb.mutateAsync();
                                    await util.projects.getProjects.invalidate();
                                }}>
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md hover:from-gray-900 hover:to-gray-900">
                                    Reset TODOALV
                                </span>
                            </button>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar