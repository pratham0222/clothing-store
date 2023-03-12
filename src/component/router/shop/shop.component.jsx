import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { fetchCategoriesAsync } from '../../../store/categories/category.action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Shop = () =>{
    const dispatch=useDispatch();
    useEffect(() => {
        const getCategoriesMap = ()=>{
            dispatch(fetchCategoriesAsync());
        }
        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    )
}

export default Shop;