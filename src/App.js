import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import { Home, Login, PublicPage, FAQ, Services, Blogs, DetailProduct, ProductPage, FinalRegister, ResetPwd } from './pages/public'
import { getCategories } from './store/app/asyncAction';
import { useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<PublicPage />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.FAQS} element={<FAQ />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<ProductPage />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
        </Route>
        <Route path={path.RESET_PWD} element={<ResetPwd />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
      </Routes>
    </div>
  );
}

export default App;
