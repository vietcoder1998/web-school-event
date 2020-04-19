// import { _get } from './base-api';
// import { noInfoHeader } from './auth';
// import { PUBLIC_HOST } from '../environment/development';
// import { LIST_JOB_NAMES } from './api/public.api';

// export const sortJob = async (value?: string, limit) => {
//     let res = await _get(null, LIST_JOB_NAMES, PUBLIC_HOST, noInfoHeader);
//     let arr = res.data.items;
//     return searchWordReturn(value, arr, limit);
// }

// export const searchWordReturn = async (value, arr, limit) => {
//     try {
//         let items = arr
//         let arr_value = [];

//         if (value.indexOf(" ")) {
//             arr_value = value.split(" ")
//         } else {
//             arr_value.push(value);
//         }

//         arr_value = arr_value.map((item) => {
//             let value = '';
//             for (let i = 0; i < item.length; i++) {
//                 value += item[i].toLowerCase()
//             }

//             return value;
//         })

//         let arr_job_list = items && items.map((item, index) => {
//             let arr_text = item.name.split(" ");

//             let arr_text_new = arr_text.map((item) => {
//                 let value = '';
//                 for (let i = 0; i < item.length; i++) {
//                     value += item[i].toLowerCase()
//                 }

//                 return value;
//             })

//             return { ...item, arr_text_new, rating: 0 }
//         });


//         let probality = _sortAbility(arr_value, arr_job_list, limit);
//         return (probality)


//     } catch (err) {
//         throw err
//     }
// }

// function _sortAbility(arr_value, arr_job_list, limit) {

//     let arr_s = [];
//     let arr_text_new = arr_job_list.map(item => { return item.arr_text_new });
//     let arr_l = [];

//     arr_value.forEach(element => {
//         if (element !== "") {
//             arr_l.push(element)
//         }
//     });

//     let l1 = arr_l.length;
//     let l2 = arr_text_new.length;
//     let rating = 0;
//     var e = 0;
//     let sum_e_s = 0;

//     arr_l.forEach((item) => {
//         e += item.length
//     })

//     for (let index = 0; index < l2; index++) {
//         let item = arr_text_new[index];
//         let l = 0;
//         let s = 0;

//         item.forEach((e) => {
//             s += e.length
//         })

//         if (arr_l.length === 0) {
//             rating = 0;
//         } else {
//             l = item.length;

//             for (let i = 0; i < l1; i++) {
//                 let item1 = arr_l[i];
//                 let list_rate = [];

//                 for (let j = 0; j < l; j++) {
//                     let item2 = item[j];
//                     let exact_rate = [];
//                     let tem = 0;
//                     let plus = 0;

//                     if (item1 === item2) {
//                         plus = e / (item1.length) - (item1.length * l1) / e
//                     }

//                     if (item1[0] !== item2[0]) {
//                         rating = 0
//                     } else {
//                         for (let k = 0; k < item1.length; k++) {

//                             if (item1[k] !== item2[k]) {
//                                 tem = 0;
//                             } else {
//                                 tem += 1;
//                                 let hsp = 0;
//                                 if (i === j) {
//                                     hsp = l1 * i / j;
//                                 }

//                                 exact_rate.push((tem + hsp) / l + l / e)
//                             }
//                         }

//                         if (exact_rate.length >= 1) {
//                             let tem1 = 0;

//                             for (let g = 0; g < exact_rate.length; g++) {
//                                 tem1 += exact_rate[g]
//                             }

//                             list_rate.push(tem1 + plus)
//                         }
//                     }
//                 }

//                 if (list_rate.length > 0) {
//                     for (let m = 0; m < list_rate.length; m++) {
//                         rating += list_rate[m]
//                     }
//                 }
//             }
//         }

//         let e_s = Math.abs(((s - e) / e));

//         if (rating === sum_e_s) {
//             rating += 1
//         }

//         rating -= e_s;

//         let l_r = 0;

//         if (limit) {
//             l_r = limit
//         }

//         if (rating > l_r) {
//             arr_s.push({ ...arr_job_list[index], rating, e_s, sum_e_s })
//         }
//     }

//     for (let i = 0; i < arr_s.length; i++) {
//         arr_s.sort((item, item1) => {
//             return (item1.rating - item.rating)
//         })
//     }

//     return arr_s
// }