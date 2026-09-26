import React from "react";

export default function Layout({ children }) {

  return (

    <div className="app-shell">

      <header className="topbar">

        <div className="brand">
          SFM <span>Smart Facility</span>
        </div>


        <nav>

          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#facilities">
            Facilities
          </a>

          <a href="#inspections">
            Inspections
          </a>

          <a href="#complaints">
            Complaints
          </a>

        </nav>

      </header>


      <main className="container">

        {children}

      </main>


      <footer>

        Smart Facility Management Dashboard
        · Intern Final Project

      </footer>

    </div>

  );

}