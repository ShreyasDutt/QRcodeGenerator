import { Input } from "@material-tailwind/react";
import { IoIosGlobe } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { IoIosResize  } from "react-icons/io";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";

function Landingpage() {
    const [input, setInput] = useState("");
    const [size, setSize] = useState(150);
    const [qrLink, setQrLink] = useState("");
    const downloadLinkRef = useRef(null);

    useEffect(() => {
        if (qrLink) {
            downloadLinkRef.current.href = qrLink;
        }
    }, [qrLink]);

    const notify = () => toast.error('Please enter a URL!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    const success = () => toast.success('QR Generated Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    const handleGenerateQR = () => {
        if (input === "") {
            notify();
        } else {
            const newQrLink = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${input}`;
            setQrLink(newQrLink);
            success();
        }
    };

    const [downloading, setDownloading] = useState(false);

    const handleDownloadQR = async () => {
        if (!qrLink || downloading) {
            notify();
            return;
        }

        try {
            setDownloading(true); // Set download in progress
            const response = await fetch(qrLink);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = downloadLinkRef.current;
            a.href = url;
            a.download = 'qrcode.png';
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                a.href = '';
                setDownloading(false);
            }, 100);
        } catch (error) {
            console.error("Error downloading QR code:", error);
            setDownloading(false);
        }
    };


    return (
        <div>
            <div className={"flex items-center justify-center"}>
                <ToastContainer/>
                <div className={"border p-4 rounded-xl shadow-xl flex flex-col bg-white w-80 mt-10"}>
                    <div className={"mb-6 text-md"}>
                        <p>1. Create a QR for a website or a URL</p>
                    </div>
                    <div className={"flex flex-col space-y-5 items-center"}>
                        <div className={"flex"}>
                            <IoIosGlobe className={"text-3xl mr-4"}/>
                            <Input
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                label="Enter website or URL"
                            />
                        </div>
                        <div className={"flex"}>
                            <IoIosResize className={"text-3xl mr-4"}/>
                            <Input
                                type="number"
                                value={size}
                                onChange={(event) => setSize(event.target.valueAsNumber)}
                                label="Enter Size"
                            />
                        </div>
                    </div>
                    <div className={"flex items-center mt-3"}>
                        <Button onClick={handleGenerateQR} className={"w-full h-10"} variant="outlined">Generate</Button>
                    </div>
                    {qrLink && (
                        <div className={"mt-3 border-2 px-6 py-6 h-auto w-auto"}>
                            <div className={"flex items-center justify-center mt-5 h-auto w-auto"}>
                                <img src={qrLink} alt="QR Code" className="w-auto"/>
                            </div>
                            <Button
                                onClick={handleDownloadQR}
                                className={"w-full h-10 mt-4"}
                                variant="outlined"
                                disabled={downloading}
                            >
                                Download
                            </Button>
                            <a ref={downloadLinkRef} className="hidden text-black visited:text-black">Download QR</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Landingpage;
