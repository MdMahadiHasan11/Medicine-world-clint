import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCategoryAllMedicines = () => {
    const { category } = useParams();
    const axiosPublic = useAxiosPublic()
    // 
    const [searchText, setSearchText] = useState('');
    // sort
    const { data: medicine = [], isLoading, refetch: medicineRefetch } = useQuery({
        queryKey: ['medicine'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categoryMedicines/${category}`)
            return res.data;
        }
    })

    return [medicine,medicineRefetch];
};

export default useCategoryAllMedicines;