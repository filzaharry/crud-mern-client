import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'

type Props = {
    isOpen: boolean;
    idInput: string;
    emailInput: string;
    usenameInput: string;
    handleClose: () => void
}
export default function ModalUpdate(props: Props) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    
    const [responseMessage, setResponseMessage] = useState('');

    const API =  process.env.NEXT_PUBLIC_API;

    const handleSubmit = async (id:string) => {
        // setIsOpen(false)
        // e.preventDefault();
        console.log(id);
        
        try {
            const res = await fetch(API+'/user/'+id, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });

            const data = await res.json();

            setResponseMessage(data.message);
            close()
            window.location.href = "/home"

            if (!res.ok) throw new Error(data.message);
        } catch (error: any) {
            setResponseMessage(error.message);
        }
    };

    return (
        <>

            <Dialog open={props.isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white border shadow-md p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-slate-600 mb-4 border-b-4">
                                Update User
                            </DialogTitle>


                            {/* <form onSubmit={} className="w-full"> */}

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email == '' ? props.emailInput : email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="username"
                                        id="username"
                                        value={username == '' ? props.usenameInput : username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="w-full flex flex-row gap-2">
                                    <div
                                        onClick={props.handleClose}
                                        className="mt-14 w-full py-2 px-4 bg-slate-500 text-white text-center font-semibold rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                                    >
                                        Close
                                    </div>
                                    <button
                                        onClick={()=>handleSubmit(props.idInput)}
                                        type="submit"
                                        className="mt-14 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                    >
                                        Update User
                                    </button>
                                </div>

                                {responseMessage && <p className="mt-4 text-center text-red-400">{responseMessage}</p>}
                            {/* </form> */}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
