import { LogoWhite } from "../icons/LogoWhite"
import { EmailIcon } from "../icons/EmailIcon"
import { PhoneIcon } from "../icons/PhoneIcon"

export const Footer = ()=> {
    return (
        <div className="w-full h-70 bg-[#4338CA] text-white font-extralight text-[14px] flex justify-center items-center">
            <div className="w-7xl h-50 flex flex-row justify-between">
                <div className="w-61.75 h-50 flex flex-col gap-3">
                    <LogoWhite/>
                    <p >© 2024 Movie Z. All Rights Reserved.</p>
                </div>
                <div className="w-228.25 h-50 flex flex-row gap-24 justify-end">
                    <div className="w-43.5 h-50 gap-3 flex flex-col">
                        <p>Contact information</p>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-row items-center gap-3">
                                <EmailIcon/>
                                <div>
                                    <p>Email:</p>
                                    <p>support@movieZ.com</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <PhoneIcon/>
                                <div>
                                    <p>Phone:</p>
                                    <p>+976 (11) 123-4567</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>


                    <div className="w-68.5 h-13 flex flex-col gap-3">
                        Follow us 
                        <div className="flex flex-row gap-3 font-light cursor-pointer">
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>Twitter</p>
                            <p>Youtube</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}