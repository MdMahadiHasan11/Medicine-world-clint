import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAllMedicines from "../../../../hooks/useAllMedicines";


const UserState = () => {


    const axiosPublic = useAxiosPublic()
    // 
    // sort
    const { data: allUser = [] } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`)
            return res.data;
        }
    })
   const [doctors] =useAllMedicines();
    // console.log('user',allUser)

    // return [allUser];



    return (
        <div className='mb-20'>

            <div className='flex justify-center  mx-auto items-center'>
                <p data-aos="fade-down "
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000" className="navbar flex justify-center mb-10  items-center mx-auto text-center font-extrabold text-3xl  max-w-screen-xl "><h3>Stat</h3></p>
            </div>

            <div className='flex justify-center items-center'>
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Medicines</div>
                        <div className="stat-value">{doctors?.length}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">New Users</div>
                        <div className="stat-value">{allUser?.length}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div className="stat-title">New Registers</div>
                        <div className="stat-value">1</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default UserState;