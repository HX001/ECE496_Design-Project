
import axios from "axios";
import config from "./../config/config";

const controller = (() => {
    return {
        createExam: async examInfo =>
            axios.post(config.server + 'createexam',
                {
                    course_code : examInfo.course_code,
                    course_type : examInfo.course_type,
                    user_id : examInfo.user_id,
                    start_time: examInfo.start_time,
                })
                .then(response => {
                    console.log(examInfo);
                    console.log(response);
                    return response;
                }),
        getReport: async (examInfo) =>
            axios.post(config.server + 'getreport',
                {
                    course_code : examInfo.course_code,
                    user_id : examInfo.user_id,
                    end_time: new Date(),
                })
                .then(response => {
                    console.log(examInfo);
                    console.log(response);
                    return response;
                }),
        endExam : async (examInfo) =>
            axios.post(config.server + 'endexam',
                {
                    course_code : examInfo.course_code,
                    user_id : examInfo.user_id,
                    start_time: new Date(),
                })
                .then(response => {
                    console.log(examInfo);
                    console.log(response);
                    return response;
                }),
        }
})();

export default controller;