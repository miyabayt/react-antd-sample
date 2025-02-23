import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'

export const sortData = (data, sort) => {
  if (sort) {
    const sortingData = [...data]
    const sortField = sort.split(',')[0]
    const sortOrder = sort.split(',')[1]
    sortingData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1
      }
      return a[sortField] < b[sortField] ? 1 : -1
    })
    return sortingData
  }
  return data
}

export const pagingData = (data, page, size) => {
  const startIndex = page * size
  const endIndex = startIndex + size
  return data.slice(startIndex, endIndex)
}

export const getTime = () => {
  return moment().tz('Asia/Tokyo')
}

export const getISOTime = () => {
  return moment().tz('Asia/Tokyo').format()
}

export const formatDate = (date) => {
  return moment(date).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ssZ')
}

export const createAccessToken = ({
  username = 'taro.yamada',
  role = 'admin',
  authorities = ['api123', 'api124', 'api125'],
  expiresIn = '2h', // https://github.com/vercel/ms
} = {}) => {
  const payload = {
    username: username,
    role: role,
    authorities: authorities, // ダミーの権限
  }
  const options = {
    expiresIn: expiresIn, // トークンの有効期限
  }

  return jwt.sign(payload, 'secret', options)
}
