import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import { Home, Login, PublicPage, FAQ, Services, Blogs, DetailProduct, ProductPage, FinalRegister, ResetPwd } from './pages/public'
import { getCategories } from './store/app/asyncAction';
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <Route path={path.RESET_PWD} element={<ResetPwd />} />
          <Route path={path.DETAIL_PRODUCT_CATE_PID_TITLE} element={<DetailProduct />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
