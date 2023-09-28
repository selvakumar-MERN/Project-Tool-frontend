import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
    return (
        <div style={{display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#181f38">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'lightgreen' }}>
           Project Tool
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content" id="#multiCollapseExample1">
          <CDBSidebarMenu>
            <NavLink exact to="/inbox" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bell">Inbox</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/projects" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Project</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/to-do-list" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">My to-do </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/task" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Task</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/team" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Team</CDBSidebarMenuItem>
            </NavLink>

            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          >
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    );
}

export default Sidebar;