import { NextFunction, Request, Response } from "express";
import Client from '../interfaces/Client'
import ClientModel from '../model/client'

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const allClients = await ClientModel.find()
        res.json(allClients)
    } catch (error: any) {
        console.error(`error in getAllClients`)
        res.status(500).json({ message: error.message })
    }
}

export const createOneClient = async (req: Request, res: Response) => {
    const { clientName, phone, address }: Client = req.body

    if (!clientName || !phone) {
        res.status(400).json({ message: "please provide the client name and phone" })
        return
    }

    const foundClient = await ClientModel.findOne({ phone: phone })

    if (foundClient) {
        res.status(409).json({ message: "Conflict error. clinet with this phone already exists in DB" })
        return
    }

    const newClient = new ClientModel({
        clientName,
        phone,
        address
    })

    try {
        await newClient.save()
        res.status(201).json(newClient)
    } catch (error: any) {
        console.error(`error in createOneClient ${error}`)
        res.status(500).json({ message: error.message })
    }
}

interface ClientRequest extends Request {
    client?: any
}

export const getOneClientMidll = async (req: ClientRequest, res: Response, next: NextFunction) => {
    let client

    try {
        client = await ClientModel.findById(req.params.id)

        if (!client) {
            res.status(404).json({ message: "this client doen't exist in DB" })
            return
        }
    } catch (error: any) {
        console.error(`error in getOneClientMidll ${error}`)
        res.status(500).json({ message: error.message })
    }
    req.client = client
    next()
}

export const deleteClient = async (req: ClientRequest, res: Response) => {

    try {
        await ClientModel.findByIdAndDelete(req.client._id)
        res.json({ message: "client has been deleted" })
    } catch (error: any) {
        console.error(`error in deleteClient ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const patchClient = async (req: ClientRequest, res: Response) => {
    const curClient = req.client
    const { clientName, phone, address } = req.body

    try {
        const newClientObj = await ClientModel.findByIdAndUpdate(
            curClient._id,
            { $set: { clientName, phone, address } },
            { new: true }
        )
        res.json(newClientObj)
    } catch (error: any) {
        console.error(`error in patchClient ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const retrieveOneClient = async (req: ClientRequest, res: Response) => {
    res.json(req.client)
}