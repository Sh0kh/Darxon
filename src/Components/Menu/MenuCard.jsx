import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CONFIG from "../../utils/Config";
import ReactLoading from 'react-loading';


export default function MenuCard() {
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const getMenu = async () => {
        try {
            const response = await axios.get(`/category/${ID}`);
            const result = Array.isArray(response?.data?.menu) ? response.data?.menu : response?.data?.menu || [];
            setData(result);
        } catch (error) {
            console.error("Failed to fetch menu:", error);
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        getMenu();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color="white" height={100} width={100} />
            </div>
        );
    }

    return (
        <div className="Container relative z-20">
            <div className="Menu__Wrapper mt-[50px]">
                {data.length > 0 ? (
                    data.map((i, index) => (
                        <div key={index} className="border-[3px] border-[#A79684] cursor-pointer rounded-[20px] text-[white]">
                            <div className="w-full py-[5px] bg-[#A79684] rounded-t-[10px] h-[30px] text-center">
                                {i?.new === true && <span>Янгилик</span>}
                            </div>
                            <img src={CONFIG.API_URL + i?.image} alt="foto" className=" h-[300px] object-cover rounded-b-[10px]" />
                            <div className="w-full pt-[10px]">
                                <h2 className="text-[30px] font-[800] text-center">
                                    {i?.name}
                                </h2>
                                <div className="w-[80%] h-[3px] bg-[#A79684] mx-auto my-[15px] rounded-3xl">

                                </div>
                                <h2 className="text-[30px] font-[800] text-center mb-[10px]">
                                    {i.price ? Number(i.price).toLocaleString('ru-RU') : 'N/A'} Сум
                                </h2>
                                <div className="w-full py-[5px] bg-[#A79684] rounded-b-[10px] h-[30px] text-center">
                                    <span>{i?.discount > 0 ? `Скидка ${i?.discount} %` : ""}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
}
