import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full flex items-center justify-center gap-5 flex-col md:flex-row pt-5 md:pt-0'>
            <div className='flex items-start justify-start flex-col p-1'>
                <h1 className={" text-start font-bold text-3xl md:text-5xl flex items-center gap-3 text-black"}>
                    Welcome to<br />
                    <span className='bg-sky-600 text-white rounded-md px-5 py-2'>Nimbo pro</span>
                </h1>
                <p className='text-black text-sm font-medium max-w-[430px] '>
                    Collaborate , manage projects and react new productivity peaks. From high rises to the home office , the way your team works is unique - accomplish it all with Nimbopro
                </p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout