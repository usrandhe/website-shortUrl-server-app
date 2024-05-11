import express from 'express'
import { urlModal } from '../model/shortUrl';

export const createUrl = async (
    req: express.Request,
    res: express.Response,

) => {
    try {
        
        const { fullUrl } = req.body;
        const urlFound = await urlModal.find({ fullUrl: fullUrl });
        if (urlFound.length > 0) {           
            res.send(urlFound).status(409);
        } else {
            const shortUrl = await urlModal.create({ fullUrl });
            res.status(201).json(shortUrl);
        }

    } catch (error) {
        res.status(500).send({ message: 'Create new shorturl record failed..' })
    }
};
export const getALLUrl = async (
    req: express.Request,
    res: express.Response,

) => {
    try {
        const allUrl = await urlModal.find().sort({ createdAt: -1 });
        if (allUrl.length < 0) {
            res.status(404).json({ message: 'No url found' });
            res.send({ message: 'No url found' });
        } else {
            res.status(200).json(allUrl);
        }
    } catch (error) {
        res.status(500).send({ message: 'Fetching all shorturl failed..' })
    }
};

export const getUrl = async (
    req: express.Request,
    res: express.Response,

) => {

    try {
        const { id } = req.params;
        const shortUrl = await urlModal.findOne({ shortUrl: id });
        if (!shortUrl) {
            res.status(404).json({ message: 'No url found' });

        } else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`)
        }
    } catch (error) {
        res.status(500).send({ message: 'Unable to fetch record..' })
    }
};

export const deleteUrl = async (
    req: express.Request,
    res: express.Response,

) => {
    try {
        const { id } = req.params;
        const shortUrl = await urlModal.findByIdAndDelete({ _id: id });
        if (shortUrl) {
            res.status(200).send({ message: 'Request url sucessfully deleted' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error in Delete something requested url' })
    }

};