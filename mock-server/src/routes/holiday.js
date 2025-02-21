import { createHoliday } from '../models/holiday.js'
import {
  formatDate,
  getISOTime,
  getTime,
  pagingData,
  sortData,
} from '../utils.js'

const data = Array.from({ length: 100 }, (_, index) => createHoliday(index))

export default [
  {
    // 祝日マスタ登録
    path: '/api/system/holiday',
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
    // 祝日マスタ検索（GET）
    path: '/api/system/holiday',
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
    // 祝日マスタ検索（POST）
    path: '/api/system/holiday/search',
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
    // 祝日マスタ取得
    path: '/api/system/holiday/:id',
    method: 'get',
    handler: (req, res) => {
      const id = Number.parseInt(req.params.id, 10)
      const holiday = data.find((u) => u.id === id)

      if (holiday) {
        res.json({
          data: holiday,
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
    // 祝日マスタ更新
    path: '/api/system/holiday/:id',
    method: 'put',
    handler: (req, res) => {
      const id = Number.parseInt(req.params.id, 10)
      const holiday = data.find((u) => u.id === id)

      if (holiday) {
        holiday.firstName = req.body.firstName
        holiday.lastName = req.body.lastName
        holiday.email = req.body.email
        holiday.tel = req.body.tel
        holiday.zip = req.body.zip
        holiday.address = req.body.address
        holiday.updatedAt = getTime()
        holiday.version = holiday.version + 1

        res.json({
          data: {
            id,
            firstName: holiday.firstName,
            lastName: holiday.lastName,
            email: holiday.email,
            tel: holiday.tel,
            zip: holiday.zip,
            address: holiday.address,
            createdAt: holiday.createdAt,
            updatedAt: formatDate(holiday.updatedAt),
            version: holiday.version,
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
    //祝日マスタ削除
    path: '/api/system/holiday/:id',
    method: 'delete',
    handler: (req, res) => {
      const id = Number.parseInt(req.params.id, 10)
      const index = data.findIndex((u) => u.id === id)
      const holiday = data[index]

      if (index !== -1) {
        data.splice(index, 1)

        res.json({
          data: {
            id,
            firstName: holiday.firstName,
            lastName: holiday.lastName,
            email: holiday.email,
            tel: holiday.tel,
            zip: holiday.zip,
            address: holiday.address,
            createdAt: holiday.createdAt,
            updatedAt: holiday.updatedAt,
            version: holiday.version,
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
