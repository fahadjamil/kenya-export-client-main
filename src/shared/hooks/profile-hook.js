import { useState } from "react";
import { getProfilePictureUrl } from "../utils/functions";

export const useProfile = () => {
  const [profileInput, setProfileInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    address: "",
    address1: "",
    image: "",
  });

  const getData = (data) => {
    setProfileInput({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      city: data.city,
      country: data.country,
      address: data.address,
      address1: data.address1,
      image: data.image ? getProfilePictureUrl(data.image) : "",
    });
  };

  return {
    profileInput,
    getData,
    setProfileInput,
  };
};
