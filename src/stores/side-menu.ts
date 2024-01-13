import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

export const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => ({
    menu: [
      {
        icon: "Home",
        pageName: "dashboard",
        title: "Panel de control",
      },
      {
        icon: "Archive",
        pageName: "inventory",
        title: "Inventario",
      },
      {
        icon: "FileInput",
        pageName: "assignment",
        title: "Asignaciones",
      },
      {
        icon: "FileOutput",
        pageName: "movement",
        title: "Movimientos",
      },
      {
        icon: "ShoppingBag",
        pageName: "side-menu-dashboard",
        title: "Compras",
        subMenu: [
          {
            icon: "Minus",
            pageName: "side-menu-page-2",
            title: "Solicitudes",
          },
          {
            icon: "Minus",
            pageName: "side-menu-page-2",
            title: "Ordenes",
          },
          {
            icon: "Minus",
            pageName: "side-menu-page-2",
            title: "Recepciones"
          },
        ],
      },
      {
        icon: "Puzzle",
        pageName: "side-menu-dashboard",
        title: "Productos",
        subMenu: [
          {
            icon: "Minus",
            pageName: "side-menu-dashboard-overview-1",
            title: "Listado",
          },
          {
            icon: "Minus",
            pageName: "side-menu-dashboard-overview-1",
            title: "Categorias",
          },
          {
            icon: "Minus",
            pageName: "side-menu-dashboard-overview-1",
            title: "Marcas",
          },
        ],
      },
      {
        icon: "Users",
        pageName: "side-menu-dashboard",
        title: "Talento Humano",
        subMenu: [
          {
            icon: "Minus",
            pageName: "charges",
            title: "Cargos",
          },
          {
             icon: "Minus",
             pageName: "departaments",
             title: "Departamentos",
           },
          {
            icon: "Minus",
            pageName: "employees",
            title: "Empleados",
          },
          {
            icon: "Minus",
            pageName: "paysheets",
            title: "Nominas",
          },
          {
            icon: "Minus",
            pageName: "vacations",
            title: "Vacaciones",
          },
        ],
      },

      {
        icon: "Settings",
        pageName: "side-menu-dashboard",
        title: "Mantenedores",
        subMenu: [
          {
            icon: "Minus",
            pageName: "side-menu-dashboard-overview-1",
            title: "Areas",
          },
          {
            icon: "Minus",
            pageName: "municipality",
            title: "Municipios",
          },
          {
            icon: "Minus",
            pageName: "side-menu-dashboard-overview-1",
            title: "Proveedores",
          },
          {
            icon: "Minus",
            pageName: "side-menu-page-2",
            title: "Responsables",
          },
          {
            icon: "Minus",
            pageName: "side-menu-dashboard-overview-1",
            title: "Tipos de pagos",
          },
          {
            icon: "Minus",
            pageName: "user-management",
            title: "Gestión de usuarios",
          },
          {
            icon: "Minus",
            pageName: "roles-permissions",
            title: "Roles y permisos",
          },
        ],
      },
      {
        icon: "Activity",
        pageName: "activity-center",
        title: "Centro de actividades",
      },
    ],
  }),
});
