import { DataClient } from "./data/DataProvider";
import PersonController from "./app/persons/PersonController";
import PersonService from "./app/persons/PersonService";
import * as PersonData from "./app/persons/PersonData";
import FilmsHandler from "./app/persons/films/FilmsController";
import StarshipHandler from "./app/persons/starships/StarshipController";
import VehiculeHandler from "./app/persons/vehicule/VehiculeController";
import * as NodeCacheService from "./cache/NodeCacheService"
import UserHandler from "./app/user/UserController"
import { Server } from "./Config";
import { IAuthService } from "./auth";

export async function create (
  data: DataClient,
  auth: IAuthService
){
  return {
    personHandler: (await PersonController.create(
      await PersonService.create(
        await PersonData.create(
          data,
          NodeCacheService.create({stdTTL: 86400})
        )
      )
    )),
    filmsHandler: (await FilmsHandler.create(data)),
    starshipHandler: (await StarshipHandler.create(data)),
    vehiculeHandler: (await VehiculeHandler.create(data)),
    userHandler: (await UserHandler.create(data, auth)),
  }
};

type Await<T> = T extends PromiseLike<infer U> ? U : T

export type Handlers = Await<ReturnType<typeof create>>