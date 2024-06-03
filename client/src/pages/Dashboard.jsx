import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAddress from '../components/DashAddress';
import DashCreateProduct from '../components/DashCreateProduct';
import CreateCategory from '../components/CreateCategory';
import { useSelector } from 'react-redux';
import ProductLists from '../components/ProductLists';
import EditProduct from '../components/EditProduct';

export default function Dashboard() {

  const location = useLocation();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <div className="md:w-60">
        {/* Sidebar... */}
        <DashSidebar />
      </div>

      <div className='max-w-6xl lg:ms-10'>
        {/* Profile... */}
        {tab === 'profile' && <DashProfile/> }
        {/* Address... */}
        {tab === 'address' && <DashAddress/> }
        {/* Create Product... */}
        {tab === 'createProduct' && currentUser.isAdmin && <DashCreateProduct />}
        {/* Create Category... */}
        {tab === 'createCategory' && currentUser.isAdmin && <CreateCategory />}
        {/* Create Product... */}
        {tab === 'productLists' && currentUser.isAdmin && <ProductLists />}
        {/* Edit Product... */}
        {tab.startsWith('editProduct/') && currentUser.isAdmin && <EditProduct productId={tab.split('/')[1]} />}

        {!tab && ( <DashProfile/> )}
        
        {!currentUser.isAdmin && (tab === 'createProduct' || tab === 'createCategory' || tab === 'productLists' || tab === 'editProduct') && (
          <div className='text-2xl p-5 text-slate-700'>You do not have access to this section!</div>
        )}

      </div>
      
    </div>
  )
}
