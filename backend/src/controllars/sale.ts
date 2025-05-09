import { json, NextFunction, Request, Response } from 'express'
import Sale from '../interfaces/Sale'
import SaleModel from '../model/sale'
export const createSale = async (req: Request, res: Response) => {
    const { cardItems, total, discount, addition, client, salesPerson }: Sale = req.body

    if (!cardItems.length || !total) {
        res.status(400).json({ message: "please select at least one item to the card items" })
        return
    }

    const newSale = new SaleModel({
        cardItems,
        total,
        discount,
        addition,
        salesPerson,
        client
    })

    try {
        await newSale.save()
        res.status(201).json(newSale)
    } catch (error: any) {
        console.error(`error in createSale ${error}`)
        res.status(500).json({ message: error.message })
    }
}
// alright 
// let's work on the users and clients sections 
// 


export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await SaleModel.find()
        res.json(sales)
    } catch (error: any) {
        console.error(`error in getItems ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const deleteSales = async (req: Request, res: Response) => {
    try {
        await SaleModel.deleteMany()
        res.json({ message: "deleted" })
    } catch (error) {

    }
}

interface SaleRequest extends Request {
    sale?:any
}

export const getOneSaleMidll = async (req: SaleRequest, res: Response,next:NextFunction) => {
    let sale

    try {
        sale = await SaleModel.findById(req.params.id)
        if (!sale) {
            res.status(404).json({message:`sale with id: ${req.params.id} doesn't exist`})
            return 
        }
    } catch (error: any) {
        console.error(`error in getOneSaleMidll`)
        res.status(500).json({ message: error.message })
    }

    req.sale = sale 
    next()
}

export const deleteOneSale = async (req:SaleRequest,res:Response) => {
    try {
        await SaleModel.findByIdAndDelete(req.sale._id)
        res.json({message:"sale deleted"})
    } catch (error: any) {
        console.error(`error in deleteOneSale`)
        res.status(500).json({ message: error.message })
    }
}

export const retrieveOneSale = async (req:SaleRequest,res:Response) => {
    res.json(req.sale)
}