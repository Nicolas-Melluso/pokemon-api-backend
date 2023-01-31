import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDTO } from './dto/pokemon.dto';
import { Pokemon, PokemonDocument } from './model/pokemon.model';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}
  async getPokemons(): Promise<PokemonDocument[]> {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }
  async getPokemon(pokedexIdParam: string): Promise<PokemonDocument> {
    const pokemon = await this.pokemonModel.findById(pokedexIdParam);
    return pokemon;
  }

  async getPokemonByPokedex(
    pokedexIdParam: number,
  ): Promise<PokemonDocument[]> {
    const pokemon = await this.pokemonModel.find({
      pokedexId: pokedexIdParam,
    });
    return pokemon;
  }

  async createFirstGenPokemons(pokemonsFirstGen): Promise<PokemonDocument[]> {
    //   return await this.pokemonModel.create();
    const pokeArray = [];
    await pokemonsFirstGen.forEach((pokemon: CreatePokemonDTO) => {
      const createPokemonDTO: CreatePokemonDTO = {
        pokedexId: pokemon.pokedexId,
        name: pokemon.name,
        type: pokemon.type,
        imageURL: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
          pokemon.pokedexId < 100
            ? pokemon.pokedexId < 10
              ? '00' + pokemon.pokedexId
              : '0' + pokemon.pokedexId
            : pokemon.pokedexId
        }.png`,
        level:
          Math.floor(
            Math.random() * (pokemon.levelRate[1] - pokemon.levelRate[0]),
          ) + pokemon.levelRate[0],
        height: 2,
        weight: 2,
      };
      pokeArray.push(createPokemonDTO);
    });
    for (let index = 0; index < pokeArray.length; index++) {
      const element = pokeArray[index];
      await this.pokemonModel.create(element);
    }
    return pokeArray;
  }

  async updatePokemonByPokedex(
    createPokemonDTO: CreatePokemonDTO,
    pokedexIdParam: number,
  ): Promise<PokemonDocument> {
    const updatePokimon = await this.pokemonModel.findOneAndUpdate(
      {
        pokedexId: pokedexIdParam,
      },
      createPokemonDTO,
      { new: true },
    );
    return updatePokimon;
  }

  async updatePokemonById(
    createPokemonDTO: CreatePokemonDTO,
    pokedexIdParam: string,
  ): Promise<PokemonDocument> {
    const updatePokimon = await this.pokemonModel.findByIdAndUpdate(
      pokedexIdParam,
      createPokemonDTO,
      { new: true },
    );
    return updatePokimon;
  }

  async deletePokemonById(pokedexIdParam: string): Promise<PokemonDocument> {
    const deletePokimon = await this.pokemonModel.findByIdAndDelete(
      pokedexIdParam,
    );
    return deletePokimon;
  }
  async deleteAll() {
    const deletePokimon = await this.pokemonModel.deleteMany();
    return deletePokimon;
  }
}
