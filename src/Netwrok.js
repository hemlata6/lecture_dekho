import { useParams } from "react-router-dom";
import Endpoint from '../src/constant/endpoints.js';
import axios from "axios";
import instId from "./constant/InstituteId.jsx";

export default class Network {
  static COURSES_URL = Endpoint.baseURL + "admin/course/fetch-public/";
  static COURSE_CONTENT_URL =
    Endpoint.baseURL + "admin/course/fetchContent-public";
  static TAGS_LIST_URL = Endpoint.baseURL + "admin/course/fetch-tags-public/";
  static BUY_COURSE_URL =
    Endpoint.baseURL + "/admin/payment/fetch-public-checkout-url";
  static FETCH_IFRAME_URL = Endpoint.baseURL + "/admin/iframe/fetch";
  static FETCH_INSTITUTE_DETAILS =
    Endpoint.baseURL + "/getMetaData/fetch-institute";
  static FETCH_ADD_CLICK_URL = Endpoint.baseURL + "admin/add-click";
  static BUY_COURSE_SECOND_FORM = Endpoint.baseURL + "/admin/payment/fetch-public-checkout-url";
  static BANNER_URL = Endpoint.baseURL + "/admin/banner/fetch-public-banner/";
  static FETCH_PUBLIC_EMPLOYEE = Endpoint.baseURL + "/admin/employee/fetch-public-employee/";
  static FETCH_ANNOUNCEMENT_URL = Endpoint.baseURL + 'admin/announcement/fetch-active-announcement/';
  static FETCH_DOMAIN_URL = Endpoint.baseURL + 'domain/fetch-public?instId=';
  static FETCH_PUBLIC_COURSE_BY_ID_URL = Endpoint.baseURL + 'admin/course/fetch/'
  static BUY_COURSE_SECOND_URL = Endpoint.baseURL + "/admin/course/fetch";

  static async getBuyCourseDetailsSecond(courseId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.BUY_COURSE_SECOND_URL + "/" + courseId,
      requestOptions
    );
    return response.data;
  }

  static async fetchCourseById(courseId) {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_PUBLIC_COURSE_BY_ID_URL + courseId, requestOptions);
    return response.data;
  };

  static async fetchCourses(instId) {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.COURSES_URL + instId, requestOptions);
    return response.data;
  };
  static async fetchDomain() {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_DOMAIN_URL + instId, requestOptions);
    return response.data;
  };

  static async fetchAnnouncementUrl(instId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.FETCH_ANNOUNCEMENT_URL + instId,
      requestOptions
    );
    return response.data;
  }

  static async getTagsListApi(instId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.TAGS_LIST_URL + instId,
      requestOptions
    );
    return response.data;
  }

  static async fetchCourseContent(courseId, parentId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.COURSE_CONTENT_URL + "/" + courseId + "/" + parentId,
      requestOptions
    );
    return response.data;
  }


  static async fetchBannerss(instId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.BANNER_URL + "/" + instId,
      requestOptions
    );
    return response.data;
  }

  // static async fetchCourseContent(courseId, parentId) {
  //   let requestOptions = {
  //     headers: {
  //       "X-Auth":
  //         "eyJ1c2VySWQiOjEwMywidGltZXN0YW1wIjoxNzAwODI0MTg5NzI5LCJleHBpcnkiOjE3MzA4MjQxODk3Mjl9",
  //     },
  //     withCredentials: false,
  //   };
  //   const response = await axios.get(
  //     "https://prodapi.classiolabs.com//admin/course/fetchContent/85/0",
  //     requestOptions
  //   );
  //   return response.data;
  // }
  static async BuyCourseApi(body) {
    let response = await axios.post(this.BUY_COURSE_URL, body, {
      headers: {
        "Content-Type": "application/json",
        // "X-Auth": token,
      },
      withCredentials: false,
    });
    return response.data;
  }

  static async fetchIFrame(iframeId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.FETCH_IFRAME_URL + "/" + iframeId,
      requestOptions
    );
    return response.data;
  }

  static async addClickApi(body, instId) {
    let response = await axios.post(
      this.FETCH_ADD_CLICK_URL + "/" + instId,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          // "X-Auth": token,
        },
        withCredentials: false,
      }
    );
    return response.data;
  }

  static async fetchInstituteDetail(instId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.FETCH_INSTITUTE_DETAILS + "/" + instId,
      requestOptions
    );
    return response.data;
  }

  static async buyCourseSecondForm(body) {
    // let requestOptions = {
    //   // headers: { "X-Auth": token },
    //   withCredentials: false,
    // };
    const response = await axios.post(
      this.BUY_COURSE_SECOND_FORM,
      // requestOptions,
      body
    );
    return response.data;
  }

  static async fetchEmployee(instId) {
    // console.log("instId", instId);
    // let requestOptions = {
    //   // headers: { "X-Auth": token },
    //   withCredentials: false,
    // };
    const response = await axios.get(this.FETCH_PUBLIC_EMPLOYEE + instId,);
    return response.data;
  }

}
