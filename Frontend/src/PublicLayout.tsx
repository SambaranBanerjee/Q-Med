import { Outlet } from 'react-router-dom';
import '../Layout.css';

export default function PublicLayout() {
  return (
    <div className="layout-container">
      <div className='layout-content'>
        <Outlet />
      </div>
    </div>
  );
}