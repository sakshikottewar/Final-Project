import React, { useEffect, useState } from "react";

import {
  getDashboard,
  getFacilities,
  createFacility
} from "./api";

import Layout from "./components/Layout";
import StatCard from "./components/StatCard";
import FacilityForm from "./components/FacilityForm";
import FacilityTable from "./components/FacilityTable";

import InspectionPage from "./components/InspectionPage";
import ComplaintPage from "./components/ComplaintPage";


export default function App() {


  const [dashboard, setDashboard] = useState(null);

  const [facilities, setFacilities] = useState([]);

  const [error, setError] = useState("");

  const [page, setPage] = useState(
    window.location.hash || "#dashboard"
  );


  const loadData = async () => {

    try {

      setError("");

      const [
        dashboardData,
        facilityData
      ] = await Promise.all([
        getDashboard(),
        getFacilities()
      ]);

      setDashboard(dashboardData);

      setFacilities(facilityData);

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Failed to load data"
      );

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  useEffect(() => {

    const handleHashChange = () => {

      setPage(
        window.location.hash || "#dashboard"
      );

    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {

      window.removeEventListener(
        "hashchange",
        handleHashChange
      );

    };

  }, []);


  const handleCreate = async (facility) => {

    try {

      await createFacility(facility);

      alert("Facility created successfully!");

      await loadData();

    } catch (err) {

      console.error(err);

      alert(
        err.message ||
        "Failed to create facility"
      );

    }

  };

  if (page === "#inspections") {

    return (

      <Layout>

        <InspectionPage />

      </Layout>

    );

  }


  if (page === "#complaints") {

    return (

      <Layout>

        <ComplaintPage />

      </Layout>

    );

  }
  return (

    <Layout>


      <section className="hero">

        <div>

          <p className="eyebrow">
            FACILITY OPERATIONS
          </p>

          <h1>
            Smart Facility Management
          </h1>

          <p>
            Monitor facilities, inspections and
            complaints from one dashboard.
          </p>

        </div>


        <button
          className="refresh"
          onClick={loadData}
        >
          Refresh Data
        </button>

      </section>


      {error && (

        <div className="error">

          {error}

        </div>

      )}



      <section className="stats">

        <StatCard
          title="Total Facilities"
          value={
            dashboard?.totalFacilities ??
            facilities.length ??
            "-"
          }
        />

        <StatCard
          title="Inspections"
          value={
            dashboard?.totalInspections ??
            "-"
          }
        />

        <StatCard
          title="Open Complaints"
          value={
            dashboard?.openComplaints ??
            "-"
          }
        />

      </section>


     
      <section className="grid-two">


      
        <div className="card">

          <h2>
            Add Facility
          </h2>

          <FacilityForm
            onSubmit={handleCreate}
          />

        </div>


       

        <div className="card">

          <h2>
            Recent Inspections
          </h2>


          <div className="inspection-list">

            {dashboard?.recentInspections?.length > 0 ? (

              dashboard.recentInspections.map(
                (item) => (

                  <div
                    className="inspection-item"
                    key={item.id}
                  >

                    <strong>
                      {item.facility_name}
                    </strong>

                    <span>
                      {item.status}
                      {" · "}
                      Score {item.score}
                    </span>

                  </div>

                )
              )

            ) : (

              <p>
                No recent inspections found.
              </p>

            )}

          </div>

        </div>

      </section>


      <section
        className="card"
        id="facilities"
      >

        <h2>
          Facilities
        </h2>

        <FacilityTable
          facilities={facilities}
        />

      </section>

    </Layout>

  );

}