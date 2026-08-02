import React from "react";
import {
  LayoutDashboard,
  Pill,
  Package,
  Truck,
  ShoppingCart,
  CreditCard,
  Users,
  Settings,
  LogOut,
  MoreHorizontal,
} from "lucide-react";


function Sidebar({
  currentPage,
  setCurrentPage,
  user,
  logout
}) {


  const adminMenuItems = [

    {
      icon: LayoutDashboard,
      label: "Dashboard",
    },

    {
      icon: Pill,
      label: "Medicines",
    },


    {
      icon: Package,
      label: "Inventory",
    },

    {
      icon: Truck,
      label: "Suppliers",
    },

    {
      icon: ShoppingCart,
      label: "Orders",
    },

    {
      icon: CreditCard,
      label: "Billing",
    },

    {
      icon: Users,
      label: "Users",
    },

  ];



  const userMenuItems = [

  {
    icon: LayoutDashboard,
    label: "Dashboard",
  },

  {
    icon: Pill,
    label: "Medicines",
  },

  {
    icon: ShoppingCart,
    label: "Cart",
  },

  {
    icon: ShoppingCart,
    label: "Orders",
  },

  {
  icon: CreditCard,
  label: "Billing",
  },

];



  const menuItems =
    user?.role?.toLowerCase() === "admin"
      ? adminMenuItems
      : userMenuItems;



  return (

    <aside className="sidebar">


      <div className="brand">


        <div className="brand-logo">

          <Pill size={26} />

        </div>



        <div>

          <h2>
            CMR MEDICAL
          </h2>

          <span>
            AGENCY
          </span>

        </div>


      </div>




      <div className="sidebar-section">


        <p className="section-title">
          MAIN MENU
        </p>



        <nav>


          {menuItems.map((item)=>{


            const Icon = item.icon;


            return (

              <button

                key={item.label}

                className={`nav-item ${
                  currentPage === item.label
                  ? "active"
                  : ""
                }`}


                onClick={() =>
                  setCurrentPage(item.label)
                }


              >

                <Icon size={20}/>


                <span>
                  {item.label}
                </span>



                {
                  currentPage === item.label && (

                    <div className="active-indicator"></div>

                  )
                }


              </button>

            );


          })}



        </nav>


      </div>





      <div className="sidebar-bottom">



        <button className="nav-item">

          <Settings size={20}/>

          <span>
            Settings
          </span>

        </button>





        <button

          className="nav-item logout"

          onClick={logout}

        >

          <LogOut size={20}/>

          <span>
            Logout
          </span>

        </button>






        <div className="sidebar-user">


          <div className="user-avatar">

            {
              user?.name
              ?.charAt(0)
              ?.toUpperCase()
            }

          </div>





          <div className="user-details">


            <strong>

              {
                user?.name ||
                "User"
              }

            </strong>



            <span>

              {
                user?.role?.toUpperCase() ||
                "USER"
              }

            </span>



          </div>





          <button className="user-more">

            <MoreHorizontal size={18}/>

          </button>




        </div>



      </div>



    </aside>

  );

}


export default Sidebar;