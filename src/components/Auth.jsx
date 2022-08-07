import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react'

const Auth = ({ setPassword, error }) => {
    const [handlePass, setHandlePass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setPassword(handlePass)
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="/logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Uy! Este curso es privado</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <p className="font-medium text-lg text-teal-600 hover:text-teal-500">
                                Ingresá la contraseña
                            </p>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={e => setHandlePass(e.target.value)}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                />
                            </div>
                            {error && <div className="text-red-500 pt-2">{error}</div>}
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-teal-500 group-hover:text-teal-400" aria-hidden="true" />
                                </span>
                                Acceder
                            </button>
                            <p className='text-sm pt-2 text-gray-600'>Si la contraseña es correcta, se recordará automáticamente</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Auth