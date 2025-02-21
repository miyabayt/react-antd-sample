import { createStaff } from '../models/staff.js'
import {
  formatDate,
  getISOTime,
  getTime,
  pagingData,
  sortData,
} from '../utils.js'

const data = Array.from({ length: 100 }, (_, index) => createStaff(index))

export default [
  {
    // 担当者マスタ登録
    path: '/api/staff',
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
    // 担当者マスタ検索（GET）
    path: '/api/staff',
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
    // 担当者マスタ検索（POST）
    path: '/api/staff/search',
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
    // 担当者マスタ取得
    path: '/api/staff/:staffId',
    method: 'get',
    handler: (req, res) => {
      const staffId = Number.parseInt(req.params.staffId, 10)
      const staff = data.find((u) => u.id === staffId)

      if (staff) {
        res.json({
          data: staff,
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
    // 担当者マスタ更新
    path: '/api/staff/:staffId',
    method: 'put',
    handler: (req, res) => {
      const staffId = Number.parseInt(req.params.staffId, 10)
      const staff = data.find((u) => u.id === staffId)

      if (staff) {
        staff.firstName = req.body.firstName
        staff.lastName = req.body.lastName
        staff.email = req.body.email
        staff.tel = req.body.tel
        staff.zip = req.body.zip
        staff.address = req.body.address
        staff.updatedAt = getTime()
        staff.version = staff.version + 1

        res.json({
          data: {
            id: staffId,
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            tel: staff.tel,
            zip: staff.zip,
            address: staff.address,
            createdAt: staff.createdAt,
            updatedAt: formatDate(staff.updatedAt),
            version: staff.version,
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
    //担当者マスタ削除
    path: '/api/staff/:staffId',
    method: 'delete',
    handler: (req, res) => {
      const staffId = Number.parseInt(req.params.staffId, 10)
      const index = data.findIndex((u) => u.id === staffId)
      const staff = data[index]

      if (index !== -1) {
        data.splice(index, 1)

        res.json({
          data: {
            id: staffId,
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            tel: staff.tel,
            zip: staff.zip,
            address: staff.address,
            createdAt: staff.createdAt,
            updatedAt: staff.updatedAt,
            version: staff.version,
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
