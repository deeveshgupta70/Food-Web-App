import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDataReducer } from './redux/productSlice';
function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchFun = async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
      const data = await res.json();

      dispatch(setDataReducer(data));
    };
    fetchFun();
  })

  // eslint-disable-next-line 
  // const {product} = useSelector(state => state.product);
  // console.log(product);
  return (
    <div className="">
      <Header/>
      <main className='pt-16 bg-slate-100 min-h-[100vh]'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
