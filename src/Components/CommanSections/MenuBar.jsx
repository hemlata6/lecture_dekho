import React, { useState } from "react";
import { Typography } from "@mui/material";
import "./Menu.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import arrow icon
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const MenuBar = ({ domainData }) => {

    const menuData = [
        {
            name: "Home",
            onClick: () => console.log("Navigate to Home"),
        },
        {
            name: "Scholarship Events",
            onClick: (e) => console.log("Download PDF", e),
        },
        {
            name: "Courses",
            child: domainData, // Passing domain data dynamically here
        },
        {
            name: "Academic",
            onClick: () => console.log("Navigate to Academic"),
        },
        {
            name: "Student Zone",
            onClick: () => console.log("Navigate to Student Zone"),
        },
        {
            name: "Result",
            onClick: () => console.log("Navigate to Result"),
        },
        {
            name: "Resources",
            onClick: () => console.log("Open Resources"),
        },
    ];

    const [activeMenu, setActiveMenu] = useState(null);
    const [activeDomain, setActiveDomain] = useState(null);
    // const handleMenuClick = (index) => {
    //     setActiveMenu((prevIndex) => (prevIndex === index ? null : index));
    // };
    const handleMenuClick = (index) => {
        setActiveMenu((prevIndex) => (prevIndex === index ? null : index)); // Toggle submenu on click
    };

    const handleDomainClick = (domainIndex) => {
        // Toggle the visibility of subdomains
        setActiveDomain((prevDomain) =>
            prevDomain === domainIndex ? null : domainIndex
        );
    };

    const renderSubMenu = (domain) => {
        if (domain.child) {
            return (
                <ul className="submenu">
                    {domain.child.map((subdomain, idx) => (
                        <li
                            key={idx}
                            className="submenu-item"
                            onClick={subdomain.onClick ? subdomain.onClick : undefined}
                        >
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    padding: "5px 15px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                {subdomain.name}
                                {subdomain.child && subdomain.child.length > 0 && (
                                    <ArrowRightIcon fontSize="small" />
                                )}
                            </Typography>
                            {subdomain.child && renderSubMenu(subdomain)} {/* Recursive rendering for sub-submenus */}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <nav className="menu-bar">
            <ul className="menu">
                {menuData.map((menu, index) => (
                    <li
                        key={index}
                        className={`menu-item ${activeMenu === index ? "active" : ""}`}
                        onClick={() => handleMenuClick(index)} // Toggle submenu for this menu item
                    >
                        <Typography
                            color="#1356C5"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            fontSize={["12px", "14px"]}
                            fontWeight="700"
                            sx={{
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            {menu.name}
                            {menu?.child?.length > 0 && (
                                <ArrowDropDownIcon fontSize="small" />
                            )}
                        </Typography>
                        {/* Render domain list only when Courses is clicked */}
                        {menu.name === "Courses" && menu.child && activeMenu === index && (
                            <ul className="submenu">
                                {menu.child.map((domain, idx) => (
                                    <li
                                        key={idx}
                                        className="submenu-item"
                                        onClick={() => handleDomainClick(idx)} // Toggle subdomains visibility for domain
                                    >
                                        <Typography
                                            sx={{
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                padding: "5px 15px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            {domain.name}
                                            {domain.child && domain.child.length > 0 && (
                                                <ArrowRightIcon fontSize="small" />
                                            )}
                                        </Typography>
                                        {/* Show subdomains only when domain is active */}
                                        {activeDomain === idx && renderSubMenu(domain)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MenuBar;
