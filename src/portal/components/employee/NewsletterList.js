import React, { useEffect, useState } from "react";
import { IoNewspaper } from "react-icons/io5";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";

const NewsletterList = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [subscribers, setSubscribers] = useState([]);
  const [newsLetterSearchbar, setNewsLetterSearchbar] = useState("")

  const getSubscriberApi = async () => {
    const response = await sendRequest("get_subscribers");
    setSubscribers(response.data);
  };

  const newsLetterSearchHandler = (e) => {
    setNewsLetterSearchbar(e.target.value);
    if(e.target.value === "") getSubscriberApi();
    setSubscribers(subscribers.filter((data) => data?.email?.toString()?.includes(e.target.value)));
  }

  useEffect(() => {
    getSubscriberApi();
  }, []);

  return (
    <InnerHeadingFrame
      heading="Newsletter Subscribers"
      loading={isLoading}
      icon={<IoNewspaper size={40} className="mt-2" />}
    >
      <div className="d-flex justify-content-end px-2 mt-3">
      <input
            type="text"
            className="list-search-bar shadow"
            placeholder="Search"
            value={newsLetterSearchbar}
            onChange={newsLetterSearchHandler}
          />
      </div>

      <div className="row mt-4">
        {subscribers?.map((data, index) => (
          <div key={index} className="col-md-6 mb-2">
            <div className="d-flex align-items-center justify-content-between bg-white shadow rounded py-2 px-3">
              <p className="font-weight-bold h6 m-0">{data.email}</p>
              <p className="m-0">{data.timestamp?.split("T")[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </InnerHeadingFrame>
  );
};

export default NewsletterList;
