import axios from './axios'
export function getHomeMultiData() {
  return axios({
    url: '/home/multidata'
  })
}
