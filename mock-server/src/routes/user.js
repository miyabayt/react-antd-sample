import { createUser } from '../models/user.js'
import {
  formatDate,
  getISOTime,
  getTime,
  pagingData,
  sortData,
} from '../utils.js'

const data = Array.from({ length: 100 }, (_, index) => createUser(index))

export default [
  {
    // ユーザ登録
    path: '/api/user',
    method: 'post',
    handler: (req, res) => {
      const now = getISOTime()
      const newId = data.length + 1

      data.push({
        ...req.body,
        id: newId,
        createdAt: now,
        updatedAt: now,
        version: 1,
      })

      return res.status(200).json({
        data: {
          id: newId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          tel: req.body.tel,
          zip: req.body.zip,
          address: req.body.address,
          createdAt: now,
          updatedAt: now,
          version: 1,
        },
        success: true,
        message: '正常終了',
      })
    },
  },
  {
    // ユーザ検索（GET）
    path: '/api/user',
    method: 'get',
    handler: (req, res) => {
      const page = Number.parseInt(req.query.page, 10) || 0 // デフォルトは0ページ
      const size = Number.parseInt(req.query.size, 10) || 20 // デフォルトは20件
      const sort = req.query.sort

      const sortedData = sortData(data, sort)
      const paginatedData = pagingData(sortedData, page, size)

      return res.json({
        page: Number(page),
        perpage: Number(size),
        count: Number(data.length),
        totalPages: Math.ceil(data.length / size),
        data: paginatedData,
        success: true,
        message: '正常終了',
      })
    },
  },
  {
    // ユーザ検索（POST）
    path: '/api/user/search',
    method: 'post',
    handler: (req, res) => {
      const page = Number.parseInt(req.query.page, 10) || 0 // デフォルトは0ページ
      const size = Number.parseInt(req.query.size, 10) || 20 // デフォルトは20件
      const sort = req.query.sort

      const sortedData = sortData(data, sort)
      const paginatedData = pagingData(sortedData, page, size)

      return res.json({
        page: Number(page),
        perpage: Number(size),
        count: Number(data.length),
        totalPages: Math.ceil(data.length / size),
        data: paginatedData,
        success: true,
        message: '正常終了',
      })
    },
  },
  {
    // ユーザ取得
    path: '/api/user/:userId',
    method: 'get',
    handler: (req, res) => {
      const userId = Number.parseInt(req.params.userId, 10)
      const user = data.find((u) => u.id === userId)

      if (user) {
        res.json({
          data: user,
          success: true,
          message: '正常終了',
        })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'データが存在しません' })
      }
    },
  },
  {
    // ユーザ更新
    path: '/api/user/:userId',
    method: 'put',
    handler: (req, res) => {
      const userId = Number.parseInt(req.params.userId, 10)
      const user = data.find((u) => u.id === userId)

      if (user) {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.email = req.body.email
        user.tel = req.body.tel
        user.zip = req.body.zip
        user.address = req.body.address
        user.updatedAt = getTime()
        user.version = user.version + 1

        res.json({
          data: {
            id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            tel: user.tel,
            zip: user.zip,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: formatDate(user.updatedAt),
            version: user.version,
          },
          success: true,
          message: '正常終了',
        })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'データが存在しません' })
      }
    },
  },
  {
    //ユーザ削除
    path: '/api/user/:userId',
    method: 'delete',
    handler: (req, res) => {
      const userId = Number.parseInt(req.params.userId, 10)
      const index = data.findIndex((u) => u.id === userId)
      const user = data[index]

      if (index !== -1) {
        data.splice(index, 1)

        res.json({
          data: {
            id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            tel: user.tel,
            zip: user.zip,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            version: user.version,
          },
          success: true,
          message: '正常終了',
        })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'データが存在しません' })
      }
    },
  },
]
