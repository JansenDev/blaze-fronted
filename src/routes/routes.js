//Layout
import LayoutBasic from "../Layout/LayoutBasic";
// Components
import Error404 from "../Pages/Error404";
import Order from "../components/Order";
import OrderDetail from "../components/OrderDetail";
import Product from "../components/Product";
import Home from "../Pages/Home";

const routes = [
    {
        path:"/",
        component: Home,
        exact:true,
        layout: LayoutBasic
    },
    {
        path:"/orders",
        component: Order,
        exact:true,
        layout: LayoutBasic
    },
    {
        path:"/orders/:idOrder",
        component: OrderDetail,
        exact:true,
        layout: LayoutBasic
    },
    {
        path:"/products",
        component: Product,
        exact:true,
        layout: LayoutBasic
    }, 
    {
        component: Error404,
        layout: LayoutBasic
    }
];

export default routes;