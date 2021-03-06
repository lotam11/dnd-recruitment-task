import {Request, Response} from 'express'
import Joi from 'joi'

import {Service as PersonService} from './PersonService'


export const createPerson = (persons: PersonService) => { 
  const validation = Joi.object().keys({ 
    nickname: Joi.string().required(),
    fullname: Joi.string().required(),
    description: Joi.string().required() 
  });

  return async (req: Request, res: Response) => {
    Joi.attempt(req.body, validation);

    const person = await persons.create(req.body)
    
    res.json(person).end();
  }
}

export const updatePerson = (persons: PersonService) => { 
  const validation = Joi.object().keys({ 
    nickname: Joi.string().required(),
    fullname: Joi.string().required(),
    description: Joi.string().required(), 
    id: Joi.number().required(),
  });

  return async (req: Request, res: Response) => {
    const input = {...req.body, id: req.params.id}

    Joi.attempt(input, validation);

    const person = await persons.update(input)
    
    res.json(person).end();
  }
}

export function getPerson(persons: PersonService){
  return async (req: Request, res: Response) =>
    res.json(
      await persons.get(req.params.id)
    ).end();
}

export function getPersonList(persons: PersonService) {
  return async (req: Request, res: Response) =>
    res.json(
      await persons.getList({
        offset: parseInt(req.query.query as string),
        limit: parseInt(req.query.limit as string)
      })
    ).end();
}

export function deletePerson(persons: PersonService) {
  return async (req: Request, res:Response) => {
    if(isNaN(+req.params.id)){
      res.status(400).json({error: "id must be a number"}).end();
      return
    }

    const id = parseInt(req.params.id);

    await persons.delete(id);

    res.status(200).end()
  }
}

export async function create (persons: PersonService) {

  return {
    get: getPerson(persons),
    create: createPerson(persons),
    getList: getPersonList(persons),
    update: updatePerson(persons),
    delete: deletePerson(persons)
  }
}

export default {create}