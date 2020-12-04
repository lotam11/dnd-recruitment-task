import {Data, GetListInput, Person} from './PersonData';
import * as PersonData from './PersonData';

import {DataClient} from '../data/DataProvider'

export interface Controller {
  get: ReturnType<typeof getPerson>,
  getList: ReturnType<typeof getPersonList>,
  create: ReturnType<typeof createPerson>,
}

export const getPerson = (persons: Data) => async (input: string) => {
  return persons.get(input)
}

export const getPersonList = (persons: Data) => async (input?: GetListInput) => {
  return persons.getList(input)
}

export const createPerson = (persons: Data) => async (input?: Person) => {
  return persons.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const persons = await PersonData.create(data)

  return {
    get: getPerson(persons),
    getList: getPersonList(persons),
    create: createPerson(persons),
  }
}

export default {create}