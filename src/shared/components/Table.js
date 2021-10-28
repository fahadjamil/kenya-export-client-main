import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";
import TooltipImg from "./TooltipImg";
import "./Table.css";

const Table = (props) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchFilterKeys, setSearchFilterKeys] = useState([]);

  const closeFiltersHandler = () => {
    setShowFilters(false);
    setFilteredData(props.data);
    setSelectedFilter("");
    setSearchFilterKeys(
      searchFilterKeys.map((data, index) => {
        return { ...data, value: "" };
      })
    );
  };

  const selectFilterHandler = (name, key, subkey, value, type) => {
    setSearchFilterKeys(
      searchFilterKeys.map((data, index) => {
        if (data.name === name)
          return { ...data, value: value.toString(), type };
        else return data;
      })
    );
  };

  useEffect(() => {
    let filteredDataTemp = props.data;

    searchFilterKeys.map((data, index) => {
      if (data.type === "date") {
        if (data.value !== "") {
          if (data.subkey === "") {
            filteredDataTemp = filteredDataTemp.filter((row, index) =>
              row[data.key]?.includes(data.value)
            );
          } else {
            filteredDataTemp = filteredDataTemp.filter((row, index) =>
              row[data.key][data.subkey]?.includes(data.value)
            );
          }
        }
      } else {
        if (data.value !== "") {
          if (data.subkey === "") {
            filteredDataTemp = filteredDataTemp.filter((row, index) =>
              row[data.key]?.toString()?.includes(data.value.toString())
            );
          } else {
            filteredDataTemp = filteredDataTemp.filter((row, index) =>
              row[data.key][data.subkey]
                ?.toString()
                ?.includes(data.value.toString())
            );
          }
        }
      }
    });
    setFilteredData(filteredDataTemp);

    // searchFilterKeys.map((data, index) => {
    //   if (data.value !== "") {
    //     if (!data.subkey) {
    //       console.log(data);
    //       setFilteredData(
    //         filteredDataTemp.filter((row, index) =>
    //           row[data.key]?.toString()?.includes(data.value)
    //         )
    //       );
    //     } else {
    //       console.log(data);
    //       setFilteredData(
    //         filteredDataTemp.filter((row, index) =>
    //           row[data.key][data.subkey]?.toString()?.includes(data.value)
    //         )
    //       );
    //     }
    //   }
    // });

    // setSelectedFilter(`${key}_${value}`);
  }, [searchFilterKeys]);

  useEffect(() => {
    setFilteredData(props.data);
  }, []);

  useEffect(() => {
    closeFiltersHandler();
    if (props.filters) {
      setSearchFilterKeys(
        props?.filters?.map((data, index) => {
          return {
            name: data.name,
            key: data.key,
            subkey: data.subkey ?? "",
            value: "",
          };
        })
      );
    }
  }, [props?.filters]);

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);

  return (
    <Card>
      <div className="d-flex justify-content-end align-items-center mb-3 px-4">
        {props.loading ? (
          <LoadingSpinner xsmall className="ml-3" color="info" />
        ) : props.error ? (
          <p className="text-danger m-0 pl-3 pb-2">{props.error}</p>
        ) : (
          <p className="m-0 text-white">...</p>
        )}
        {props.filters && (
          <div className="pr-3">
            {!showFilters ? (
              <div className="row d-flex align-items-baseline">
                {props.filters.map((data, i) =>
                  data.type === "search" ? (
                    <input
                      key={data.type}
                      type="text"
                      className="search-filter"
                      placeholder={data.name}
                      onChange={(e) =>
                        selectFilterHandler(
                          data.name,
                          data.key,
                          data.subkey ?? "",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    ""
                  )
                )}
                {props.filters.length === 1 && props.filters[0].type === 'search' ? '' : <button
                  className="btn btn-sm btn-outline-info rounded-pill ml-2 px-4 py-1 font-weight-bold"
                  onClick={() => setShowFilters(true)}
                >
                  Filters
                </button>}
              </div>
            ) : (
              <div className="row align-items-start">
                {props.filters.map((data, i) =>
                  data.type === "radio" ? (
                    <div key={i} className="filter-cb-single-section ml-2 mb-2">
                      <div className="d-flex">
                        {data.options?.map((ddData, j) => (
                          <label key={j} className="filter-cb-wrapper mb-0">
                            {ddData.name}
                            <input
                              type="radio"
                              name={data.name}
                              onChange={() =>
                                selectFilterHandler(
                                  data.name,
                                  data.key,
                                  data.subkey ?? "",
                                  ddData.value,
                                  data.type
                                )
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : data.type === "button" ? (
                    <button
                      key={i}
                      className={`btn btn-sm col ${
                        selectedFilter === `${data.key}_${data.value}`
                          ? "btn-info"
                          : "btn-outline-secondary"
                      } rounded-pill px-3 py-1 ml-2 font-weight-bold`}
                      onClick={() =>
                        selectFilterHandler(
                          data.name,
                          data.key,
                          data.subkey ?? "",
                          data.value
                        )
                      }
                    >
                      {data.name}
                    </button>
                  ) : data.type === "date" ? (
                    <input
                      key={data.type}
                      type="date"
                      className="search-filter date mt-0"
                      placeholder={data.name}
                      onChange={(e) =>
                        selectFilterHandler(
                          data.name,
                          data.key,
                          data.subkey ?? "",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    ""
                  )
                )}
                <button
                  className="btn btn-sm btn-info rounded-pill py-0 ml-2 mb-2 border-0 font-weight-bold"
                  onClick={closeFiltersHandler}
                >
                  <IoIosClose size={32} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="col-md-12 p-0 ">
        <div className="custom-table-responsive">
          <ul className="custom-table-head">
            {props.meta &&
              props.meta.map((data, i) => (
                <li className="col-2" key={i}>
                  {data.name}
                </li>
              ))}
          </ul>
          {filteredData && filteredData.length !== 0 ? (
            <ul className="custom-table-body-ul">
              {filteredData?.map((data, i) => (
                <li key={i}>
                  <Link
                    to={`${props.routing.route}${data[props.routing.idKey]}`}
                  >
                    {props.meta.map((value, j) => (
                      <p
                        key={j}
                        className={`col-2${
                          value.style === "bold" ? " font-weight-bold" : ""
                        }${value.style === "italic" ? " font-italic" : ""} ${
                          value.type
                        }`}
                      >
                        {value.type === "text"
                          ? value.subkey
                            ? data[value.key][value.subkey]
                            : data[value.key]
                          : value.type === "date"
                          ? value.subkey
                            ? data[value.key][value.subkey]?.split("T")[0]
                            : data[value.key]?.split("T")[0]
                          : value.type === "status"
                          ? value.options.map((src, k) =>
                              src.value ===
                              (value.subkey
                                ? data[value.key][value.subkey]
                                : data[value.key]) ? (
                                <TooltipImg key={k} src={src.src} width="30px">
                                  {src.value.charAt(0).toUpperCase() +
                                    src.value.slice(1).replace("_", " ")}
                                </TooltipImg>
                              ) : (
                                ""
                              )
                            )
                          : value.type === "status_icon"
                          ? value.options.map((src, k) =>
                              src.value ===
                              (value.subkey
                                ? data[value.key][value.subkey]
                                : data[value.key]) ? (
                                <span key={k}>{src.icon}</span>
                              ) : (
                                ""
                              )
                            )
                          : ""}
                      </p>
                    ))}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-table-data text-center py-3">
              <FaBoxOpen size={30} className="mx-auto" />
              <p className="text-uppercase m-0 pt-2">No Data Found</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Table;
